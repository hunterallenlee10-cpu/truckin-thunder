/** Real customer reviews. Exact wording. Never add more. */
export type Review = {
  id: string;
  name: string;
  quote: string;
  /** Short context line written from the review itself. */
  context: string;
  tags: Array<"fleet" | "commercial" | "offroad" | "beds" | "parts">;
};

export const reviews: Review[] = [
  {
    id: "yopp",
    name: "Melissa Yopp",
    quote:
      "The team demonstrated professionalism and genuine care by assisting us during an emergency late on a Friday afternoon. They had the exact part we needed for our RV, ensuring our family's weekend camping trip was saved. We are truly grateful for them answering the phone and having the part in stock!",
    context: "RV part, Friday afternoon",
    tags: ["parts", "beds"],
  },
  {
    id: "vondersmith",
    name: "Jason Vondersmith",
    quote:
      "I called looking for a specific part I wanted same day, after hearing it wasn't stocked I nearly hung up. Thankfully I didn't. Reba took some time to understand what I needed. Scott took some extra time to make sure I was also getting what I needed. I ended up ordering the parts, one of which was a better solution and saved me hours on install!",
    context: "A better part, hours saved",
    tags: ["offroad", "parts"],
  },
  {
    id: "elkin",
    name: "Kole Elkin",
    quote:
      "Brought my Transit van not really knowing what I wanted. Ended up with exactly what I needed and the turnaround time was great. After everything came in I dropped off my van at 8am and got a call at 11am to come get it.",
    context: "Transit van upfit",
    tags: ["commercial"],
  },
  {
    id: "barrow",
    name: "Robert Barrow",
    quote:
      "I came here for help with the wiring harness on a trailer hitch for a van in my company's fleet. They turned it around super quickly at a very fair price. Works great and looks a whole lot better than it did when I brought it to them. These guys know what they're doing. I'll be coming back!",
    context: "Fleet van hitch wiring",
    tags: ["fleet", "commercial", "beds"],
  },
];

export const reviewsFor = (tag: Review["tags"][number], max = 2) =>
  reviews.filter((r) => r.tags.includes(tag)).slice(0, max);
