import { journalArticles, type JournalArticle } from "@/data/journal";
import { stories as localStories, type Story } from "@/data/stories";
import { supabase } from "@/lib/supabase";

export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  productUrl: string;
  etsyUrl: string;
  gumroadUrl: string;
  platform: string;
  price: string;
  status: string;
};

export type SocialLink = {
  platform: string;
  label: string;
  url: string;
  sortOrder: number;
};

export type ListeningTrack = {
  slug: string;
  title: string;
  category: "remembrance" | "relaxation" | "sleep";
  description: string;
  youtubeUrl: string;
  status: string;
  sortOrder: number;
};

const fallbackProducts: Product[] = [{
  slug: "after-pet-loss-support-checklist",
  title: "After: A Pet Loss Support Checklist",
  subtitle: "A practical, gentle 13-page checklist for the days when everything feels like too much.",
  description: "A warm checklist for navigating the small decisions that follow pet loss, including home, belongings, records, family, other pets, and caring for yourself. Includes color and low-ink PDF files for A4 and US Letter.",
  productUrl: "https://unsentmelodies.gumroad.com/l/czqktb",
  etsyUrl: "https://www.etsy.com/listing/4574578262/after-a-pet-loss-support-checklist-pet",
  gumroadUrl: "https://unsentmelodies.gumroad.com/l/czqktb",
  platform: "Gumroad",
  price: "$9.99",
  status: "published",
}];

const fallbackLinks: SocialLink[] = [
  { platform: "etsy", label: "Etsy shop", url: "https://unsentmelodies.etsy.com", sortOrder: 2 },
  { platform: "gumroad", label: "Gumroad shop", url: "https://unsentmelodies.gumroad.com", sortOrder: 3 },
  { platform: "spotify", label: "Spotify", url: "https://open.spotify.com/artist/2Yg9LvrZduUS5A8w75OsxA", sortOrder: 1 },
];

function asParagraphs(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  if (typeof value === "string" && value.trim()) return value.split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  return [];
}

function asResources(value: unknown): { label: string; href: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const row = item as Record<string, unknown>;
    return typeof row.label === "string" && typeof row.href === "string" ? [{ label: row.label, href: row.href }] : [];
  });
}

function mapStory(row: Record<string, unknown>): Story {
  return {
    slug: String(row.slug ?? ""), eyebrow: String(row.eyebrow ?? "A quiet reflection"),
    title: String(row.title ?? "Untitled story"), dek: String(row.excerpt ?? row.dek ?? row.description ?? ""),
    body: asParagraphs(row.body), image: String(row.image_url ?? row.image ?? "/images/story-rescue.webp"),
    trackLabel: String(row.track_label ?? "Explore Unsent Melodies"),
    trackHref: String(row.youtube_url ?? row.track_href ?? "https://www.youtube.com/channel/UCyTzBEJFvEvFfREmZhSRmdw"),
  };
}

function mapJournal(row: Record<string, unknown>): JournalArticle {
  const body = asParagraphs(row.body);
  const category = String(row.category ?? "Calm at home") as JournalArticle["category"];
  return {
    slug: String(row.slug ?? ""), category: ["Remembrance", "Dog behavior", "Calm at home"].includes(category) ? category : "Calm at home",
    title: String(row.title ?? "Untitled journal note"), dek: String(row.description ?? row.dek ?? ""),
    readingTime: String(row.reading_time ?? "5 min read"), accent: String(row.accent ?? "moss"), label: String(row.label ?? "A gentle note"),
    product: String(row.product ?? "Grief Healing Journal"), track: String(row.track ?? "Night window · soft water"),
    sections: Array.isArray(row.sections) ? row.sections as JournalArticle["sections"] : [{ heading: "A place to begin", paragraphs: body }],
    resources: asResources(row.resources),
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    slug: String(row.slug ?? ""), title: String(row.title ?? "Untitled product"), subtitle: String(row.subtitle ?? ""),
    description: String(row.description ?? ""), productUrl: String(row.product_url ?? ""),
    etsyUrl: String(row.etsy_url ?? (String(row.platform ?? "").toLowerCase() === "etsy" ? row.product_url : "")),
    gumroadUrl: String(row.gumroad_url ?? (String(row.platform ?? "").toLowerCase() === "gumroad" ? row.product_url : "")),
    platform: String(row.platform ?? ""), price: row.price == null || row.price === "" ? "" : `$${Number(row.price).toFixed(2)}`, status: String(row.status ?? "published"),
  };
}

