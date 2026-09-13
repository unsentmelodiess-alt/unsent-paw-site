import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { JournalChrome } from "@/components/JournalChrome";
import { getProducts, getSocialLinks, type Product, type SocialLink } from "@/lib/content";

const storePlatforms = new Set(["etsy", "gumroad"]);

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Shop | Unsent Melodies — Pet Memories, Comfort & Calm";
    void Promise.all([getProducts(), getSocialLinks()]).then(([nextProducts, nextLinks]) => {
      setProducts(nextProducts);
      setLinks(nextLinks);
      setLoading(false);
    });
  }, []);

  const storeLinks = links.filter((link) => storePlatforms.has(link.platform.toLowerCase()));

  return (
    <JournalChrome>
      <main>
        <section className="bg-[#e9e3d6] py-20 dark:bg-[#202620] sm:py-28">
          <div className="container max-w-5xl">
            <p className="eyebrow"><ShoppingBag className="size-3" />The quiet shop</p>
            <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[.94] tracking-[-.06em] sm:text-8xl">Small tools for tender days.</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#625a4f] dark:text-[#cfc8bc]">Thoughtful digital resources for remembrance, reflection, and the practical parts of caring for a beloved animal. Choose the place that feels easiest to you.</p>
          </div>
        </section>

        <section className="container max-w-5xl py-16 sm:py-24" aria-labelledby="products-heading">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div><p className="eyebrow"><Sparkles className="size-3" />Digital products</p><h2 id="products-heading" className="mt-3 font-display text-5xl tracking-[-.05em]">Begin where you are.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-[#71695d] dark:text-[#bcb5a9]">Instant downloads made to be used gently, at your own pace.</p>
          </div>
          {loading ? <p className="mt-10 rounded-3xl bg-[#f1ece3] p-8 text-sm dark:bg-white/5">Loading the shop…</p> : <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {products.map((product) => <article key={product.slug} className="flex flex-col rounded-[2rem] border border-[#d9d0c0] bg-[#fbf8f1] p-7 shadow-[0_16px_50px_rgba(70,61,49,.06)] dark:border-white/10 dark:bg-white/5 sm:p-9">
              <div className="flex items-start justify-between gap-4"><p className="eyebrow">{product.platform} · instant download</p>{product.price && <span className="rounded-full bg-[#e9e3d6] px-3 py-1 text-sm font-bold text-[#5e6d57] dark:bg-white/10 dark:text-[#c9d8c0]">{product.price}</span>}</div>
              <h3 className="mt-8 max-w-lg font-display text-4xl leading-tight tracking-[-.04em]">{product.title}</h3>
              <p className="mt-4 text-lg leading-8 text-[#625a4f] dark:text-[#cfc8bc]">{product.subtitle}</p>
              <p className="mt-5 text-sm leading-7 text-[#71695d] dark:text-[#bcb5a9]">{product.description}</p>
              <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#75836D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#5e6d57]">View product <ArrowUpRight className="size-4" /></a>
            </article>)}
          </div>}
        </section>

        <section className="bg-[#302d27] py-16 text-[#ede8dc] sm:py-20" aria-labelledby="stores-heading">
          <div className="container max-w-5xl"><p className="text-[.63rem] font-bold uppercase tracking-[.18em] text-[#b7c7ae]">Find us elsewhere</p><h2 id="stores-heading" className="mt-3 font-display text-5xl tracking-[-.05em]">Choose your storefront.</h2><div className="mt-9 grid gap-4 sm:grid-cols-2">{storeLinks.map((link) => <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:border-[#b7c7ae]/60 hover:bg-white/10"><span><span className="block text-lg font-semibold">{link.label}</span><span className="mt-1 block text-sm text-[#bdb6aa]">Browse the Unsent Melodies collection</span></span><ExternalLink className="size-5 text-[#b7c7ae] transition group-hover:translate-x-1" /></a>)}</div></div>
        </section>
      </main>
    </JournalChrome>
  );
}
