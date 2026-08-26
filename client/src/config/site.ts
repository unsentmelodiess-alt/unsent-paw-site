/** Canonical brand configuration for the Unsent Melodies channel and listening space. */
export const siteConfig = {
  brandName: "Unsent Melodies",
  brandTagline: "Pet memories, comfort, and calm.",
  contactEmail: "hello.unsentmelodies@gmail.com",
  social: {
    youtube: "https://www.youtube.com/channel/UCyTzBEJFvEvFfREmZhSRmdw",
    support: "https://buymeacoffee.com/unsentmelodies",
    etsy: "https://www.etsy.com/",
  },
  assets: {
    logo: "/images/logo.webp",
    hero: "/images/hero.webp",
    rescueStory: "/images/story-rescue.webp",
    listeningNight: "/images/listening-night.webp",
  },
} as const;

export const navItems = [
  { label: "Home", href: "/#home" },
  { label: "Memory Wall", href: "/#memory-wall" },
  { label: "Listen", href: "/#listen" },
  { label: "Stories", href: "/#stories" },
  { label: "Journal", href: "/journal" },
  { label: "Guides", href: "/#guides" },
  { label: "Shop", href: "/#shop" },
];
