import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased selection:bg-purple-500/30">
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Contact />

      {/* Global decorative gradient */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
    </main>
  );
}
