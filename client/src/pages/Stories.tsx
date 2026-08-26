import { JournalChrome } from "@/components/JournalChrome";
import { SoundPawMotif } from "@/components/SoundPawMotif";
import { ArrowRight, Headphones, Leaf } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { stories } from "@/data/stories";

export default function Stories() {
  useEffect(() => {
    document.title = "Stories & Listening | Unsent Melodies";
    let tag = document.querySelector('meta[name="description"]');
    if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", "description"); document.head.appendChild(tag); }
    tag.setAttribute("content", "Quiet stories and listening reflections for the bonds that shape a home.");
  }, []);
  return (
    <JournalChrome>
      <main>
        <section className="relative overflow-hidden bg-[#e9e3d6] py-20 sm:py-28 dark:bg-[#202620]">
          <div className="absolute -right-20 top-10 size-80 rounded-full border border-[#75836D]/25" />
          <div className="container relative max-w-6xl">
            <p className="eyebrow"><Leaf className="size-3" />Stories & listening</p>
            <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[.92] tracking-[-.06em] sm:text-8xl">Small stories,<br /><em className="font-normal text-[#75836D]">kept close.</em></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#625a4f] dark:text-[#cfc8bc]">Quiet reflections for the bonds that shape a home. Read a story, find a song, and take only the next gentle step.</p>
            <SoundPawMotif className="mt-9 w-40 text-[#75836D]" />
          </div>
        </section>

        <section className="container max-w-6xl py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            {stories.map((story, index) => (
              <article key={story.slug} className={`overflow-hidden rounded-[2rem] border border-[#ded5c7] bg-white shadow-[0_14px_36px_rgba(71,57,38,.06)] dark:border-white/10 dark:bg-[#242b24] ${index === 1 ? "lg:translate-y-10" : ""}`}>
                <img src={story.image} alt="" className="h-64 w-full object-cover" />
                <div className="p-7 sm:p-9">
                  <p className="eyebrow"><Headphones className="size-3" />{story.eyebrow}</p>
                  <h2 className="mt-5 font-display text-4xl leading-tight tracking-[-.05em]">{story.title}</h2>
                  <p className="mt-5 text-base leading-7 text-[#625a4f] dark:text-[#cfc8bc]">{story.dek}</p>
                  <p className="mt-5 text-sm leading-7 text-[#71685c] dark:text-[#cfc8bc]">{story.body[0]}</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={`/stories/${story.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#75836D] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5e6d57]">Read story <ArrowRight className="size-4" /></Link>
                    <a href={story.trackHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#8a7a69] px-5 py-3 text-xs font-bold text-[#4f483e] transition hover:bg-[#f1ede5] dark:border-white/25 dark:text-[#f5f0e8] dark:hover:bg-white/10">{story.trackLabel}</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-24 rounded-[1.8rem] bg-[#302d27] p-8 text-[#f5f0e8] sm:p-12">
            <p className="eyebrow text-[#b7c7ae]"><Leaf className="size-3" />Continue gently</p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-[-.05em] sm:text-5xl">Find a note for the day you are having.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/journal" className="inline-flex items-center gap-2 rounded-full bg-[#e5b17c] px-5 py-3 text-xs font-bold text-[#302a23]">Visit the Journal <ArrowRight className="size-4" /></Link>
              <Link href="/#memory-wall" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-xs font-bold text-white">Leave a memory <ArrowRight className="size-4" /></Link>
            </div>
          </div>
        </section>
      </main>
    </JournalChrome>
  );
}
