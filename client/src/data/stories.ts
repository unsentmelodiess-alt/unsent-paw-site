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
      "For years, the sound of keys at the door meant the same thing. It meant the day had folded itself away. It meant someone was home. Before the lock turned, there was usually a small pause on the other side: a shuffle, a breath, the soft anticipation of a life that had been waiting without keeping score.",
      "Dogs learn the grammar of a household through sounds. The kettle, the cupboard, the shoes by the mat, the particular rhythm of one person walking down the hall. Cats learn it too, though they may answer in a different language: the lift of a head, the appearance at the edge of a room, a tail passing once through the doorway.",
      "The sound of keys becomes part of the relationship because it is repeated so faithfully. It arrives on ordinary evenings, on difficult mornings, on days neither of you will remember for any special reason. That is often where a life together is held—not only in birthdays and first walks, but in the small arrivals that happen again and again.",
      "After a pet dies, an ordinary sound can become unexpectedly large. You may hear keys and turn before you remember. You may notice how long the hallway is when no one comes to meet you. This does not mean you are stuck or doing grief incorrectly. It means your body learned a pattern through love, and patterns do not disappear on command.",
      "You do not have to make the sound mean something new today. It can simply be a sound that hurts. Later, it may become a doorway to one detail: the way they waited, the expression they wore, the small ceremony of putting down your things and saying hello. Memory does not need to be forced into gratitude before it is ready.",
      "One evening, you might choose to stand at the door for a moment longer. Notice the temperature of the handle. Listen to the room before you enter it. Then say their name, quietly or out loud, if that feels right. The ritual is not meant to recreate the past. It is a way to acknowledge that the past happened, and that it mattered.",
      "If writing feels possible, begin with the sentence: “When I came home, you used to…” Let the rest be specific. Write about the sound, the place, the time of day, and what happened next. A small memory is not a lesser memory. Sometimes the smallest one is the truest record of being loved.",
      "There will be evenings when the keys sound like an ending, and evenings when they sound like a thread. Both can belong. The house may learn a different rhythm without erasing the one it had before. The love remains in the details—not as a demand to be cheerful, but as evidence of a life that was shared.",
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
      "A room can change without anything being moved. The light still falls across the floor at the same hour, but the place beneath the window is quiet. The blanket remains folded over the chair. A bowl, a toy, or a scratch near the door becomes a small landmark in a house that has suddenly acquired a different map.",
      "We often think of home as walls and furniture. Living with an animal teaches us that home is also timing. It is the space beside your feet, the route around a sleeping body, the pause before opening a cupboard, the habit of checking one more room before turning out the lights.",
      "When that life is gone, the room can feel too large and too familiar at once. You may keep walking around an old routine. You may set something down and expect it to be moved later. These moments are not signs that you are failing to accept what happened. They are the gentle afterimage of care.",
      "There is no correct speed for changing a room. Some people need to leave everything exactly as it is for a while. Others need to pack things away because seeing them is too sharp. Neither choice says anything about the depth of the bond. A room is allowed to change when the person living in it is ready.",
      "If you want a small beginning, choose one object rather than the whole room. You might place a favorite photograph on a shelf, wash and fold a blanket, or keep one toy in a box. The point is not to tidy away the relationship. It is to give one part of the memory a deliberate place.",
      "A gentle ritual can make the present feel less like an intruder. Open a window. Put on a quiet song. Write down one ordinary thing your pet did that no one else would have noticed. Then return to the room without asking it to feel normal. Normal may not be the destination; familiar, safe, and livable may be enough for now.",
      "If another animal still shares the home, their routine may look different too. Keep observations simple and patient. Notice eating, resting, play, and the places they choose. Avoid turning every change into a conclusion. When a sudden or concerning behavior change appears, a qualified veterinarian can help you decide what support is appropriate.",
      "Over time, the room may learn a new shape. That shape will not be a replacement, and it does not ask you to stop missing anyone. It can hold the empty space, the photograph, the new plant, the afternoon light, and the memory of a body that once made the room feel complete. Love can remain part of the architecture.",
    ],
    image: "/images/listening-night.webp",
    trackLabel: "Explore Unsent Melodies",
    trackHref: "https://www.youtube.com/channel/UCyTzBEJFvEvFfREmZhSRmdw",
  },
];

export function findStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
