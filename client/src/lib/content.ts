import { journalArticles, type JournalArticle } from "@/data/journal";
import { stories as localStories, type Story } from "@/data/stories";
import { supabase } from "@/lib/supabase";

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
    slug: String(row.slug ?? ""),
    eyebrow: String(row.eyebrow ?? "A quiet reflection"),
    title: String(row.title ?? "Untitled story"),
    dek: String(row.excerpt ?? row.dek ?? row.description ?? ""),
    body: asParagraphs(row.body),
    image: String(row.image_url ?? row.image ?? "/images/story-rescue.webp"),
    trackLabel: String(row.track_label ?? "Explore Unsent Melodies"),
    trackHref: String(row.youtube_url ?? row.track_href ?? "https://www.youtube.com/channel/UCyTzBEJFvEvFfREmZhSRmdw"),
  };
}

function mapJournal(row: Record<string, unknown>): JournalArticle {
  const body = asParagraphs(row.body);
  const category = String(row.category ?? "Calm at home") as JournalArticle["category"];
  return {
    slug: String(row.slug ?? ""),
    category: ["Remembrance", "Dog behavior", "Calm at home"].includes(category) ? category : "Calm at home",
    title: String(row.title ?? "Untitled journal note"),
    dek: String(row.description ?? row.dek ?? ""),
    readingTime: String(row.reading_time ?? "5 min read"),
    accent: String(row.accent ?? "moss"),
    label: String(row.label ?? "A gentle note"),
    product: String(row.product ?? "Grief Healing Journal"),
    track: String(row.track ?? "Night window · soft water"),
    sections: Array.isArray(row.sections) ? row.sections as JournalArticle["sections"] : [{ heading: "A place to begin", paragraphs: body }],
    resources: asResources(row.resources),
  };
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
