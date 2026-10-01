import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockKeyhole, PenLine } from "lucide-react";
import { FormEvent, useState } from "react";

export type CommunityStoryDraft = {
  title: string;
  petName: string;
  storyBody: string;
  authorDisplay: string;
  privateEmail: string;
  consentPublish: boolean;
  consentMedia: boolean;
};

export function CommunityStoryDialog({ open, onOpenChange, onSubmit }: { open: boolean; onOpenChange: (open: boolean) => void; onSubmit: (story: CommunityStoryDraft) => Promise<{ ok: boolean; message: string }> }) {
  const [title, setTitle] = useState("");
  const [petName, setPetName] = useState("");
  const [storyBody, setStoryBody] = useState("");
  const [authorDisplay, setAuthorDisplay] = useState("");
  const [privateEmail, setPrivateEmail] = useState("");
  const [consentPublish, setConsentPublish] = useState(false);
  const [consentMedia, setConsentMedia] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!consentPublish) return;
    setBusy(true); setMessage("");
    const result = await onSubmit({ title: title.trim(), petName: petName.trim(), storyBody: storyBody.trim(), authorDisplay: authorDisplay.trim(), privateEmail: privateEmail.trim(), consentPublish, consentMedia });
    setBusy(false); setMessage(result.message);
    if (result.ok) { setTitle(""); setPetName(""); setStoryBody(""); setAuthorDisplay(""); setPrivateEmail(""); setConsentPublish(false); setConsentMedia(false); }
  };

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] overflow-y-auto border-[#d9d0c0] bg-[#fbf8f1] p-0 sm:max-w-2xl dark:border-white/10 dark:bg-[#202620]">
      <div className="border-b border-[#d9d0c0] bg-[#e9e3d6] px-6 py-7 dark:border-white/10 dark:bg-[#293129]"><span className="mb-3 inline-grid size-10 place-items-center rounded-full bg-[#75836D] text-white"><PenLine className="size-4" /></span><DialogHeader><DialogTitle className="font-display text-3xl tracking-[-.04em]">Share their story</DialogTitle><DialogDescription className="mt-2 max-w-xl text-[#665e53] dark:text-[#cfc8bc]">Tell us about the life, habits, or ordinary moments you want to keep close. We read every story before it is published.</DialogDescription></DialogHeader></div>
      <form onSubmit={submit} className="space-y-5 px-6 py-6">
        <div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-semibold"><Label htmlFor="story-title">Story title *</Label><Input id="story-title" minLength={5} maxLength={140} required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="The morning walk we still remember" className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></label><label className="space-y-2 text-sm font-semibold"><Label htmlFor="story-pet">Pet’s name *</Label><Input id="story-pet" maxLength={80} required value={petName} onChange={(e) => setPetName(e.target.value)} placeholder="Milo" className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></label></div>
        <label className="block space-y-2 text-sm font-semibold"><Label htmlFor="story-body">Their story *</Label><textarea id="story-body" minLength={80} maxLength={12000} required value={storyBody} onChange={(e) => setStoryBody(e.target.value)} placeholder="You can write about the beginning, a favorite ritual, a funny detail, or what you carry forward…" className="min-h-56 w-full resize-y rounded-xl border border-[#cfc5b4] bg-white/70 p-3 font-normal dark:border-white/15 dark:bg-white/5" /><span className="block text-xs font-normal text-[#756c60]">{storyBody.length}/12,000 characters</span></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="space-y-2 text-sm font-semibold"><Label htmlFor="story-author">Name to show publicly</Label><Input id="story-author" maxLength={80} value={authorDisplay} onChange={(e) => setAuthorDisplay(e.target.value)} placeholder="First name or a pen name" className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></label><label className="space-y-2 text-sm font-semibold"><Label htmlFor="story-email">Private email (optional)</Label><Input id="story-email" type="email" value={privateEmail} onChange={(e) => setPrivateEmail(e.target.value)} placeholder="Only for follow-up" className="border-[#cfc5b4] bg-white/70 dark:border-white/15 dark:bg-white/5" /></label></div>
        <label className="flex items-start gap-3 text-xs leading-relaxed text-[#665e53] dark:text-[#cfc8bc]"><input type="checkbox" checked={consentPublish} onChange={(e) => setConsentPublish(e.target.checked)} required className="mt-0.5 size-4 accent-[#75836D]" />I wrote this story or have permission to share it, and I give Unsent Melodies permission to edit lightly for clarity and publish it on the website after review.</label>
        <label className="flex items-start gap-3 text-xs leading-relaxed text-[#665e53] dark:text-[#cfc8bc]"><input type="checkbox" checked={consentMedia} onChange={(e) => setConsentMedia(e.target.checked)} className="mt-0.5 size-4 accent-[#75836D]" />I also allow the approved story to be adapted for a reading, video, or social post. This is optional and can be left unchecked.</label>
        <div className="flex gap-3 rounded-2xl bg-[#f0ece3] p-3 text-xs leading-relaxed text-[#665e53] dark:bg-white/5 dark:text-[#cfc8bc]"><LockKeyhole className="mt-0.5 size-4 shrink-0 text-[#75836D]" />Your email stays private. We will not publish or reuse your story until it has been reviewed.</div>
        {message && <p role="status" className="rounded-xl bg-[#dce5d7] p-3 text-sm text-[#506049]">{message}</p>}
        <Button type="submit" disabled={busy || !consentPublish} className="w-full rounded-full bg-[#75836D] py-6 text-sm font-bold text-white hover:bg-[#5e6d57]">{busy ? "Sending…" : "Send story for review"}</Button>
      </form>
    </DialogContent>
  </Dialog>;
}
