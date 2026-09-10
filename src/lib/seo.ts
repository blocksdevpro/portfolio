import type { Graph } from "schema-dts";
import { RESUME_DATA } from "@/constants/resume";

export const SITE_URL = new URL("/", RESUME_DATA.website).href;
export const SITE_TITLE = `${RESUME_DATA.name} | ${RESUME_DATA.title}`;
export const SITE_DESCRIPTION =
  "Uttam Kumbhakar is a Rust backend developer in India building APIs with Axum and PostgreSQL, local AI applications, and developer tools. Explore his work.";

const personId = `${SITE_URL}#person`;
const websiteId = `${SITE_URL}#website`;

// Keep search entities tied to the same profile and projects visitors can read.
export const PROFILE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: RESUME_DATA.name,
      alternateName: new URL(SITE_URL).hostname,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}#profile`,
      url: SITE_URL,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": websiteId },
      mainEntity: {
        "@type": "Person",
        "@id": personId,
        name: RESUME_DATA.name,
        url: SITE_URL,
        jobTitle: RESUME_DATA.title,
        description: RESUME_DATA.description,
        image: new URL(RESUME_DATA.avatar, SITE_URL).href,
        homeLocation: { "@type": "Place", name: RESUME_DATA.location },
        knowsAbout: RESUME_DATA.skills,
        sameAs: Object.values(RESUME_DATA.socials),
      },
      hasPart: RESUME_DATA.projects.map((project) => ({
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}#${project.id}`,
        name: project.title,
        description: project.description,
        url: project.links?.production,
        codeRepository: project.links?.github,
        author: { "@id": personId },
      })),
    },
  ],
} satisfies Graph;
