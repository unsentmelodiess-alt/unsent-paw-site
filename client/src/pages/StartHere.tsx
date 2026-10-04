import { JournalChrome } from "@/components/JournalChrome";
import { ArrowRight, BookOpen, Heart, Headphones, Leaf, PenLine } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";
import { setPageMeta } from "@/lib/seo";

const paths = [
  { icon: Heart, title: "I’m grieving a pet", text: "A gentle first step, practical guidance, and a place to remember without being rushed.", href: "/journal/how-to-cope-with-the-loss-of-a-pet", action: "Begin with the guide", tone: "bg-[#f1dfcf] text-[#644b3a]" },
  { icon: PenLine, title: "I want to remember them", text: "Read quiet letters, explore remembrance stories, or share a memory when you are ready.", href: "/stories", action: "Visit Stories", tone: "bg-[#dce5d7] text-[#384136]" },
  { icon: Headphones, title: "I’m looking for calm music", text: "Choose a listening moment for remembrance, relaxation, sleep, or a quieter evening.", href: "/#listen", action: "Open the listening room", tone: "bg-[#d8e0dc] text-[#30413d]" },
  { icon: BookOpen, title: "I want practical guidance", text: "Browse clear, kind notes about pet loss, behavior, routines, and calmer homes.", href: "/journal", action: "Explore the Journal", tone: "bg-[#302d27] text-[#f5f0e8]" },
];

export default function StartHere() {
  useEffect(() => { setPageMeta({ title: "Start Here | Unsent Melodies", description: "Find a gentle place to begin with pet loss support, remembrance stories, calming music, and practical guidance.", path: "/start-here" }); }, []);
  return <JournalChrome><main>
    <section className="relative overflow-hidden bg-[#e9e3d6] py-20 dark:bg-[#202620] sm:py-28"><div className="absolute -right-20 top-12 size-80 rounded-full border border-[#75836D]/25" /><div className="container relative max-w-5xl"><Link href="/" className="text-xs font-bold uppercase tracking-[.16em] text-[#5e6d57] hover:underline">← Back home</Link><p className="eyebrow mt-12"><Leaf className="size-3" />A quiet place to begin</p><h1 className="mt-5 max-w-4xl font-display text-6xl leading-[.92] tracking-[-.06em] sm:text-8xl">What brings you<br /><em className="font-normal text-[#75836D]">here today?</em></h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#625a4f] dark:text-[#cfc8bc]">You do not need to explore everything. Choose the path that feels closest, and take only the next gentle step.</p></div></section>
    <section className="container max-w-5xl py-16 sm:py-20"><div className="grid gap-5 sm:grid-cols-2">{paths.map(({ icon: Icon, title, text, href, action, tone }) => <Link key={title} href={href} className={`group rounded-[1.7rem] p-7 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${tone}`}><Icon className="size-6 opacity-80" /><h2 className="mt-10 font-display text-3xl leading-tight tracking-[-.04em]">{title}</h2><p className="mt-4 max-w-sm text-sm leading-6 opacity-85">{text}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em]">{action}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div><div className="mt-12 rounded-[1.7rem] border border-[#ded5c7] bg-[#f5efe4] p-7 dark:border-white/10 dark:bg-white/5"><p className="text-sm leading-7 text-[#665e53] dark:text-[#cfc8bc]"><strong className="font-display text-2xl text-[#40382f] dark:text-[#f5f0e8]">There is no right way to use this space.</strong><br />Read one paragraph, listen for a minute, or leave and come back later. Our stories and guides offer company, not a replacement for veterinary, behavioral, medical, or mental-health care.</p></div></section>
  </main></JournalChrome>;
}
