"use client";

import { About } from "@/components/sections/about";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Socials } from "@/components/sections/socials";
import { SpotifyNowPlaying } from "@/components/sections/spotify";
import { TechStack } from "@/components/sections/tech-stack";
import { RESUME_DATA } from "@/constants/resume";

export default function Home() {
  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-size-[24px_24px] dark:bg-[radial-gradient(#4b5563_1px,transparent_1px)] opacity-[0.6] dark:opacity-[0.4] mask-[linear-gradient(to_bottom,white,transparent)]"></div>
      </div>
      <main className="relative z-10 w-full max-w-[700px] space-y-12">
        <Header />
        <Hero data={RESUME_DATA} />
        <div className="space-y-3 animate-fade-in delay-200">
          <Socials socials={RESUME_DATA.socials} />
          <SpotifyNowPlaying />
        </div>
        <About data={RESUME_DATA} />
        <TechStack skills={RESUME_DATA.skills} />
        <Experience experience={RESUME_DATA.experience} />
        <Projects projects={RESUME_DATA.projects} />
        <Education
          education={RESUME_DATA.education}
          languages={RESUME_DATA.languages}
        />
        <Footer data={RESUME_DATA} />
      </main>
    </>
  );
}
