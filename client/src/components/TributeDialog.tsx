/** Fireside Editorial design: a dignified, privacy-forward tribute form with gentle feedback. */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";

export type Tribute = { name: string; dates: string; note: string };

export function TributeDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (tribute: Tribute) => void }) {
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [note, setNote] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !note.trim()) return;
    onSubmit({ name: name.trim(), dates: dates.trim() || "A life well loved", note: note.trim() });
    setName(""); setDates(""); setNote(""); onOpenChange(false);
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] overflow-y-auto border-[#d9d0c0] bg-[#fbf8f1] p-0 sm:max-w-lg dark:border-white/10 dark:bg-[#202620]">
      <div className="border-b border-[#d9d0c0] bg-[#e9e3d6] px-6 py-7 dark:border-white/10 dark:bg-[#293129]">
        <span className="mb-3 inline-grid size-10 place-items-center rounded-full bg-[#75836D] text-white"><Heart className="size-4" /></span>
        <DialogHeader><DialogTitle className="font-display text-3xl tracking-[-0.04em]">Leave a memory</DialogTitle><DialogDescription className="mt-2 max-w-sm text-[#665e53] dark:text-[#cfc8bc]">A small place for a name, a moment, and the love that still stays with you.</DialogDescription></DialogHeader>
      </div>
      <form onSubmit={submit} className="space-y-5 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="pet-name">Pet’s name <span className="text-[#a65f46]">*</span></Label><Input id="pet-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Milo" required className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></div><div className="space-y-2"><Label htmlFor="dates">Dates or a small note</Label><Input id="dates" value={dates} onChange={(e) => setDates(e.target.value)} placeholder="2010 — 2024" className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></div></div>
        <div className="space-y-2"><Label htmlFor="tribute">Your tribute <span className="text-[#a65f46]">*</span></Label><Textarea id="tribute" value={note} onChange={(e) => setNote(e.target.value)} placeholder="The little thing you still remember…" required className="min-h-32 resize-none border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></div>
        <div className="flex gap-3 rounded-2xl bg-[#f0ece3] p-3 text-xs leading-relaxed text-[#665e53] dark:bg-white/5 dark:text-[#cfc8bc]"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#75836D]" />In this prototype, your tribute stays in this browser only. A live wall will require moderation, consent, and secure storage.</div>
        <Button type="submit" className="w-full rounded-full bg-[#75836D] py-6 text-sm font-bold text-white hover:bg-[#5e6d57]">Place this memory on the wall</Button>
      </form>
    </DialogContent>
  </Dialog>;
}
