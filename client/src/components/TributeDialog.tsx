/** Fireside Editorial design: a dignified, consent-first tribute form with optional pet photo upload. */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, ImagePlus, LockKeyhole } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export type TributeDraft = { name: string; dates: string; note: string; consent: boolean; photo?: File | null };

export function TributeDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (tribute: TributeDraft) => Promise<{ ok: boolean; message: string }> }) {
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!photo) { setPreview(""); return; }
    const url = URL.createObjectURL(photo);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [photo]);

  const choosePhoto = (file: File | undefined) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) { setMessage("Please choose a JPG, PNG, or WebP image."); return; }
    if (file.size > 5 * 1024 * 1024) { setMessage("Please choose an image smaller than 5 MB."); return; }
    setMessage(""); setPhoto(file);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !note.trim() || !consent) return;
    setBusy(true); setMessage("");
    const result = await onSubmit({ name: name.trim(), dates: dates.trim(), note: note.trim(), consent, photo });
    setBusy(false); setMessage(result.message);
    if (result.ok) { setName(""); setDates(""); setNote(""); setConsent(false); setPhoto(null); }
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] overflow-y-auto border-[#d9d0c0] bg-[#fbf8f1] p-0 sm:max-w-lg dark:border-white/10 dark:bg-[#202620]">
      <div className="border-b border-[#d9d0c0] bg-[#e9e3d6] px-6 py-7 dark:border-white/10 dark:bg-[#293129]">
        <span className="mb-3 inline-grid size-10 place-items-center rounded-full bg-[#75836D] text-white"><Heart className="size-4" /></span>
        <DialogHeader><DialogTitle className="font-display text-3xl tracking-[-0.04em]">Leave a memory</DialogTitle><DialogDescription className="mt-2 max-w-sm text-[#665e53] dark:text-[#cfc8bc]">Share a name, a moment, and an optional photo. Every submission is reviewed before it appears publicly.</DialogDescription></DialogHeader>
      </div>
      <form onSubmit={submit} className="space-y-5 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="pet-name">Pet’s name <span className="text-[#a65f46]">*</span></Label><Input id="pet-name" maxLength={80} value={name} onChange={(e) => setName(e.target.value)} placeholder="Milo" required className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></div><div className="space-y-2"><Label htmlFor="dates">Dates or a small note</Label><Input id="dates" maxLength={80} value={dates} onChange={(e) => setDates(e.target.value)} placeholder="2010 — 2024" className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></div></div>
        <div className="space-y-2"><Label htmlFor="tribute">Your tribute <span className="text-[#a65f46]">*</span></Label><textarea id="tribute" maxLength={2000} value={note} onChange={(e) => setNote(e.target.value)} placeholder="The little thing you still remember…" required className="min-h-32 w-full resize-none rounded-xl border border-[#cfc5b4] bg-white/70 p-3 dark:border-white/15 dark:bg-white/5" /></div>
        <div className="space-y-2"><Label htmlFor="tribute-photo">Photo (optional)</Label><label htmlFor="tribute-photo" className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-[#b9ae9d] p-4 text-sm text-[#665e53] hover:bg-[#f0ece3] dark:border-white/20 dark:text-[#cfc8bc] dark:hover:bg-white/5"><ImagePlus className="size-5 text-[#75836D]" /><span>{photo ? photo.name : "Choose a JPG, PNG, or WebP image up to 5 MB"}</span></label><input id="tribute-photo" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => choosePhoto(e.target.files?.[0])} />{preview && <img src={preview} alt="Selected pet preview" className="h-40 w-full rounded-2xl object-cover" />}</div>
        <label className="flex items-start gap-3 text-xs leading-relaxed text-[#665e53] dark:text-[#cfc8bc]"><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required className="mt-0.5 size-4 accent-[#75836D]" />I own or have permission to share this text and photo, and I allow Unsent Melodies to publish them after review.</label>
        <div className="flex gap-3 rounded-2xl bg-[#f0ece3] p-3 text-xs leading-relaxed text-[#665e53] dark:bg-white/5 dark:text-[#cfc8bc]"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#75836D]" />Your submission stays private until it is reviewed. Do not upload documents or sensitive personal information.</div>
        {message && <p role="status" className="rounded-xl bg-[#dce5d7] p-3 text-sm text-[#506049]">{message}</p>}
        <Button type="submit" disabled={busy || !consent} className="w-full rounded-full bg-[#75836D] py-6 text-sm font-bold text-white hover:bg-[#5e6d57]">{busy ? "Sending…" : "Send for review"}</Button>
      </form>
    </DialogContent>
  </Dialog>;
}
