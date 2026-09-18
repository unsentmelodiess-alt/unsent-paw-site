import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, "dist", "public");
const template = await readFile(path.join(outputDir, "index.html"), "utf8");
const siteUrl = "https://unsent-paw-site.vercel.app";

const routeMetadata = {
  "/": {
    title: "Unsent Melodies — Pet Memories, Comfort & Calm",
    description: "Unsent Melodies — pet memories, comfort, and calm through music and gentle reflection.",
  },
  "/journal": {
    title: "The Journal | Unsent Melodies",
    description: "Gentle, practical notes about pet loss, dog behavior, and calmer evenings from Unsent Melodies.",
  },
  "/stories": {
    title: "Stories & Listening | Unsent Melodies",
    description: "Quiet stories and listening reflections for the bonds that shape a home.",
  },
  "/shop": {
    title: "The Shop | Unsent Melodies",
    description: "Thoughtful digital keepsakes and gentle tools for remembering, reflecting, and caring for pets.",
  },
  "/about": {
    title: "About Unsent Melodies",
    description: "Learn about Unsent Melodies, a quiet space for pet memories, music, comfort, and kind reflection.",
  },
  "/contact": {
    title: "Contact | Unsent Melodies",
    description: "Get in touch with Unsent Melodies about pet remembrance, listening, editorial content, and digital products.",
  },
  "/privacy": {
    title: "Privacy Policy | Unsent Melodies",
    description: "Read the privacy policy for Unsent Melodies.",
  },
  "/terms": {
    title: "Terms | Unsent Melodies",
    description: "Read the terms of use for Unsent Melodies.",
  },
  "/journal/when-the-house-sounds-different": {
    title: "When the House Sounds Different | Unsent Melodies",
    description: "A gentle note about the ordinary sounds that can feel unexpectedly large after a pet dies.",
  },
  "/journal/a-letter-is-still-a-place-to-begin": {
    title: "A Letter Is Still a Place to Begin | Unsent Melodies",
    description: "What to write when you have a lot to say about a beloved pet and no obvious place to put it.",
  },
  "/journal/there-is-no-right-timeline-for-pet-grief": {
    title: "There Is No Right Timeline for Pet Grief | Unsent Melodies",
    description: "A compassionate reminder that pet grief does not follow one correct timeline.",
  },
  "/journal/read-the-room-before-you-read-the-rulebook": {
    title: "Read the Room Before You Read the Rulebook | Unsent Melodies",
    description: "A calmer starting point for understanding dog body language, context, and patterns.",
  },
  "/journal/the-kindest-cue-is-the-one-you-can-repeat": {
    title: "The Kindest Cue Is the One You Can Repeat | Unsent Melodies",
    description: "Why clear, reward-based practice is more useful than perfect obedience on the first try.",
  },
  "/journal/a-quieter-evening-with-your-pet": {
    title: "A Quieter Evening with Your Pet | Unsent Melodies",
    description: "A small, low-pressure sequence for closing the day with less noise and more familiar rhythm.",
  },
  "/journal/how-to-make-a-memory-box-for-your-pet": {
    title: "How to Make a Memory Box for Your Pet | Unsent Melodies",
    description: "A simple way to gather the objects, photographs, and words that help a beloved life stay close.",
  },
  "/journal/what-to-say-to-someone-who-lost-a-pet": {
    title: "What to Say to Someone Who Lost a Pet | Unsent Melodies",
    description: "Thoughtful words for supporting a grieving friend without minimizing the bond they shared.",
  },
  "/journal/how-to-help-a-dog-settle-in-the-evening": {
    title: "How to Help a Dog Settle in the Evening | Unsent Melodies",
    description: "A calm evening routine built from predictable cues, lower stimulation, and attention to your dog’s signals.",
  },
  "/journal/how-to-create-a-quiet-space-for-a-cat": {
    title: "How to Create a Quiet Space for a Cat | Unsent Melodies",
    description: "Small environmental choices that give a cat more control over rest, retreat, and gentle exploration.",
  },
  "/journal/how-to-explain-pet-loss-to-a-child": {
    title: "How to Explain Pet Loss to a Child | Unsent Melodies",
    description: "A clear, compassionate starting point for answering children’s questions when a beloved animal dies.",
  },
  "/journal/should-you-play-music-for-a-dog-when-you-leave": {
    title: "Should You Play Music for a Dog When You Leave? | Unsent Melodies",
    description: "A thoughtful guide to using music as an optional part of a calmer routine for a dog at home.",
  },
  "/stories/the-sound-of-keys-at-the-door": {
    title: "The Sound of Keys at the Door | Unsent Melodies",
    description: "A quiet listening story about the ordinary sounds that can hold an extraordinary amount of love.",
  },
  "/stories/when-the-room-learns-a-new-shape": {
    title: "When the Room Learns a New Shape | Unsent Melodies",
    description: "A reflection on home, habit, and the small spaces a pet leaves behind.",
  },
  "/stories/the-place-beside-your-feet": {
    title: "The Place Beside Your Feet | Unsent Melodies",
    description: "A remembrance story about the small movements and spaces that keep a beloved pet close.",
  },
  "/journal/how-to-remember-a-pet-on-their-birthday": {
    title: "How to Remember a Pet on Their Birthday | Unsent Melodies",
    description: "A gentle collection of ideas for marking a beloved pet's birthday after loss.",
  },
  "/journal/how-to-help-a-grieving-pet-after-another-pet-dies": {
    title: "How to Help a Grieving Pet After Another Pet Dies | Unsent Melodies",
    description: "What to notice when a surviving dog or cat seems different after a companion dies.",
  },
};

function escapeHtml(value) {
  return value.replace(/[&<>\'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function renderHtml(route, metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = `${siteUrl}${route === "/" ? "/" : route}`;
  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);
}

for (const [route, metadata] of Object.entries(routeMetadata)) {
  const target = route === "/" ? path.join(outputDir, "index.html") : path.join(outputDir, route.slice(1), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, renderHtml(route, metadata));
}

console.log(`Generated SEO HTML for ${Object.keys(routeMetadata).length} public routes.`);
