import { JournalChrome } from "@/components/JournalChrome";
import { SoundPawMotif } from "@/components/SoundPawMotif";
import { findStory } from "@/data/stories";
import { ArrowLeft, ArrowRight, Headphones, Leaf } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect } from "react";

export default function StoryArticle() {
  const [, params] = useRoute("/stories/:slug");
  const story = findStory(params?.slug || "");
  useEffect(() => {
    if (!story) return;
    document.title = `${story.title} | Unsent Melodies`;
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", "description"); document.head.appendChild(tag); }
    tag.setAttribute("content", story.dek);
  }, [story]);

  if (!story) {
    return <JournalChrome><main className="container py-32"><p className="eyebrow">Stories</p><h1 className="mt-5 font-display text-6xl tracking-[-.06em]">This story moved.</h1><p className="mt-5 text-[#665e53] dark:text-[#cfc8bc]">Return to the stories collection to find another quiet place to begin.</p><Link href="/stories" className="mt-8 inline-flex rounded-full bg-[#75836D] px-5 py-3 text-sm font-bold text-white">Back to stories</Link></main></JournalChrome>;
  }

  return <JournalChrome>
    <main>
      <section className="relative overflow-hidden bg-[#e9e3d6] pb-16 pt-12 dark:bg-[#202620]">
        <div className="container relative max-w-5xl">
          <Link href="/stories" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#5e6d57] hover:underline"><ArrowLeft className="size-4" />All stories</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
            <div><p className="eyebrow"><Leaf className="size-3" />{story.eyebrow}</p><h1 className="mt-5 font-display text-5xl leading-[.94] tracking-[-.06em] sm:text-7xl">{story.title}</h1><p className="mt-7 max-w-2xl text-xl leading-8 text-[#625a4f] dark:text-[#cfc8bc]">{story.dek}</p><SoundPawMotif className="mt-9 w-40 text-[#75836D]" /></div>
            <img src={story.image} alt="" className="h-64 w-full rounded-[1.8rem] object-cover shadow-xl lg:h-80" />
          </div>
        </div>
      </section>
      <section className="container grid max-w-5xl gap-12 py-20 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="max-w-2xl">{story.body.map((paragraph) => <p key={paragraph} className="mt-6 text-[1.08rem] leading-8 text-[#514a40] first:mt-0 dark:text-[#d2cbc0]">{paragraph}</p>)}<div className="mt-14 rounded-[1.6rem] border border-[#ded5c7] bg-[#f5efe4] p-7 dark:border-white/10 dark:bg-white/5"><p className="text-[.64rem] font-bold uppercase tracking-[.18em] text-[#75836D]">A gentle next step</p><p className="mt-4 font-display text-3xl leading-tight">You can carry the memory without carrying it alone.</p><Link href="/journal" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#5e6d57]">Read the Journal <ArrowRight className="size-4" /></Link></div></article>
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start"><div className="rounded-[1.5rem] bg-[#302d27] p-6 text-[#f5f0e8]"><Headphones className="size-5 text-[#e5b17c]" /><p className="mt-6 text-[.62rem] font-bold uppercase tracking-[.18em] text-[#b7c7ae]">Pair it with music</p><p className="mt-3 font-display text-3xl leading-tight">A quiet collection for the moments that stay.</p><a href={story.trackHref} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-[#e5b17c]">Open on YouTube <ArrowRight className="size-4" /></a></div><Link href="/#memory-wall" className="block rounded-[1.5rem] bg-[#dce5d7] p-6 text-[#384136] transition hover:-translate-y-0.5 dark:bg-[#2e3c2e] dark:text-[#e7eee3]"><p className="text-[.62rem] font-bold uppercase tracking-[.18em] text-[#5e6d57]">Remember together</p><p className="mt-4 font-display text-3xl leading-tight">Leave a private or public memory.</p><span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em]">Visit the wall <ArrowRight className="size-4" /></span></Link></aside>
      </section>
    </main>
  </JournalChrome>;
}
