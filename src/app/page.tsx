import type { Metadata } from "next";
import { Contact } from "@/components/sections/contact";
import { Education } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { RESUME_DATA } from "@/constants/resume";
import {
  PROFILE_STRUCTURED_DATA,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: RESUME_DATA.name,
    locale: "en_IN",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@blocksdev_pro",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large" },
  },
};

export default function Home() {
  return (
    <div id="top" className="site-frame">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(PROFILE_STRUCTURED_DATA).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
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
