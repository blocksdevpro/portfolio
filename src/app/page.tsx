"use client";

import { About } from "@/components/sections/about";
import { PointerGrid } from "@/components/pointer-grid";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Socials } from "@/components/sections/socials";
import { SpotifyNowPlaying } from "@/components/sections/spotify";
import { TechStack } from "@/components/sections/tech-stack";
import { ViewportReveals } from "@/components/viewport-reveals";
import { RESUME_DATA } from "@/constants/resume";

export default function Home() {
  return (
    <>
      <ViewportReveals />
      <PointerGrid />
      <main
        className="relative z-10 w-full max-w-[700px] space-y-12"
        id="top"
      >
        <Header
          email={RESUME_DATA.email}
          githubUrl={RESUME_DATA.socials.github}
        />
        <Hero data={RESUME_DATA} />
        <div className="space-y-3" data-reveal>
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
