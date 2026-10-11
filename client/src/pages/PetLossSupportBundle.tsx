import { useEffect } from "react";
import { ArrowRight, Check, ExternalLink, Heart, Mail, ShieldCheck } from "lucide-react";
import { JournalChrome } from "@/components/JournalChrome";
import { setPageMeta } from "@/lib/seo";

const resources = [
  {
    eyebrow: "For practical next steps",
    title: "After: A Pet Loss Support Checklist",
    description: "A gentle checklist for the small decisions that follow pet loss: home, belongings, records, family, other pets, and caring for yourself.",
    etsy: "https://www.etsy.com/listing/4574578262/after-a-pet-loss-support-checklist-pet",
    gumroad: "https://unsentmelodies.gumroad.com/l/czqktb",
  },
  {
    eyebrow: "For reflection and remembrance",
    title: "Letters to Love: A Grief Healing Journal",
    description: "A guided fillable journal for remembering who your pet was, making room for difficult feelings, and carrying their love forward.",
    etsy: "https://www.etsy.com/listing/4583290367/letters-to-love-pet-loss-journal-dog-cat",
    gumroad: "https://unsentmelodies.gumroad.com/l/natigv",
  },
  {
    eyebrow: "For saying what was left unsaid",
    title: "Rainbow Bridge: Letters of Farewell",
    description: "Five fillable letter templates for gratitude, apology, memory, farewell, and a child-friendly goodbye, with room to write in your own way.",
    etsy: "https://www.etsy.com/listing/4583352144/rainbow-bridge-pet-loss-letters-dog-cat",
    gumroad: "https://unsentmelodies.gumroad.com/l/nadfpr",
  },
  {
    eyebrow: "For small moments of comfort",
    title: "Gentle Days: 40 Pet Loss Affirmation Cards",
    description: "Forty printable, non-clinical cards offering permission to feel, gentle reminders about guilt and love, and quiet encouragement for difficult days.",
    etsy: "https://www.etsy.com/listing/4586058140/gentle-days-pet-loss-affirmation-cards",
    gumroad: "https://unsentmelodies.gumroad.com/l/frbtph",
  },
];

const faqs = [
  ["What is the Pet Loss Support Bundle?", "It is a gentle collection of four digital pet-loss resources: a practical checklist, a guided grief journal, farewell letter templates, and printable affirmation cards. You can begin with the resource that fits today."],
  ["Are these physical products?", "No. These are digital downloads. No physical item is shipped. The storefront you choose provides the current checkout, download, tax, and availability details."],
  ["Can I use the files digitally or print them?", "The journals and letter templates include fillable PDF versions. Printable files can be used at home or through a local print service, with A4 and US Letter versions where applicable."],
  ["Do I have to use everything at once?", "No. There is no required order or timeline. One page, one letter, or one quiet sentence is enough for today."],
  ["Is this therapy or medical advice?", "No. This is a remembrance and reflection collection, not therapy, veterinary care, or crisis support. Contact a qualified professional or local support service for urgent needs."],
];

