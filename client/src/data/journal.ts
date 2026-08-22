/** Fireside Editorial design: the first evergreen English journal collection, organized for calm discovery rather than high-volume publishing. */
export type JournalArticle = {
  slug: string;
  category: "Remembrance" | "Dog behavior" | "Calm at home";
  title: string;
  dek: string;
  readingTime: string;
  accent: string;
  label: string;
  product: string;
  track: string;
  sections: { heading: string; paragraphs: string[] }[];
  resources: { label: string; href: string }[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "when-the-house-sounds-different",
    category: "Remembrance",
    title: "When the house sounds different",
    dek: "A gentle way to meet the small, ordinary sounds that can feel unexpectedly large after a pet dies.",
    readingTime: "4 min read",
    accent: "peach",
    label: "A quiet note for pet loss",
    product: "Grief Healing Journal",
    track: "Night window · soft water",
    sections: [
      { heading: "The sounds can arrive before the thoughts", paragraphs: ["A floorboard, the lift of a key, the quiet before dinner. After a pet dies, familiar sounds may suddenly seem to point to the place where they used to be. There is nothing incorrect about noticing them. It is one way a routine reveals how much love was woven into it.", "You do not have to force these moments away or turn them into a lesson. It can be enough to name the sound, take one breath, and let the memory come and go in its own time."] },
      { heading: "Make one small listening ritual", paragraphs: ["Choose a time of day that often feels tender. Make tea, sit near a window, or play one quiet track. Keep a page nearby for a single sentence: “Today I remembered…” The purpose is not to preserve everything perfectly. It is simply to give the moment a place to land.", "If a wave of grief feels too heavy or begins to disrupt daily life, consider reaching out to a pet-loss support line, group, or mental-health professional. You do not need to carry every part of it alone."] },
    ],
    resources: [{ label: "Cornell Pet Loss Resources and Support", href: "https://www.vet.cornell.edu/impact/community-impact/pet-loss-resources-and-support" }],
  },
  {
    slug: "a-letter-is-still-a-place-to-begin",
    category: "Remembrance",
    title: "A letter is still a place to begin",
    dek: "What to write when you have a lot to say, and no obvious place to put it.",
    readingTime: "5 min read",
    accent: "moss",
    label: "A remembrance practice",
    product: "Memory Keepsake Cards",
    track: "The Phantom Weight",
    sections: [
      { heading: "Start with the everyday", paragraphs: ["You do not need a perfect opening. Start with the thing that returns most often: the way they waited at the door, the sound of their paws in another room, the place they always chose in the sun.", "Specific details can be gentler than trying to explain the entire bond. A letter can hold a thank-you, an apology, a story, or simply a name written slowly on a page."] },
      { heading: "Let the letter be unfinished", paragraphs: ["There is no obligation to arrive at a conclusion. Some letters stay open. Some become a few sentences that you read once and fold away. Others grow over months. All of those versions count.", "If you share a tribute publicly, keep control of what belongs to you. You can choose a first name only, use a private link, or keep the note entirely offline."] },
    ],
    resources: [{ label: "Cornell: ways to memorialize a pet", href: "https://www.vet.cornell.edu/impact/community-impact/pet-loss-resources-and-support" }],
  },
  {
    slug: "there-is-no-right-timeline-for-pet-grief",
    category: "Remembrance",
    title: "There is no right timeline for pet grief",
    dek: "A reminder for the days when your feelings seem out of step with everyone else’s expectations.",
    readingTime: "4 min read",
    accent: "ink",
    label: "A softer permission slip",
    product: "Grief Healing Journal",
    track: "We Will Be Whole Again",
    sections: [
      { heading: "Grief does not move in a straight line", paragraphs: ["One day may feel workable, and the next may be stopped by a photograph, a leash, or an empty corner. That movement is not a failure to “move on.” It is a normal part of adjusting to a relationship that mattered deeply.", "Comparison rarely helps. A bond is not measured by its length, species, or how visible it was to other people. It is measured by the life you shared."] },
      { heading: "Keep the next step very small", paragraphs: ["For some people, the next kind thing is a walk, a meal, or a text to someone safe. For others it is writing down one memory before it blurs at the edges. Small actions are not a shortcut through grief; they can be a way of staying beside yourself while it changes shape."] },
    ],
    resources: [{ label: "Cornell Pet Loss Resources and Support", href: "https://www.vet.cornell.edu/impact/community-impact/pet-loss-resources-and-support" }],
  },
  {
    slug: "read-the-room-before-you-read-the-rulebook",
    category: "Dog behavior",
    title: "Read the room before you read the rulebook",
    dek: "A calmer starting point for understanding your dog: look at the whole body, the environment, and the pattern—not one isolated signal.",
    readingTime: "6 min read",
    accent: "moss",
    label: "Dog body-language basics",
    product: "Dog Behavior 101",
    track: "Training focus · soft instrumental",
    sections: [
      { heading: "Context changes the meaning", paragraphs: ["A tail, ear position, or yawn does not tell the whole story by itself. Notice the setting, the distance from other people or dogs, the pace of movement, and what happened just before. Patterns are more useful than a single snapshot.", "The RSPCA notes that changes in body language and behavior can signal that something is wrong or that a dog is uncomfortable. If you are worried, a veterinarian is a sensible first conversation."] },
      { heading: "Make room for the answer", paragraphs: ["When a dog turns away, slows down, or seems unsure, reduce pressure. Give them space, simplify the moment, and reward the behavior you would like to see. The goal is not to “win” an interaction; it is to help your dog feel safe enough to learn."] },
    ],
    resources: [{ label: "RSPCA: Understanding a dog’s body language", href: "https://www.rspca.org.uk/adviceandwelfare/pets/dogs/behaviour/understanding" }, { label: "AVSAB: reward-based dog training", href: "https://avsab.org/why-you-need-to-reward-your-dog-in-training-according-to-the-experts/" }],
  },
  {
    slug: "the-kindest-cue-is-the-one-you-can-repeat",
    category: "Dog behavior",
    title: "The kindest cue is the one you can repeat",
    dek: "Why clear, reward-based practice is more useful than perfect obedience on the first try.",
    readingTime: "5 min read",
    accent: "sage",
    label: "Positive training basics",
    product: "Dog Behavior 101",
    track: "Training focus · soft instrumental",
    sections: [
      { heading: "Build the behavior you want to see", paragraphs: ["Pick one small moment: four paws on the floor when guests arrive, looking back at you on a walk, or settling on a mat. Make the cue clear, notice the behavior, and offer a reward your dog values.", "The American Veterinary Society of Animal Behavior recommends reward-based methods for canine training. A thoughtful plan often includes management too: changing the environment so your dog has a realistic chance to succeed."] },
      { heading: "Keep practice short enough to stay kind", paragraphs: ["A few calm repetitions can be more helpful than a long session when everyone is tired. End on an easy success, reset the environment, and leave room for tomorrow. If behavior changes suddenly or feels unsafe, speak with a veterinarian or qualified behavior professional."] },
    ],
    resources: [{ label: "AVSAB: Why reward your dog in training", href: "https://avsab.org/why-you-need-to-reward-your-dog-in-training-according-to-the-experts/" }],
  },
  {
    slug: "a-quieter-evening-with-your-pet",
    category: "Calm at home",
    title: "A quieter evening with your pet",
    dek: "A small, low-pressure sequence for closing the day with less noise and more familiar rhythm.",
    readingTime: "3 min read",
    accent: "ink",
    label: "A calm-at-home ritual",
    product: "Memory Keepsake Cards",
    track: "Night window · soft water",
    sections: [
      { heading: "Choose fewer signals", paragraphs: ["Lower the pace before you lower the lights. Put away a few distractions, make one comfortable place available, and keep the last routine of the day familiar. A predictable sequence can be easier to share than a perfectly silent room.", "The music here is an optional atmosphere, not a treatment. Watch how your own pet responds, keep volume low, and choose a different approach if they seem unsettled."] },
      { heading: "End with what is already working", paragraphs: ["The end of the day does not need to be a performance. A safe bed, a favorite chew, a brief walk, or a moment of stillness can be enough. Notice one detail that felt good and keep it for tomorrow."] },
    ],
    resources: [{ label: "RSPCA: understanding dog body language", href: "https://www.rspca.org.uk/adviceandwelfare/pets/dogs/behaviour/understanding" }],
  },
];

export const journalCategories = ["All", "Remembrance", "Dog behavior", "Calm at home"] as const;

export function findJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
