import type { Metadata } from "next";
import UniverseMap from "@/components/universe/UniverseMapClient";
import { DESTINATIONS } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Universe Map — Nova Space",
  description:
    "Navigate a living map of the cosmos. Approach and enter black holes, nebulae, wormholes and other destinations across Nova Space.",
  openGraph: {
    title: "Universe Map — Nova Space",
    description:
      "Navigate a living map of the cosmos and explore its destinations.",
  },
};

export default function ExplorePage() {
  return (
    <main>
      <h1 className="sr-only">Nova Space — Universe Map</h1>
      <UniverseMap />

      {/* Semantic, crawlable list of every destination (also an a11y fallback) */}
      <nav aria-label="All destinations" className="sr-only">
        <ul>
          {DESTINATIONS.map((d) => (
            <li key={d.id}>
              <a href={`/explore/${d.id}`}>
                {d.name} — {d.tagline}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
