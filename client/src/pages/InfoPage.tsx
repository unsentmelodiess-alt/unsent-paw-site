import { JournalChrome } from "@/components/JournalChrome";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Link, useLocation } from "wouter";

const pages = {
  about: {
    eyebrow: "About Unsent Melodies",
    title: "A quieter place for pet people.",
    intro: "Unsent Melodies is a small creative home for music, remembrance, and gentle learning around the animals who shape our lives.",
    sections: [
      ["Why this exists", "Some bonds are too important to be reduced to a single goodbye. We make songs, stories, and practical resources for the ordinary days of loving an animal and the difficult days of missing one."],
      ["What we believe", "Care should feel kind, clear, and unhurried. We do not use fear, shame, or exaggerated promises. Our listening projects are made to offer company, not to replace veterinary, behavioral, medical, or mental-health care."],
      ["What is growing", "The site will gradually include original music, a moderated memory space, thoughtful digital keepsakes, and a second listening home for calm routines shared by dogs, cats, and their people."]
    ]
  },
  terms: {
    eyebrow: "Terms of use",
    title: "A clear agreement for a gentle space.",
    intro: "By using this website, you agree to use it respectfully and to understand what this early-stage project does and does not provide.",
    sections: [
      ["Content and education", "The articles, stories, music descriptions, and guides are provided for general information and reflection. They are not veterinary, medical, behavioral, legal, or mental-health advice, and they do not replace a qualified professional."],
      ["Your contributions", "If you submit a memory or message, you confirm that you have the right to share it. Do not submit private information about another person without permission. We may moderate, decline, or remove submissions that are unsafe, unlawful, abusive, or unrelated to the purpose of the space."],
      ["Digital products and links", "Product availability, descriptions, prices, delivery, refunds, and customer support are governed by the marketplace where a product is sold, such as Etsy or Gumroad. External links lead to services operated by other parties, and their own terms apply."],
      ["Updates", "We may improve, pause, or change parts of this website as the project grows. The current version of this page is the applicable version for site use."]
    ]
  },
  privacy: {
    eyebrow: "Privacy",
    title: "Your story should remain yours.",
    intro: "We aim to collect only what is needed to operate and improve this project, and we will not ask you to place sensitive personal information in a public memory.",
    sections: [
      ["Information you choose to share", "A memory submitted through the current prototype may be stored locally in your browser and may not be recoverable after browser data is cleared. Do not submit information you need us to preserve until a reviewed, persistent memory system is launched."],
      ["Analytics and links", "If analytics is enabled, it may record general usage such as pages visited, traffic sources, and button interactions. YouTube, Etsy, Gumroad, social networks, and music platforms operate under their own privacy policies when you follow an external link."],
      ["Contact and deletion", "For questions about a message or a future memory submission, email hello.unsentmelodies@gmail.com. Include only the minimum detail needed to help us respond. We will update this policy when new data features, accounts, or persistent storage are introduced."]
    ]
  },
  contact: {
    eyebrow: "Contact",
    title: "Bring a question to the quiet room.",
    intro: "For music, collaborations, product questions, or a concern about site content, send a short note and we will reply when we can.",
    sections: [
      ["Email", "hello.unsentmelodies@gmail.com"],
      ["For product questions", "Please include the product name and the marketplace where you purchased it. Never include payment details or passwords in an email."],
      ["For content concerns", "Tell us the page URL and what needs attention. We welcome corrections and respectful suggestions that make this space safer and more useful."]
    ]
  }
} as const;

type PageKey = keyof typeof pages;

export default function InfoPage() {
  const [location] = useLocation();
  const key = (location.replace("/", "") || "about") as PageKey;
  const page = pages[key] || pages.about;
  return (
    <JournalChrome>
      <main>
        <section className="bg-[#e9e3d6] py-20 dark:bg-[#202620] sm:py-28">
          <div className="container max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#5e6d57] hover:underline"><ArrowLeft className="size-4" />Back home</Link>
            <p className="eyebrow mt-12"><ShieldCheck className="size-3" />{page.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl font-display text-6xl leading-[.94] tracking-[-.06em] sm:text-8xl">{page.title}</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#625a4f] dark:text-[#cfc8bc]">{page.intro}</p>
          </div>
        </section>
        <section className="container max-w-3xl py-20">
          <div className="space-y-10">
            {page.sections.map(([heading, body]) => <section key={heading} className="border-b border-[#ded5c7] pb-10 last:border-0 dark:border-white/10"><h2 className="font-display text-4xl tracking-[-.05em]">{heading}</h2><p className="mt-4 text-[1.05rem] leading-8 text-[#514a40] dark:text-[#d2cbc0]">{heading === "Email" ? <a className="inline-flex items-center gap-2 text-[#5e6d57] underline underline-offset-4" href={`mailto:${body}`}><Mail className="size-4" />{body}</a> : body}</p></section>)}
          </div>
          <p className="mt-12 text-xs leading-6 text-[#817769]">Last updated: August 2026. This page is a plain-language starting point for the current site and should be reviewed before paid products, email subscriptions, or persistent user accounts launch.</p>
        </section>
      </main>
    </JournalChrome>
  );
}
