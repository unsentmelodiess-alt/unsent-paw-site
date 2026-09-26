const SITE_URL = "https://unsent-paw-site.vercel.app";

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attributes).forEach(([key, value]) => tag!.setAttribute(key, value));
  tag.setAttribute("content", content);
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function setPageMeta({
  title,
  description,
  path,
  type = "website",
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
}) {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}`;
  const url = `${SITE_URL}${normalizedPath}`;
  document.title = title;
  upsertMeta('meta[name="description"]', { name: "description" }, description);
  upsertMeta('meta[name="robots"]', { name: "robots" }, "index,follow,max-image-preview:large");
  upsertMeta('meta[property="og:type"]', { property: "og:type" }, type);
  upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
  upsertMeta('meta[property="og:description"]', { property: "og:description" }, description);
  upsertMeta('meta[property="og:url"]', { property: "og:url" }, url);
  upsertMeta('meta[property="og:image"]', { property: "og:image" }, `${SITE_URL}/images/hero.webp`);
  upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt" }, "A golden retriever resting beside a window");
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  upsertMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, `${SITE_URL}/images/hero.webp`);
  upsertCanonical(url);

  const id = "unsent-melodies-page-jsonld";
  let script = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(jsonLd ?? { "@context": "https://schema.org", "@type": type === "article" ? "Article" : "WebPage", name: title, description, url });
}

export { SITE_URL };
