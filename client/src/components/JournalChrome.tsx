/** Fireside Editorial design: shared frame for Journal pages, preserving the quiet brand ritual outside the homepage. */
import { AudioDock } from "@/components/AudioDock";
import { SiteHeader } from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";
import { SoundPawMotif } from "@/components/SoundPawMotif";
import { useLocation } from "wouter";

export function JournalChrome({ children }: { children: React.ReactNode }) {
  const [, navigate] = useLocation();
  return <div className="min-h-screen bg-[#fbf8f1] text-[#342e27] dark:bg-[#1a1e1a] dark:text-[#f5f0e8]"><SiteHeader onLeaveMemory={() => navigate("/#memory-wall")} />{children}<footer className="bg-[#302d27] pb-28 pt-14 text-[#ede8dc]"><div className="container grid gap-8 md:grid-cols-[1.2fr_.8fr]"><div><SoundPawMotif className="w-32 text-[#b7c7ae]" /><p className="mt-4 font-display text-3xl">{siteConfig.brandName}</p><p className="mt-2 max-w-sm text-sm leading-6 text-[#c9c2b5]">{siteConfig.brandTagline}</p></div><div><p className="text-[.63rem] font-bold uppercase tracking-[.18em] text-[#b7c7ae]">Keep in touch</p><a href={`mailto:${siteConfig.contactEmail}`} className="mt-4 inline-block text-sm text-[#e5b17c] hover:underline">{siteConfig.contactEmail}</a><a href={siteConfig.social.youtube} target="_blank" rel="noreferrer" className="mt-3 block text-sm text-[#d9d2c6] hover:text-[#e5b17c]">Unsent Melodies on YouTube</a><div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#aca499]"><a href="/about" className="hover:text-[#e5b17c]">About</a><a href="/terms" className="hover:text-[#e5b17c]">Terms</a><a href="/privacy" className="hover:text-[#e5b17c]">Privacy</a><a href="/contact" className="hover:text-[#e5b17c]">Contact</a></div></div></div></footer><AudioDock /></div>;
}
