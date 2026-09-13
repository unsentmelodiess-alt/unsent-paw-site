import { Button } from "@/components/ui/button";
import { getListeningTracks, type ListeningTrack } from "@/lib/content";
import { ExternalLink, Headphones, Timer, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { siteConfig } from "@/config/site";

function youtubeEmbedUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return `https://www.youtube.com/embed/${url.pathname.slice(1)}?rel=0`;
    if (url.hostname.endsWith("youtube.com")) {
      const playlist = url.searchParams.get("list");
      if (playlist) return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlist)}`;
      const video = url.searchParams.get("v") || url.pathname.split("/").filter(Boolean).pop();
      if (video && video !== "watch") return `https://www.youtube.com/embed/${encodeURIComponent(video)}?rel=0`;
    }
  } catch { /* Invalid URLs are ignored and never interpolated into an iframe. */ }
  return null;
}

export function AudioDock() {
  const [tracks, setTracks] = useState<ListeningTrack[]>([]);
  const [active, setActive] = useState<ListeningTrack | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => { void getListeningTracks().then(setTracks); }, []);
  useEffect(() => {
    if (remaining === null) return;
    const id = window.setInterval(() => setRemaining((value) => value && value > 1 ? value - 1 : null), 1000);
    return () => window.clearInterval(id);
  }, [remaining]);

  const embedUrl = useMemo(() => active ? youtubeEmbedUrl(active.youtubeUrl) : null, [active]);
  const current = active ?? tracks[0] ?? null;
  const openTrack = (track: ListeningTrack) => { setActive(track); setExpanded(true); };

  if (!visible) return <button className="fixed bottom-5 right-5 z-40 rounded-full bg-[#75836D] px-4 py-3 text-xs font-bold text-white shadow-xl" onClick={() => setVisible(true)}>Open listening room</button>;
  return <aside id="audio-player" className="fixed bottom-3 left-3 right-3 z-40 rounded-[1.35rem] border border-white/30 bg-[#252a25]/95 p-3 text-[#f5f0e8] shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-1/2 sm:w-[min(720px,calc(100%-40px))] sm:-translate-x-1/2">
    {expanded && embedUrl && <div className="mb-3 overflow-hidden rounded-xl bg-black"><iframe title={current?.title ?? "Unsent Melodies listening track"} src={embedUrl} className="aspect-video w-full" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen /></div>}
    <div className="flex items-center gap-3"><div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e5b17c] text-[#2b251e]"><Headphones className="size-4" /></div><div className="min-w-0 flex-1"><div className="mb-1 flex items-center justify-between gap-3"><p className="truncate font-display text-[1.05rem]">{current?.title ?? "YouTube listening room"}</p><span className="hidden text-[0.6rem] font-bold uppercase tracking-[.16em] text-[#b7c7ae] sm:block">{current?.category ?? "Choose a track"}</span></div>{tracks.length > 0 ? <select aria-label="Choose a listening track" value={current?.slug ?? ""} onChange={(event) => { const track = tracks.find((item) => item.slug === event.target.value); if (track) openTrack(track); }} className="max-w-full bg-transparent text-xs text-[#cfc8bc] outline-none"><option className="text-[#342e27]" value="">Choose a track</option>{tracks.map((track) => <option className="text-[#342e27]" key={track.slug} value={track.slug}>{track.title}</option>)}</select> : <p className="text-xs text-[#cfc8bc]">Add a YouTube video or playlist from Admin → Listening tracks.</p>}</div><div className="flex items-center gap-1"><Button variant="ghost" size="icon" aria-label="Open listening track" onClick={() => current ? openTrack(current) : window.open(siteConfig.social.youtube, "_blank", "noopener,noreferrer")} className="size-8 text-[#f5f0e8] hover:bg-white/10"><ExternalLink className="size-4" /></Button><Button variant={remaining ? "secondary" : "ghost"} size="icon" aria-label="Set 20 minute sleep timer" onClick={() => setRemaining(20 * 60)} className="size-8 text-[#f5f0e8] hover:bg-white/10"><Timer className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="Close player" onClick={() => setVisible(false)} className="size-8 text-[#f5f0e8] hover:bg-white/10"><X className="size-4" /></Button></div></div>
    {remaining && <p className="mt-2 text-center text-[0.61rem] font-bold uppercase tracking-[.16em] text-[#b7c7ae]">Sleep timer · {Math.ceil(remaining / 60)} min remaining</p>}
  </aside>;
}
