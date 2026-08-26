export type Story = {
  slug: string;
  eyebrow: string;
  title: string;
  dek: string;
  body: string[];
  image: string;
  trackLabel: string;
  trackHref: string;
};

export const stories: Story[] = [
  {
    slug: "the-sound-of-keys-at-the-door",
    eyebrow: "A listening story",
    title: "The sound of keys at the door",
    dek: "Some memories arrive as ordinary sounds: a key turning, a collar moving, a familiar pause before the door opens.",
    body: [
      "The house does not become empty all at once. It changes in small places first: the bowl that stays on the shelf, the patch of afternoon light that no one claims, the sound you still expect before you remember.",
      "There is no need to make the memory disappear. You can let one sound be a doorway into gratitude, then return gently to the room you are in. A song, a photograph, or a sentence in a notebook can give the feeling somewhere safe to land.",
    ],
    image: "/images/story-rescue.webp",
    trackLabel: "Listen to the remembrance collection",
    trackHref: "https://www.youtube.com/channel/UCyTzBEJFvEvFfREmZhSRmdw",
  },
  {
    slug: "when-the-room-learns-a-new-shape",
    eyebrow: "A quiet reflection",
    title: "When the room learns a new shape",
    dek: "A home can hold absence and love at the same time. The new shape is not a betrayal of the old one.",
    body: [
      "Grief often changes the map of an ordinary day. The places where a pet rested become landmarks, and the routines around them may need time before they feel like yours again.",
      "Try beginning with one small ritual that belongs to the present: open a window, keep a favorite photograph nearby, or write down one detail you want to remember. A gentle routine does not replace the bond; it gives you a way to carry it.",
    ],
    image: "/images/listening-night.webp",
    trackLabel: "Explore Unsent Melodies",
    trackHref: "https://www.youtube.com/channel/UCyTzBEJFvEvFfREmZhSRmdw",
  },
];

export function findStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
