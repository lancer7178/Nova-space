import Hero from "@/components/home/Hero";

export const metadata = {
  title: 'Nova Space ',
  description: 'Explore the wonders of the universe with Nova Space Web. Discover galaxies, black holes, and more.',
};

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Hero />
    </div>
  );
}