export default function PetLossSupportBundle() {
  useEffect(() => {
    setPageMeta({
      title: "Pet Loss Support Bundle | Gentle Digital Grief & Memorial Tools",
      description: "A gentle pet loss support collection with a practical checklist, grief journal, farewell letters, and printable affirmation cards for remembering a beloved dog or cat.",
      path: "/shop/pet-loss-support-bundle",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Pet Loss Support Bundle",
        description: "A gentle digital collection for dog and cat owners grieving the loss of a beloved pet.",
        url: "https://www.unsentmelodies.com/shop/pet-loss-support-bundle",
        isPartOf: { "@type": "WebSite", name: "Unsent Melodies", url: "https://www.unsentmelodies.com/" },
      },
    });
  }, []);

  return (
    <JournalChrome>
      <main>
        <section className="bg-[#e9e3d6] py-20 dark:bg-[#202620] sm:py-28">
          <div className="container grid max-w-6xl gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
            <div>
              <p className="eyebrow"><Heart className="size-3" />A gentle digital collection for difficult days</p>
              <h1 className="mt-5 max-w-4xl font-display text-6xl leading-[.94] tracking-[-.06em] sm:text-8xl">Pet Loss Support Bundle</h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[#625a4f] dark:text-[#cfc8bc]">A quiet place to begin when grief makes everything feel like too much.</p>
              <p className="mt-5 max-w-2xl leading-7 text-[#71695d] dark:text-[#bcb5a9]">Four gentle digital tools for the days after losing a beloved dog or cat: practical support, guided reflection, farewell letters, and small words of comfort.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#included" className="inline-flex items-center gap-2 rounded-full bg-[#75836D] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#5e6d57]">See what is included <ArrowRight className="size-4" /></a>
                <a href="/shop" className="inline-flex items-center gap-2 rounded-full border border-[#75836D] px-6 py-3 text-sm font-bold text-[#5e6d57] transition hover:bg-[#75836D] hover:text-white dark:text-[#c9d8c0]">Visit the full shop</a>
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[.12em] text-[#71695d] dark:text-[#bcb5a9]">Digital downloads · No physical item shipped · A4 and US Letter files where applicable</p>
            </div>
            <div className="rounded-[2rem] bg-[#302d27] p-7 text-[#ede8dc] shadow-[0_20px_60px_rgba(70,61,49,.16)] sm:p-9">
              <p className="text-[.63rem] font-bold uppercase tracking-[.18em] text-[#b7c7ae]">Use it at your own pace</p>
              <p className="mt-6 font-display text-4xl leading-tight tracking-[-.04em]">You do not have to use everything at once.</p>
              <p className="mt-5 text-sm leading-7 text-[#c9c2b5]">Open one page, write one sentence, or simply keep the collection nearby until you are ready.</p>
              <div className="mt-7 space-y-3 text-sm text-[#d9d2c6]">
                {["Practical care when decisions feel difficult", "Words for what remains unsaid", "Small comfort for the days that arrive without warning"].map((item) => <p key={item} className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0 text-[#b7c7ae]" />{item}</p>)}
              </div>
            </div>
          </div>
        </section>

        <section id="included" className="container max-w-6xl scroll-mt-8 py-16 sm:py-24" aria-labelledby="included-heading">
          <div className="max-w-2xl"><p className="eyebrow">Inside the collection</p><h2 id="included-heading" className="mt-3 font-display text-5xl tracking-[-.05em]">Four ways to be supported.</h2><p className="mt-5 leading-7 text-[#71695d] dark:text-[#bcb5a9]">Some days call for a checklist. Some call for a letter. Some days you may only have the energy to read one sentence and breathe.</p></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {resources.map((resource) => <article key={resource.title} className="flex flex-col rounded-[2rem] border border-[#d9d0c0] bg-[#fbf8f1] p-7 shadow-[0_16px_50px_rgba(70,61,49,.06)] dark:border-white/10 dark:bg-white/5 sm:p-9"><p className="eyebrow">{resource.eyebrow}</p><h3 className="mt-7 font-display text-3xl leading-tight tracking-[-.04em]">{resource.title}</h3><p className="mt-4 flex-1 text-sm leading-7 text-[#71695d] dark:text-[#bcb5a9]">{resource.description}</p><div className="mt-7 flex flex-wrap gap-3"><a href={resource.etsy} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#75836D] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#5e6d57]">Buy on Etsy <ExternalLink className="size-3.5" /></a><a href={resource.gumroad} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#75836D] px-5 py-3 text-xs font-bold text-[#5e6d57] transition hover:bg-[#75836D] hover:text-white dark:text-[#c9d8c0]">Buy on Gumroad <ExternalLink className="size-3.5" /></a></div></article>)}
          </div>
          <p className="mt-7 text-sm leading-7 text-[#71695d] dark:text-[#bcb5a9]">Prices, discounts, taxes, and delivery details are shown by the selected marketplace and may change over time.</p>
        </section>

        <section className="bg-[#dce5d7] py-16 dark:bg-[#2e3c2e] sm:py-20" aria-labelledby="how-heading"><div className="container max-w-6xl"><div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start"><div><p className="eyebrow">A flexible path</p><h2 id="how-heading" className="mt-3 font-display text-5xl tracking-[-.05em] text-[#384136] dark:text-[#e7eee3]">Start with what feels manageable.</h2></div><div className="grid gap-4 sm:grid-cols-3">{[["01", "Choose one starting point", "Begin with the checklist, a letter, the journal, or one affirmation card."], ["02", "Use it digitally or on paper", "Type into fillable PDFs or print selected pages and write by hand."], ["03", "Return when you need to", "There is no required order, deadline, or perfect way to remember." ]].map(([number, title, body]) => <div key={number} className="rounded-2xl bg-white/50 p-5 text-[#384136] dark:bg-white/10 dark:text-[#e7eee3]"><p className="text-xs font-bold tracking-[.16em] text-[#5e6d57]">{number}</p><h3 className="mt-5 font-display text-2xl leading-tight">{title}</h3><p className="mt-3 text-sm leading-6 opacity-80">{body}</p></div>)}</div></div></div></section>

        <section className="container grid max-w-6xl gap-8 py-16 sm:py-24 lg:grid-cols-[1.1fr_.9fr]" aria-labelledby="details-heading"><div><p className="eyebrow"><ShieldCheck className="size-3" />Clear before you choose</p><h2 id="details-heading" className="mt-3 font-display text-5xl tracking-[-.05em]">Made for remembrance, not pressure.</h2><p className="mt-5 max-w-2xl leading-7 text-[#71695d] dark:text-[#bcb5a9]">Unsent Melodies is a quieter place for pet people—a space for memory, music, reflection, and gentle practical support. These resources do not ask you to move on or measure your grief. They offer a few places to put the love, memories, and words you are carrying.</p><div className="mt-8 space-y-3 text-sm leading-7 text-[#625a4f] dark:text-[#cfc8bc]"><p><strong>No fixed timeline.</strong> Use the pages when you are ready.</p><p><strong>No forced positivity.</strong> Difficult feelings are allowed.</p><p><strong>No perfect way to remember.</strong> Your relationship with your pet was yours.</p></div></div><aside className="rounded-[2rem] bg-[#f1dfcf] p-7 text-[#644b3a] dark:bg-[#4a372e] dark:text-[#f1d1bd] sm:p-9"><Mail className="size-6 text-[#a65f46]" /><h2 className="mt-6 font-display text-3xl leading-tight">Not ready to choose a product?</h2><p className="mt-4 text-sm leading-7">You can begin with a free guide, read a quiet story, or listen for a while.</p><div className="mt-7 flex flex-wrap gap-3"><a href="/pet-loss-support" className="inline-flex items-center gap-2 rounded-full bg-[#644b3a] px-5 py-3 text-xs font-bold text-white">Visit the support hub <ArrowRight className="size-4" /></a><a href="/stories" className="inline-flex items-center gap-2 rounded-full border border-[#a65f46] px-5 py-3 text-xs font-bold">Read a story <ArrowRight className="size-4" /></a></div></aside></section>

        <section className="bg-[#302d27] py-16 text-[#ede8dc] sm:py-20" aria-labelledby="faq-heading"><div className="container max-w-4xl"><p className="text-[.63rem] font-bold uppercase tracking-[.18em] text-[#b7c7ae]">Questions</p><h2 id="faq-heading" className="mt-3 font-display text-5xl tracking-[-.05em]">Before you begin.</h2><div className="mt-8 divide-y divide-white/15">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 font-display text-2xl marker:hidden">{question}</summary><p className="mt-3 max-w-3xl text-sm leading-7 text-[#c9c2b5]">{answer}</p></details>)}</div><div className="mt-10 flex flex-wrap gap-3"><a href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#b7c7ae] px-6 py-3 text-sm font-bold text-[#302d27]">Return to the shop <ArrowRight className="size-4" /></a><a href="/#listen" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-[#ede8dc]">Listen for a while <ArrowRight className="size-4" /></a></div></div></section>
      </main>
    </JournalChrome>
  );
}
