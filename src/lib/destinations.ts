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
  {
    id: "galaxies",
    name: "Galaxies",
    tagline: "Islands of a hundred billion suns.",
    sector: "Andromeda",
    type: "Stellar System",
    color: "#a78bfa",
    facts: [
      "A single galaxy can hold hundreds of billions of stars.",
      "Most have a supermassive black hole at their centre.",
      "The nearest large one, Andromeda, is drifting toward us.",
    ],
  },
  {
    id: "solar-system",
    name: "Solar System",
    tagline: "Our small corner of the dark.",
    sector: "Home",
    type: "Planetary System",
    color: "#fbbf24",
    facts: [
      "Eight planets orbit a single ordinary star.",
      "Light from the Sun takes eight minutes to reach Earth.",
      "It would take tens of thousands of years to reach the next star.",
    ],
  },
  {
    id: "supernova",
    name: "Supernova",
    tagline: "A star's final breath.",
    sector: "Cygnus",
    type: "Stellar Event",
    color: "#f97316",
    facts: [
      "For a few weeks it can outshine an entire galaxy.",
      "The blast forges the heavy elements inside you.",
      "What remains can collapse into a neutron star or black hole.",
    ],
  },
  {
    id: "planets",
    name: "Planets",
    tagline: "Worlds without number.",
    sector: "The Rim",
    type: "Planetary Body",
    color: "#60a5fa",
    facts: [
      "Thousands of worlds have been found beyond our Sun.",
      "Some are oceans, some are lava, some rain glass sideways.",
      "There may be more planets than stars in the galaxy.",
    ],
  },
  {
    id: "magnetic-fields",
    name: "Magnetic Fields",
    tagline: "Invisible lines that shape the void.",
    sector: "Deep Space",
    type: "Force Field",
    color: "#34d399",
    facts: [
      "Invisible field lines steer charged particles across space.",
      "Earth's own field deflects the solar wind that would strip our air.",
      "The strongest known belong to magnetars — dead stellar cores.",
    ],
  },
  {
    id: "frozen-planets",
    name: "Frozen Planets",
    tagline: "Where the cold never ends.",
    sector: "The Rim",
    type: "Planetary Body",
    color: "#7dd3fc",
    facts: [
      "Far from any star, temperatures fall below -200°C.",
      "Some hide vast liquid oceans beneath kilometres of ice.",
      "Those buried seas may be the likeliest place for life.",
    ],
  },
  {
    id: "fire-planet",
    name: "Fire Planet",
    tagline: "A world that burns.",
    sector: "The Rim",
    type: "Planetary Body",
    color: "#ef4444",
    facts: [
      "Some worlds orbit so close their surface is molten rock.",
      "A year there can last only a few Earth hours.",
      "One side may face its star forever in endless day.",
    ],
  },
  {
    id: "constellations",
    name: "Constellations",
    tagline: "Patterns humans drew in the dark.",
    sector: "Near Sky",
    type: "Star Pattern",
    color: "#e5e7eb",
    facts: [
      "The stars in a constellation are rarely near each other.",
      "They only line up by chance, seen from our single vantage point.",
      "Every culture drew its own stories across the same sky.",
    ],
  },
  {
    id: "alien-creatures",
    name: "Alien Creatures",
    tagline: "Life, but not as we know it.",
    sector: "Uncharted",
    type: "Unknown",
    color: "#4ade80",
    facts: [
      "We have found no life beyond Earth — yet.",
      "Life elsewhere may not use water, or even carbon.",
      "The question isn't whether it exists, but whether we'd recognise it.",
    ],
  },
  {
    id: "asteroids",
    name: "Asteroids",
    tagline: "The rubble of creation.",
    sector: "The Belt",
    type: "Minor Body",
    color: "#a8a29e",
    facts: [
      "Leftover rubble from the solar system's birth.",
      "Most drift in a belt between Mars and Jupiter.",
      "A single metal asteroid may hold more iron than Earth has mined.",
    ],
  },
  {
    id: "comets",
    name: "Comets",
    tagline: "Wanderers trailing ancient ice.",
    sector: "Oort",
    type: "Minor Body",
    color: "#67e8f9",
    facts: [
      "Balls of ice and dust older than the planets.",
      "Their tails always point away from the Sun, not backward.",
      "Some may have delivered water to the early Earth.",
    ],
  },
  {
    id: "dark-matter",
    name: "Dark Matter",
    tagline: "The unseen holding it all together.",
    sector: "Everywhere",
    type: "Unknown",
    color: "#8b5cf6",
    facts: [
      "It outweighs everything we can see by five to one.",
      "We only know it exists by the gravity it exerts.",
      "It passes straight through you, unseen, right now.",
    ],
  },
  {
    id: "mystical-portals",
    name: "Mystical Portals",
    tagline: "Doorways that shouldn't exist.",
    sector: "Uncharted",
    type: "Anomaly",
    color: "#c084fc",
    facts: [
      "A doorway between distant points — imagination's answer to distance.",
      "Where science stops, the story begins.",
      "Some doors are drawn on no map for a reason.",
    ],
  },
  {
    id: "space-anomalies",
    name: "Space Anomalies",
    tagline: "Something here defies explanation.",
    sector: "Uncharted",
    type: "Anomaly",
    color: "#f472b6",
    facts: [
      "A reading the instruments can't quite explain.",
      "Every discovery began as an anomaly no one understood.",
      "The unknown is closer than it seems.",
    ],
  },
  {
    id: "cosmic-dust",
    name: "Cosmic Dust",
    tagline: "The stuff stars are made from.",
    sector: "Interstellar",
    type: "Stellar Cloud",
    color: "#fcd34d",
    facts: [
      "Grains far smaller than sand, scattered between the stars.",
      "Given enough time and gravity, dust becomes worlds.",
      "You are, quite literally, made of it.",
    ],
  },
  {
    id: "aurora-3d",
    name: "Aurora",
    tagline: "Light dancing on a magnetic wind.",
    sector: "Home",
    type: "Atmospheric",
    color: "#2dd4bf",
    facts: [
      "Solar particles striking the air paint the polar sky.",
      "The colours depend on which gas is glowing, and how high.",
      "Other planets have auroras too — Jupiter's dwarf our own.",
    ],
  },
  {
    id: "time-vortex",
    name: "Time Vortex",
    tagline: "Where moments fold in on themselves.",
    sector: "Uncharted",
    type: "Anomaly",
    color: "#818cf8",
    facts: [
      "Near enough gravity, time itself runs slower.",
      "Astronauts age a heartbeat less than we do below.",
      "The faster you travel, the stranger time becomes.",
    ],
  },
];

export const TOTAL_DESTINATIONS = DESTINATIONS.length;

export const getDestination = (id: string): Destination | undefined =>
  DESTINATIONS.find((d) => d.id === id);
