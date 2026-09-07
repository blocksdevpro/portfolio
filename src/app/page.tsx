import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { RESUME_DATA } from "@/constants/resume";

export default function Home() {
  return (
    <div id="top" className="site-frame">
      <Header
        email={RESUME_DATA.email}
        githubUrl={RESUME_DATA.socials.github}
      />
      <main id="main" tabIndex={-1}>
        <Hero data={RESUME_DATA} />
        <Projects projects={RESUME_DATA.projects} />
        <Experience experience={RESUME_DATA.experience} />
        <TechStack skills={RESUME_DATA.skills} />
        <Education
          education={RESUME_DATA.education}
          languages={RESUME_DATA.languages}
        />
        <Contact email={RESUME_DATA.email} />
      </main>
      <Footer data={RESUME_DATA} />
    </div>
  );
}