function mapSocialLink(row: Record<string, unknown>): SocialLink {
  return { platform: String(row.platform ?? ""), label: String(row.label ?? row.platform ?? "Visit link"), url: String(row.url ?? ""), sortOrder: Number(row.sort_order ?? 99) };
}

function mapListeningTrack(row: Record<string, unknown>): ListeningTrack {
  const category = String(row.category ?? "remembrance");
  return {
    slug: String(row.slug ?? ""), title: String(row.title ?? "Untitled listening track"),
    category: ["remembrance", "relaxation", "sleep"].includes(category) ? category as ListeningTrack["category"] : "remembrance",
    description: String(row.description ?? ""), youtubeUrl: String(row.youtube_url ?? ""),
    status: String(row.status ?? "published"), sortOrder: Number(row.sort_order ?? 99),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!supabase) return fallbackProducts;
  const { data } = await supabase.from("products").select("slug,title,subtitle,description,product_url,etsy_url,gumroad_url,platform,price,status").eq("status", "published").order("updated_at", { ascending: false }).limit(100);
  const remote = (data ?? []).map((row) => mapProduct(row as Record<string, unknown>)).filter((row) => row.slug && row.title && row.productUrl);
  return remote.length ? remote : fallbackProducts;
}

export async function getListeningTracks(): Promise<ListeningTrack[]> {
  if (!supabase) return [];
  const { data } = await supabase.from("listening_tracks").select("slug,title,category,description,youtube_url,status,sort_order").eq("status", "published").order("sort_order", { ascending: true }).limit(100);
  return (data ?? []).map((row) => mapListeningTrack(row as Record<string, unknown>)).filter((row) => row.slug && row.title && row.youtubeUrl);
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (!supabase) return fallbackLinks;
  const { data } = await supabase.from("social_links").select("platform,label,url,sort_order").order("sort_order", { ascending: true }).limit(100);
  const remote = (data ?? []).map((row) => mapSocialLink(row as Record<string, unknown>)).filter((row) => row.url);
  return remote.length ? remote : fallbackLinks;
}

export async function getStories(): Promise<Story[]> {
  if (!supabase) return localStories;
  const { data } = await supabase.from("stories").select("*").eq("status", "published").order("created_at", { ascending: false }).limit(100);
  const remote = (data ?? []).map((row) => mapStory(row as Record<string, unknown>)).filter((row) => row.slug && row.title);
  return remote.length ? remote : localStories;
}

export async function getStory(slug: string): Promise<Story | undefined> {
  const local = localStories.find((story) => story.slug === slug);
  if (!supabase) return local;
  const { data } = await supabase.from("stories").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return data ? mapStory(data as Record<string, unknown>) : local;
}

export async function getJournalArticles(): Promise<JournalArticle[]> {
  if (!supabase) return journalArticles;
  const { data } = await supabase.from("journal_posts").select("*").eq("status", "published").order("created_at", { ascending: false }).limit(100);
  const remote = (data ?? []).map((row) => mapJournal(row as Record<string, unknown>)).filter((row) => row.slug && row.title);
  return remote.length ? remote : journalArticles;
}

export async function getJournalArticle(slug: string): Promise<JournalArticle | undefined> {
  const local = journalArticles.find((article) => article.slug === slug);
  if (!supabase) return local;
  const { data } = await supabase.from("journal_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return data ? mapJournal(data as Record<string, unknown>) : local;
}
