export type Milestone = {
  year: string;
  title: string;
  body: string;
};

/** From the Truckin Thunder history page. Facts only. */
export const timeline: Milestone[] = [
  {
    year: "1978",
    title: "It starts on Midlothian Turnpike",
    body: "Tom and Judy Brooks buy a Masters in Natural Glazing (MING) franchise and open their first store on Midlothian Turnpike in Richmond.",
  },
  {
    year: "Then",
    title: "Truckin Thunder is born",
    body: "Customers keep asking for aftermarket accessories and customization. Tom and Judy listen, and Truckin Thunder is born.",
  },
  {
    year: "1990s",
    title: "A full accessory and upfitting center",
    body: "The business grows into a full-scale accessory and upfitting center and opens a second location on West Broad Street.",
  },
  {
    year: "North",
    title: "Fredericksburg",
    body: "Truckin Thunder expands north to Fredericksburg with a 10,000 square foot warehouse and installation facility for retail and commercial work.",
  },
  {
    year: "2004",
    title: "Ashland Hitch joins the family",
    body: "Truckin Thunder acquires Ashland Hitch.",
  },
  {
    year: "Today",
    title: "The next generation",
    body: "Led by the next generation of the Brooks family, with four locations serving individuals, contractors and fleet operators across Virginia.",
  },
];

/** Compact version for the home page teaser. */
export const timelineShort = [
  { year: "1978", label: "First store, Midlothian Tpke" },
  { year: "1990s", label: "West Broad Street opens" },
  { year: "North", label: "Fredericksburg, 10,000 sq ft" },
  { year: "2004", label: "Ashland Hitch acquired" },
  { year: "Today", label: "Next generation of the Brooks family" },
];
