import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    async function loadSession() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      const user = data.session?.user;
      setSessionEmail(user?.email ?? null);
      if (user) {
        const { data: adminRow, error } = await supabase
          .from("admin_users")
          .select("user_id")
          .eq("user_id", user.id)
          .maybeSingle();
        if (active) {
          setIsAdmin(Boolean(adminRow) && !error);
          if (error) setMessage("تعذر التحقق من صلاحية المدير. راجع سياسة RLS.");
        }
      }
      setLoading(false);
    }
    void loadSession();
    return () => {
      active = false;
    };
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
      setBusy(false);
      return;
    }
    const user = data.user;
    setSessionEmail(user?.email ?? null);
    if (user) {
      const { data: adminRow, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();
      setIsAdmin(Boolean(adminRow) && !adminError);
      setMessage(adminError ? "تم تسجيل الدخول، لكن تعذر التحقق من جدول المدير." : adminRow ? "تم التحقق من صلاحية المدير." : "الحساب غير مضاف إلى admin_users بعد.");
    }
    setBusy(false);
  }

  async function handleLogout() {
    await supabase?.auth.signOut();
    setSessionEmail(null);
    setIsAdmin(false);
    setMessage("تم تسجيل الخروج.");
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] px-6 py-20 text-[#302d27] dark:bg-[#20231f] dark:text-[#f5f0e8]">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="text-xs font-bold uppercase tracking-[.18em] text-[#75836D]">← Back to site</Link>
        <p className="mt-12 text-xs font-bold uppercase tracking-[.18em] text-[#a65f46]">Private workspace</p>
        <h1 className="mt-4 font-display text-5xl tracking-[-.05em]">Unsent Melodies Admin</h1>
        <p className="mt-5 max-w-xl leading-7 text-[#665e53] dark:text-[#cfc8bc]">This private area will manage stories, journal posts, products, and platform links. Public visitors cannot edit your content.</p>

        {!hasSupabaseConfig && <div className="mt-10 rounded-2xl border border-[#c88b72] bg-[#f1dfcf] p-5 text-sm">Supabase environment variables are not configured in this deployment yet.</div>}
        {loading && <p className="mt-10 text-sm">Checking session…</p>}

        {!loading && !sessionEmail && hasSupabaseConfig && (
          <form onSubmit={handleLogin} className="mt-10 space-y-5 rounded-3xl bg-white/70 p-7 shadow-sm dark:bg-white/5">
            <label className="block text-sm font-semibold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d0c3] bg-transparent px-4 py-3 outline-none focus:border-[#75836D]" /></label>
            <label className="block text-sm font-semibold">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#d9d0c3] bg-transparent px-4 py-3 outline-none focus:border-[#75836D]" /></label>
            <button disabled={busy} className="rounded-full bg-[#75836D] px-6 py-3 text-sm font-bold text-white disabled:opacity-60">{busy ? "Signing in…" : "Sign in"}</button>
          </form>
        )}

        {!loading && sessionEmail && (
          <section className="mt-10 rounded-3xl bg-white/70 p-7 shadow-sm dark:bg-white/5">
            <p className="text-sm">Signed in as <strong>{sessionEmail}</strong></p>
            <p className="mt-4 text-sm leading-6">{isAdmin ? "Admin access confirmed. Content management modules can now be added safely." : "You are signed in, but this account is not listed in admin_users. Add the user UUID in Supabase before continuing."}</p>
            <button onClick={handleLogout} className="mt-6 rounded-full border border-[#75836D] px-5 py-3 text-sm font-bold">Sign out</button>
          </section>
        )}
        {message && <p className="mt-5 rounded-xl bg-[#e5b17c]/30 p-4 text-sm">{message}</p>}
      </div>
    </main>
  );
}
