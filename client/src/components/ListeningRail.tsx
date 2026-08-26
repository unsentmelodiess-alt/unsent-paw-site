/** Fireside Editorial design: a vertical audio-console rail that makes the listening ritual visibly central. */
import { ExternalLink, Volume2 } from "lucide-react";
import { siteConfig } from "@/config/site";

export function ListeningRail({ dark = false }: { dark?: boolean }) {
  const bars = [28, 54, 84, 48, 72, 96, 42, 64, 30, 78, 50, 88, 36];
  return (
    <aside className={`hidden rounded-full border px-2 py-4 shadow-lg lg:flex lg:flex-col lg:items-center lg:gap-5 ${dark ? "border-white/15 bg-[#202520]/85 text-[#f5f0e8]" : "border-[#d1c7b6] bg-[#faf6ee]/88 text-[#3a332b]"}`} aria-label="Listening rail">
      <span className="writing-mode text-[0.58rem] font-bold uppercase tracking-[.22em] text-[#75836D]">On YouTube</span>
      <a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className={`grid size-9 place-items-center rounded-full transition hover:scale-105 ${dark ? "bg-[#e5b17c] text-[#302a23]" : "bg-[#75836D] text-white"}`} aria-label="Open Unsent Melodies on YouTube"><ExternalLink className="size-3" /></a>
      <div className="flex h-36 items-center gap-0.5" aria-hidden="true">{bars.map((height, i) => <span key={i} style={{ height: `${height}px` }} className="w-1 rounded-full bg-[#75836D]/75" />)}</div>
      <span className="rounded-full border border-current/20 p-2"><Volume2 className="size-3" /></span>
      <span className="writing-mode text-[0.55rem] font-bold uppercase tracking-[.2em] opacity-60">Visit channel</span>
    </aside>
  );
}
