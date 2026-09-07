import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { BrandIllustration } from "@/components/brand";
import { LocalTime } from "@/components/local-time";
import type { ResumeData } from "@/types/resume";

export function Hero({ data }: { data: ResumeData }) {
  return (
    <section id="intro" aria-labelledby="profile-name">
      <BrandIllustration />
      <div className="hero-profile section-inset">
        <div className="hero-identity">
          <Image
            src={data.avatar}
            alt={data.name}
            width={80}
            height={80}
            priority
            className="portrait"
          />
          <div className="min-w-0">
            <p className="eyebrow mb-2">{data.title}</p>
            <h1 id="profile-name">{data.name}</h1>
          </div>
        </div>
        <p className="hero-description">{data.description}</p>
        <div className="hero-actions">
          <a className="action-primary" href="#projects">
            Explore my work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="action-link" href={"mailto:" + data.email}>
            Get in touch <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="profile-meta section-inset">
        <span className="inline-flex items-center gap-2">
          <MapPin size={14} aria-hidden="true" />
          {data.location}
        </span>
        <LocalTime timezone={data.timezone} />
      </div>
    </section>
  );
}
