import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

type TableName = "social_links" | "products" | "stories" | "journal_posts";
type RecordRow = Record<string, unknown>;

type Module = {
  table: TableName;
  label: string;
  fields: Array<{ key: string; label: string; type?: "url" | "number" | "textarea"; required?: boolean }>;
};

const modules: Module[] = [
  { table: "social_links", label: "Platform links", fields: [
    { key: "platform", label: "Platform", required: true }, { key: "label", label: "Label", required: true },
    { key: "url", label: "URL", type: "url", required: true }, { key: "sort_order", label: "Order", type: "number" },
  ]},
  { table: "products", label: "Products", fields: [
    { key: "slug", label: "Slug", required: true }, { key: "title", label: "Title", required: true },
    { key: "subtitle", label: "Subtitle" }, { key: "description", label: "Description", type: "textarea" },
    { key: "product_url", label: "Store URL", type: "url" }, { key: "platform", label: "Platform" },
    { key: "price", label: "Price", type: "number" }, { key: "status", label: "Status" },
  ]},
  { table: "stories", label: "Stories", fields: [
    { key: "slug", label: "Slug", required: true }, { key: "title", label: "Title", required: true },
    { key: "eyebrow", label: "Eyebrow" }, { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "youtube_url", label: "YouTube URL", type: "url" }, { key: "status", label: "Status" },
    { key: "body", label: "Body paragraphs (one per line)", type: "textarea", required: true },
  ]},
  { table: "journal_posts", label: "Journal", fields: [
    { key: "slug", label: "Slug", required: true }, { key: "title", label: "Title", required: true },
    { key: "description", label: "Description", type: "textarea" }, { key: "category", label: "Category" },
    { key: "seo_title", label: "SEO title" }, { key: "seo_description", label: "SEO description", type: "textarea" },
    { key: "status", label: "Status" }, { key: "body", label: "Body paragraphs (one per line)", type: "textarea", required: true },
  ]},
];

function toFormValue(value: unknown, key: string) {
  if (key === "body" && Array.isArray(value)) return value.join("\n\n");
  return value == null ? "" : String(value);
}

