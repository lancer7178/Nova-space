// Central registry for every place in the Nova Space universe.
// The Universe Map, destination frames, discovery counter and SEO all read from here,
// so a destination is defined once and stays consistent across the experience.

export type Destination = {
  /** slug — must match the /explore/<id> route */
  id: string;
  name: string;
  /** one short, mysterious line — the destination's personality */
  tagline: string;
  sector: string;
  type: string;
  /** accent colour, used for the map node glow and overlays */
  color: string;
  /** concise facts revealed inside the destination (20% info, 80% experience) */
  facts?: string[];
};

export const DESTINATIONS: Destination[] = [
  {
    id: "black-hole",
    name: "Black Hole",
    tagline: "The point where light disappears.",
    sector: "Deep Space",
    type: "Cosmic Phenomenon",
    color: "#ff8c3a",
    facts: [
      "Gravity here is so strong that not even light can escape.",
      "Its edge of no return is called the event horizon.",
      "The largest ones hold the mass of billions of suns.",
    ],
  },
  {
    id: "wormhole",
    name: "Wormhole",
    tagline: "A shortcut through spacetime.",
    sector: "Uncharted",
    type: "Cosmic Phenomenon",
    color: "#00d4ff",
    facts: [
      "In theory, a tunnel linking two distant points in spacetime.",
      "Predicted by Einstein's equations — never actually observed.",
      "Passing through could mean crossing a galaxy in a single step.",
    ],
  },
  {
    id: "nebulae",
    name: "Nebulae",
    tagline: "A nursery for new stars.",
    sector: "Orion",
    type: "Stellar Cloud",
    color: "#ff99cc",
    facts: [
      "Vast clouds of gas and dust where stars are born.",
      "Some stretch for dozens of light-years across.",
      "Their colours trace different elements glowing in the dark.",
    ],
  },
  { id: "galaxies", name: "Galaxies", tagline: "Islands of a hundred billion suns.", sector: "Andromeda", type: "Stellar System", color: "#a78bfa" },
  { id: "solar-system", name: "Solar System", tagline: "Our small corner of the dark.", sector: "Home", type: "Planetary System", color: "#fbbf24" },
  { id: "supernova", name: "Supernova", tagline: "A star's final breath.", sector: "Cygnus", type: "Stellar Event", color: "#f97316" },
  { id: "planets", name: "Planets", tagline: "Worlds without number.", sector: "The Rim", type: "Planetary Body", color: "#60a5fa" },
  { id: "magnetic-fields", name: "Magnetic Fields", tagline: "Invisible lines that shape the void.", sector: "Deep Space", type: "Force Field", color: "#34d399" },
  { id: "frozen-planets", name: "Frozen Planets", tagline: "Where the cold never ends.", sector: "The Rim", type: "Planetary Body", color: "#7dd3fc" },
  { id: "fire-planet", name: "Fire Planet", tagline: "A world that burns.", sector: "The Rim", type: "Planetary Body", color: "#ef4444" },
  { id: "constellations", name: "Constellations", tagline: "Patterns humans drew in the dark.", sector: "Near Sky", type: "Star Pattern", color: "#e5e7eb" },
  { id: "alien-creatures", name: "Alien Creatures", tagline: "Life, but not as we know it.", sector: "Uncharted", type: "Unknown", color: "#4ade80" },
  { id: "asteroids", name: "Asteroids", tagline: "The rubble of creation.", sector: "The Belt", type: "Minor Body", color: "#a8a29e" },
  { id: "comets", name: "Comets", tagline: "Wanderers trailing ancient ice.", sector: "Oort", type: "Minor Body", color: "#67e8f9" },
  { id: "dark-matter", name: "Dark Matter", tagline: "The unseen holding it all together.", sector: "Everywhere", type: "Unknown", color: "#8b5cf6" },
  { id: "mystical-portals", name: "Mystical Portals", tagline: "Doorways that shouldn't exist.", sector: "Uncharted", type: "Anomaly", color: "#c084fc" },
  { id: "space-anomalies", name: "Space Anomalies", tagline: "Something here defies explanation.", sector: "Uncharted", type: "Anomaly", color: "#f472b6" },
  { id: "cosmic-dust", name: "Cosmic Dust", tagline: "The stuff stars are made from.", sector: "Interstellar", type: "Stellar Cloud", color: "#fcd34d" },
  { id: "aurora-3d", name: "Aurora", tagline: "Light dancing on a magnetic wind.", sector: "Home", type: "Atmospheric", color: "#2dd4bf" },
  { id: "time-vortex", name: "Time Vortex", tagline: "Where moments fold in on themselves.", sector: "Uncharted", type: "Anomaly", color: "#818cf8" },
];

export const TOTAL_DESTINATIONS = DESTINATIONS.length;

export const getDestination = (id: string): Destination | undefined =>
  DESTINATIONS.find((d) => d.id === id);
