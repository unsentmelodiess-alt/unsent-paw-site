/** Fireside Editorial design: temporary English brand configuration. Change only this file when the final name is chosen. */
export const siteConfig = {
  brandName: "Pet Memory Studio",
  brandTagline: "Music, memories, and gentler days with pets.",
  contactEmail: "hello.unsentmelodies@gmail.com",
  social: {
    youtube: "https://www.youtube.com/@unsentmelodies",
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
