/** Fireside Editorial design: a compact listening ritual with practical timer and repeat controls. */
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Repeat2, Timer, Pause, Play, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const sampleAudio = "https://cdn.pixabay.com/download/audio/2022/03/15/audio_6b5b3b45af.mp3?filename=relaxing-mountains-rivers-streams-running-water-18178.mp3";

export function AudioDock() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(18);
  useEffect(() => { if (!remaining) return; const id = window.setInterval(() => setRemaining((value) => value && value > 1 ? value - 1 : null), 1000); return () => window.clearInterval(id); }, [remaining]);
  useEffect(() => { if (remaining === null && playing) { audioRef.current?.pause(); setPlaying(false); } }, [remaining, playing]);
  const toggle = async () => { const audio = audioRef.current; if (!audio) return; if (audio.paused) { try { await audio.play(); setPlaying(true); } catch { setPlaying(false); } } else { audio.pause(); setPlaying(false); } };
  if (!visible) return <button className="fixed bottom-5 right-5 z-40 rounded-full bg-[#75836D] px-4 py-3 text-xs font-bold text-white shadow-xl" onClick={() => setVisible(true)}>Open player</button>;
  return <aside className="fixed bottom-3 left-3 right-3 z-40 rounded-[1.35rem] border border-white/30 bg-[#252a25]/95 p-3 text-[#f5f0e8] shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-1/2 sm:w-[min(720px,calc(100%-40px))] sm:-translate-x-1/2">
    <audio ref={audioRef} src={sampleAudio} loop={repeat} onTimeUpdate={(e) => { const a = e.currentTarget; if (a.duration) setProgress(Math.round((a.currentTime / a.duration) * 100)); }} onEnded={() => setPlaying(false)} />
    <div className="flex items-center gap-3"><Button size="icon" onClick={toggle} className="size-10 shrink-0 rounded-full bg-[#e5b17c] text-[#2b251e] hover:bg-[#f0c38f]">{playing ? <Pause className="size-4 fill-current" /> : <Play className="ml-0.5 size-4 fill-current" />}</Button><div className="min-w-0 flex-1"><div className="mb-1 flex items-center justify-between gap-3"><p className="truncate font-display text-[1.05rem]">Night window · soft water</p><span className="hidden text-[0.6rem] font-bold uppercase tracking-[.16em] text-[#b7c7ae] sm:block">Listening room</span></div><Slider value={[progress]} max={100} step={1} onValueChange={([value]) => { const a = audioRef.current; if (a?.duration) a.currentTime = (value / 100) * a.duration; setProgress(value); }} className="[&_[role=slider]]:size-3 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-[#e5b17c] [&_span]:bg-[#e5b17c]" /></div><div className="hidden items-center gap-1 sm:flex"><Button variant="ghost" size="icon" aria-label="Volume" className="size-8 text-[#f5f0e8] hover:bg-white/10"><Volume2 className="size-4" /></Button><Button variant={repeat ? "secondary" : "ghost"} size="icon" aria-label="Repeat audio" onClick={() => setRepeat(!repeat)} className="size-8 text-[#f5f0e8] hover:bg-white/10"><Repeat2 className="size-4" /></Button><Button variant={remaining ? "secondary" : "ghost"} size="icon" aria-label="Set 20 minute sleep timer" onClick={() => setRemaining(20 * 60)} className="size-8 text-[#f5f0e8] hover:bg-white/10"><Timer className="size-4" /></Button><Button variant="ghost" size="icon" aria-label="Close player" onClick={() => setVisible(false)} className="size-8 text-[#f5f0e8] hover:bg-white/10"><X className="size-4" /></Button></div></div>
    {remaining && <p className="mt-2 text-center text-[0.61rem] font-bold uppercase tracking-[.16em] text-[#b7c7ae]">Sleep timer · {Math.ceil(remaining / 60)} min remaining</p>}
  </aside>;
}
