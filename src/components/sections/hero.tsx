import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Clock,
  Code,
  EnvelopeSimple,
  Hammer,
  LinkSimple,
  MapPin,
  User,
} from "@phosphor-icons/react/dist/ssr";
import { BrandIllustration } from "@/components/brand";
import { LocalTime } from "@/components/local-time";
import { About } from "@/components/sections/about";
import { Activity } from "@/components/sections/activity";
import { Socials } from "@/components/sections/socials";
import type { ResumeData } from "@/types/resume";

export function Hero({ data }: { data: ResumeData }) {
  const currentProject = data.projects.find(
    (project) => project.status === "active",
  );
  return (
    <section id="intro" aria-labelledby="profile-name">
      <div className="profile-cover">
        <BrandIllustration />
        <div className="hero-identity">
          <Image
            src={data.avatar}
            alt={data.name}
            width={160}
            height={160}
            priority
            className="portrait"
          />
          <div className="hero-name">
            <h1 id="profile-name">{data.name}</h1>
            <p>Backend systems & local AI.</p>
          </div>
        </div>
      </div>
      <div className="profile-facts section-inset">
        <dl className="profile-column">
          <div className="profile-fact">
            <dt><Code size={16} aria-hidden="true" /><span className="sr-only">Role</span></dt>
            <dd>{data.title}</dd>
          </div>
          {currentProject && (
            <div className="profile-fact">
              <dt><Hammer size={16} aria-hidden="true" /><span className="sr-only">Current project</span></dt>
              <dd>Building <a href={`#${currentProject.id}`}>{currentProject.title}</a></dd>
            </div>
          )}
          <div className="profile-fact">
            <dt><MapPin size={16} aria-hidden="true" /><span className="sr-only">Location</span></dt>
            <dd>{data.location}</dd>
          </div>
          <div className="profile-fact">
            <dt><LinkSimple size={16} aria-hidden="true" /><span className="sr-only">Website</span></dt>
            <dd><a href={data.website}>{new URL(data.website).hostname}</a></dd>
          </div>
        </dl>
        <dl className="profile-column">
          <div className="profile-fact">
            <dt><Clock size={16} aria-hidden="true" /><span className="sr-only">Local time</span></dt>
            <dd><LocalTime timezone={data.timezone} /></dd>
          </div>
          <div className="profile-fact">
            <dt><EnvelopeSimple size={16} aria-hidden="true" /><span className="sr-only">Email</span></dt>
            <dd><a href={`mailto:${data.email}`}>{data.email}</a></dd>
          </div>
          {data.pronouns && (
            <div className="profile-fact">
              <dt><User size={16} aria-hidden="true" /><span className="sr-only">Pronouns</span></dt>
              <dd>{data.pronouns}</dd>
            </div>
          )}
        </dl>
      </div>
      <div className="profile-socials section-inset">
        <span className="follow-note" aria-hidden="true">
          follow me
          <svg viewBox="0 0 48 40" fill="none">
            <path d="M5 3C4 22 17 32 40 29M32 22L41 29L31 34" />
          </svg>
        </span>
        <Socials socials={data.socials} />
      </div>
      <Activity />
      <div className="profile-introduction section-inset">
        <About />
        <div className="hero-actions">
          <a className="action-link" href="#projects">
            Explore my work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="action-link" href={"mailto:" + data.email}>
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
