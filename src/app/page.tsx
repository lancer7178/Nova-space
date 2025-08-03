import Hero from "@/components/home/Hero";
import Head from "next/head";

export default function Home() {
  return (
    <>
    <Head>
      <title>Nova Space Web</title>
      <meta name="description" content="Explore the wonders of the universe with Nova Space Web. Discover galaxies, black holes, and more." />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="bg-black text-white min-h-screen">
      <Hero />
    </div>
    </>
  );
}
