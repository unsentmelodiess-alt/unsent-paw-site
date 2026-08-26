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
  {
    slug: "how-to-make-a-memory-box-for-your-pet",
    category: "Remembrance",
    title: "How to make a memory box for your pet",
    dek: "A simple, low-pressure way to gather the objects, photographs, and words that help a beloved life stay close.",
    readingTime: "6 min read",
    accent: "peach",
    label: "A remembrance project",
    product: "Pet Memory Keepsake Pack",
    track: "We Will Be Whole Again",
    sections: [
      { heading: "Begin with what already carries meaning", paragraphs: ["A memory box does not need to be elaborate. A favorite photograph, tag, handwritten note, or small toy can be enough to begin. Choose only what feels steady today; you can always add more later.", "If an object feels too difficult to hold, it is completely reasonable to keep it aside. Remembering does not require touching every part of the loss at once."] },
      { heading: "Give the box a gentle shape", paragraphs: ["You might arrange items by season, by a favorite routine, or simply in the order they come to you. Add a card with a name, a date, and one detail you never want to forget.", "Keep the box somewhere private and easy to reach. It can be a place for revisiting, not a task that must be completed."] },
    ],
    resources: [{ label: "Cornell Pet Loss Resources and Support", href: "https://www.vet.cornell.edu/impact/community-impact/pet-loss-resources-and-support" }],
  },
  {
    slug: "what-to-say-to-someone-who-lost-a-pet",
    category: "Remembrance",
    title: "What to say to someone who lost a pet",
    dek: "Thoughtful words for supporting a grieving friend without minimizing the bond they shared.",
    readingTime: "5 min read",
    accent: "moss",
    label: "A guide for gentle support",
    product: "Rainbow Bridge Letter Templates",
    track: "The Phantom Weight",
    sections: [
      { heading: "Name the relationship", paragraphs: ["A simple sentence can acknowledge what mattered: ‘I know how much they were part of your days.’ Using the pet’s name, when you know it, can make the message feel personal rather than automatic.", "You do not need to explain the loss or find a silver lining. Presence is often more helpful than a perfect answer."] },
      { heading: "Offer something specific", paragraphs: ["Instead of saying ‘Let me know if you need anything,’ try offering one small option: a meal, a walk, help sorting photographs, or a quiet call. Then let the person choose.", "Grief does not follow a fixed schedule. Continue checking in after the first week, when other people may have returned to their routines."] },
    ],
    resources: [{ label: "Best Friends: grieving the loss of a pet", href: "https://bestfriends.org/pet-care-resources/grieving-loss-pet-resources-coping" }],
  },
  {
    slug: "how-to-help-a-dog-settle-in-the-evening",
    category: "Calm at home",
    title: "How to help a dog settle in the evening",
    dek: "A calm evening routine built from predictable cues, lower stimulation, and attention to your dog’s individual signals.",
    readingTime: "6 min read",
    accent: "sage",
    label: "Calm-at-home basics",
    product: "Calm Pet Routine Planner",
    track: "Night window · soft water",
    sections: [
      { heading: "Lower stimulation before bedtime", paragraphs: ["Begin the transition before you expect sleep. Dim the room, reduce exciting play, and offer a familiar place to rest. Predictability can help a dog understand that the day is changing pace.", "Keep music optional and quiet. Watch your dog’s body language rather than assuming that any sound will be calming for every animal."] },
      { heading: "Reward settling, not perfection", paragraphs: ["Notice small moments of stillness and reinforce them calmly. A dog may need several short pauses before they can rest for longer. Keep the routine realistic enough to repeat tomorrow.", "If restlessness appears suddenly, is persistent, or comes with signs of pain or distress, contact a veterinarian rather than treating it as a training problem."] },
    ],
    resources: [{ label: "RSPCA: understanding a dog’s body language", href: "https://www.rspca.org.uk/adviceandwelfare/pets/dogs/behaviour/understanding" }],
  },
  {
    slug: "how-to-create-a-quiet-space-for-a-cat",
    category: "Calm at home",
    title: "How to create a quiet space for a cat",
    dek: "Small environmental choices that give a cat more control over rest, retreat, and gentle exploration.",
    readingTime: "5 min read",
    accent: "moss",
    label: "A calmer home guide",
    product: "Calm Pet Routine Planner",
    track: "Night window · soft water",
    sections: [
      { heading: "Offer choice and height", paragraphs: ["Many cats settle more easily when they can choose whether to hide, observe from above, or stay close to a trusted person. A box, covered bed, or stable elevated perch can create useful options.", "Keep food, water, litter, and resting places arranged so the cat can move without being forced into a busy path. Small changes are often easier than a complete room makeover."] },
      { heading: "Follow the cat’s response", paragraphs: ["A quiet space should feel available, not compulsory. If your cat avoids it, change one detail at a time: the location, the texture, the light, or the amount of activity nearby.", "Changes in appetite, toileting, mobility, or behavior deserve veterinary attention. Environmental enrichment can support wellbeing, but it is not a substitute for care."] },
    ],
    resources: [{ label: "International Cat Care: cat-friendly environments", href: "https://icatcare.org/advice/" }],
  },
  {
    slug: "how-to-explain-pet-loss-to-a-child",
    category: "Remembrance",
    title: "How to explain pet loss to a child",
    dek: "A clear, compassionate starting point for answering children’s questions when a beloved animal dies.",
    readingTime: "7 min read",
    accent: "peach",
    label: "A family remembrance guide",
    product: "Children's Pet Loss Activity Sheets",
    track: "We Will Be Whole Again",
    sections: [
      { heading: "Use clear and gentle words", paragraphs: ["Children often benefit from simple language that does not create confusion. Explain what happened in an honest, age-appropriate way, then pause so they can ask questions or remain quiet.", "Avoid promising that nobody else will die or suggesting that the pet went to sleep if that could make sleep feel frightening. You can say that the animal’s body stopped working and that the family is sad because the bond was important."] },
      { heading: "Let remembrance be creative", paragraphs: ["A drawing, small ceremony, memory card, or story can give a child a way to participate without requiring them to talk continuously. Let them choose whether to join.", "Children may return to the topic at unexpected times. Reassurance, routine, and patient answers can help them feel safe while their understanding develops."] },
    ],
    resources: [{ label: "Cornell Pet Loss Resources and Support", href: "https://www.vet.cornell.edu/impact/community-impact/pet-loss-resources-and-support" }],
  },
  {
    slug: "should-you-play-music-for-a-dog-when-you-leave",
    category: "Calm at home",
    title: "Should you play music for a dog when you leave?",
    dek: "What to consider when testing background sound during alone time, and how to notice whether it helps your individual dog.",
    readingTime: "5 min read",
    accent: "ink",
    label: "A practical listening note",
    product: "Soundscape Listening Guide",
    track: "Night window · soft water",
    sections: [
      { heading: "Treat music as an experiment", paragraphs: ["Some dogs appear to settle with a consistent, low-volume sound; others ignore it or become more alert. Start during a short, easy absence and observe the result rather than assuming a playlist will solve distress.", "Choose music that does not contain sudden loud changes. Keep the volume low enough that your dog can still respond to the environment."] },
      { heading: "Look at the whole pattern", paragraphs: ["Pacing, vocalizing, destruction, escape attempts, or signs of panic may point to separation-related distress that needs a broader plan. Background sound can be one environmental detail, not a treatment by itself.", "If alone-time behavior is severe or unsafe, speak with a veterinarian or qualified behavior professional for individualized guidance."] },
    ],
    resources: [{ label: "RSPCA: understanding a dog’s body language", href: "https://www.rspca.org.uk/adviceandwelfare/pets/dogs/behaviour/understanding" }],
  },
];

export const journalCategories = ["All", "Remembrance", "Dog behavior", "Calm at home"] as const;

export function findJournalArticle(slug: string) {
  return journalArticles.find((article) => article.slug === slug);
}