function toPayload(values: Record<string, string>, module: Module) {
  const payload: Record<string, unknown> = {};
  for (const field of module.fields) {
    const raw = values[field.key] ?? "";
    if (field.key === "body") payload.body = raw.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
    else if (field.key === "price" || field.key === "sort_order") payload[field.key] = raw === "" ? null : Number(raw);
    else payload[field.key] = raw || null;
  }
  if ("status" in payload && !payload.status) payload.status = "draft";
  if (payload.status === "published" && !payload.published_at) payload.published_at = new Date().toISOString();
  return payload;
}

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTable, setActiveTable] = useState<TableName>("social_links");
  const [rows, setRows] = useState<RecordRow[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});

  const activeModule = useMemo(() => modules.find((item) => item.table === activeTable)!, [activeTable]);

  async function verify(userId: string) {
    if (!supabase) return false;
    const { data, error } = await supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle();
    if (error) setMessage("تعذر التحقق من admin_users: " + error.message);
    const allowed = Boolean(data) && !error;
    setIsAdmin(allowed);
    return allowed;
  }

  async function loadSession() {
    if (!supabase) { setLoading(false); return; }
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    setSessionEmail(user?.email ?? null);
    if (user) await verify(user.id);
    setLoading(false);
  }

  useEffect(() => { void loadSession(); }, []);

  async function loadRows() {
    if (!supabase || !isAdmin) return;
    setBusy(true);
    const { data, error } = await supabase.from(activeTable).select("*").order("updated_at", { ascending: false }).limit(100);
    setRows((data as RecordRow[] | null) ?? []);
    setMessage(error ? error.message : "");
    setBusy(false);
  }

  useEffect(() => { void loadRows(); }, [activeTable, isAdmin]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setMessage(error.message); setBusy(false); return; }
    setSessionEmail(data.user?.email ?? null);
    if (data.user && await verify(data.user.id)) setMessage("تم التحقق من صلاحية المدير.");
    setBusy(false);
  }

  async function saveRow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true); setMessage("");
    const { error } = await supabase.from(activeTable).insert(toPayload(values, activeModule));
    if (error) setMessage(error.message);
    else { setMessage("تم حفظ العنصر بنجاح."); setValues({}); await loadRows(); }
    setBusy(false);
  }

  async function removeRow(id: string) {
    if (!supabase || !window.confirm("حذف هذا العنصر؟")) return;
    setBusy(true);
    const { error } = await supabase.from(activeTable).delete().eq("id", id);
    setMessage(error ? error.message : "تم الحذف.");
    await loadRows(); setBusy(false);
  }

  async function logout() {
    await supabase?.auth.signOut();
    setSessionEmail(null); setIsAdmin(false); setRows([]);
  }

  if (loading) return <main className="min-h-screen bg-[#f5f0e8] p-20 text-[#302d27]">Checking session…</main>;
  return (
    <main className="min-h-screen bg-[#f5f0e8] px-5 py-10 text-[#302d27] dark:bg-[#20231f] dark:text-[#f5f0e8]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/" className="text-xs font-bold uppercase tracking-[.18em] text-[#75836D]">← Back to site</Link><p className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-[#a65f46]">Private workspace</p><h1 className="mt-2 font-display text-4xl tracking-[-.05em]">Unsent Melodies Admin</h1></div>
          {sessionEmail && <button onClick={logout} className="rounded-full border border-[#75836D] px-5 py-2 text-sm font-bold">Sign out</button>}
        </div>
        {!hasSupabaseConfig && <div className="mt-8 rounded-2xl bg-[#f1dfcf] p-5">Supabase environment variables are not configured.</div>}
        {!sessionEmail && hasSupabaseConfig && <form onSubmit={handleLogin} className="mx-auto mt-12 max-w-lg space-y-5 rounded-3xl bg-white/70 p-7 shadow-sm dark:bg-white/5"><h2 className="font-display text-3xl">Sign in</h2><input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-[#d9d0c3] bg-transparent px-4 py-3" /><input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-[#d9d0c3] bg-transparent px-4 py-3" /><button disabled={busy} className="rounded-full bg-[#75836D] px-6 py-3 font-bold text-white">{busy ? "Signing in…" : "Sign in"}</button></form>}
        {sessionEmail && !isAdmin && <div className="mx-auto mt-12 max-w-lg rounded-3xl bg-white/70 p-7">Signed in as <strong>{sessionEmail}</strong><p className="mt-3">This account is not listed in admin_users.</p></div>}
        {isAdmin && <section className="mt-10 grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="rounded-3xl bg-white/70 p-4 shadow-sm dark:bg-white/5"><p className="px-3 pb-3 text-xs font-bold uppercase tracking-[.16em] text-[#a65f46]">Manage</p>{modules.map((item) => <button key={item.table} onClick={() => { setActiveTable(item.table); setValues({}); }} className={`mb-1 w-full rounded-xl px-3 py-3 text-left text-sm font-semibold ${activeTable === item.table ? "bg-[#75836D] text-white" : "hover:bg-[#75836D]/10"}`}>{item.label}</button>)}</aside>
          <div className="space-y-8"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#a65f46]">{activeModule.label}</p><h2 className="mt-2 font-display text-4xl">Content control</h2><p className="mt-2 text-sm text-[#665e53]">Add and remove published content. RLS only allows this for verified admins.</p></div>
            <form onSubmit={saveRow} className="grid gap-4 rounded-3xl bg-white/70 p-6 shadow-sm dark:bg-white/5 md:grid-cols-2">{activeModule.fields.map((field) => <label key={field.key} className={`text-sm font-semibold ${field.type === "textarea" ? "md:col-span-2" : ""}`}>{field.label}{field.type === "textarea" ? <textarea required={field.required} value={values[field.key] ?? ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} className="mt-2 min-h-28 w-full rounded-xl border border-[#d9d0c3] bg-transparent p-3 font-normal" /> : <input required={field.required} type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"} value={values[field.key] ?? ""} onChange={(e) => setValues({ ...values, [field.key]: e.target.value })} className="mt-2 w-full rounded-xl border border-[#d9d0c3] bg-transparent px-3 py-3 font-normal" />}</label>)}<button disabled={busy} className="rounded-full bg-[#75836D] px-6 py-3 font-bold text-white md:col-span-2">{busy ? "Saving…" : "Add item"}</button></form>
            <div className="space-y-3">{rows.map((row) => <article key={String(row.id)} className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-white/70 p-5 dark:bg-white/5"><div><p className="font-semibold">{String(row.title ?? row.label ?? row.slug ?? row.platform ?? "Untitled")}</p><p className="mt-1 text-xs text-[#665e53]">{String(row.status ?? row.url ?? "")}</p></div><button onClick={() => void removeRow(String(row.id))} className="rounded-full border border-[#a65f46] px-4 py-2 text-xs font-bold text-[#a65f46]">Delete</button></article>)}{!busy && rows.length === 0 && <p className="rounded-2xl bg-white/50 p-5 text-sm">No items yet. Add the first one above.</p>}</div>
          </div>
        </section>}
        {message && <p className="mt-6 rounded-xl bg-[#e5b17c]/30 p-4 text-sm">{message}</p>}
      </div>
    </main>
  );
}
