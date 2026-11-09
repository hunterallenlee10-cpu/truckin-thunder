/**
 * FAQs answered only with facts from the business. Anything we don't know is
 * marked [TO CONFIRM WITH OWNER] and left out of FAQPage structured data.
 */
export type Faq = { q: string; a: string };
const TBC = "[TO CONFIRM WITH OWNER]";

export const faqs: Record<"fleet" | "commercial" | "offroad" | "beds", Faq[]> = {
  fleet: [
    {
      q: "Who do you upfit fleets for?",
      a: "Utilities, municipalities, contractors and government agencies across Virginia and the Mid-Atlantic, including utility and power, public works, telecommunications, and construction and service fleets.",
    },
    {
      q: "Can you keep every truck in our fleet the same?",
      a: "Yes. We coordinate the work turnkey and build standardized fleet packages, so every vehicle is consistent across the whole fleet.",
    },
    {
      q: "Which equipment brands do you install for fleets?",
      a: "Our certified installers work with proven vendors including Weather Guard, Adrian Steel and Ranger Design.",
    },
    {
      q: "Do you offer volume pricing?",
      a: "Yes. We offer competitive volume pricing with fast turnaround. Start a fleet quote and we'll price your vehicles.",
    },
    {
      q: "Where do we go for warranty and service after the upfit?",
      a: `Warranty and dedicated service support are available at all four of our Virginia locations. Specific warranty terms: ${TBC}`,
    },
    {
      q: "Do you work with state contracts or purchase orders?",
      a: TBC,
    },
  ],
  commercial: [
    {
      q: "What can you install in a work van?",
      a: "Shelving, partitions, ladder racks, liftgates, toolboxes and drawer systems, all installed in our own shop.",
    },
    {
      q: "Which truck caps do you carry?",
      a: "We install commercial truck caps from A.R.E. and Adrian Steel.",
    },
    {
      q: "I'm not sure what my van needs. Can you help?",
      a: "Yes. Our highly trained sales team will find the best solutions for your needs. Bring the van in, tell us about your trade, and we'll spec it with you.",
    },
    {
      q: "Will you install parts I bought somewhere else?",
      a: "Typically, yes. Every location has a dedicated installation team, and we usually install parts purchased from another vendor or online.",
    },
    {
      q: "How long does a typical van upfit take?",
      a: TBC,
    },
  ],
  offroad: [
    {
      q: "What off-road upgrades do you install?",
      a: "Lift and leveling kits, all-terrain and mud-terrain tires, off-road bumpers, skid plates, rock sliders and side steps, grille and brush guards, LED light bars, pods and ditch lights, winches and recovery gear, onboard air, bed and roof racks, cargo management and drawer systems.",
    },
    {
      q: "Do you do complete overland builds?",
      a: "Yes. Overland-ready builds are part of what we do, from stance and armor to racks, storage and lighting.",
    },
    {
      q: "Can I bring in a lift kit I bought online?",
      a: "Typically, yes. Even if you purchased your parts from another vendor or online, our install teams usually install them.",
    },
    {
      q: "Do you sell tires?",
      a: "Yes. We carry all-terrain and mud-terrain tires.",
    },
    {
      q: "Will a lift or leveling kit affect my factory warranty?",
      a: TBC,
    },
  ],
  beds: [
    {
      q: "What truck beds do you install?",
      a: "Flatbeds and service bodies, including CM Truck Beds.",
    },
    {
      q: "What makes a CM service body different?",
      a: "CM Truck Beds builds an industry-leading component-style service body with a modular design.",
    },
    {
      q: "Do you install hitches and trailer wiring?",
      a: "Yes. Our install teams handle hitches and trailer wiring, including for fleet vans.",
    },
    {
      q: "Do you sell trailers?",
      a: "Yes. We carry Homesteader trailers.",
    },
    {
      q: "How long does a bed or service body install take?",
      a: TBC,
    },
  ],
};
