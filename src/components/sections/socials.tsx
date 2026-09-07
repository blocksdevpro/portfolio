import {
  ArrowUpRight,
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { ResumeData } from "@/types/resume";

export function Socials({ socials }: { socials: ResumeData["socials"] }) {
  const links = [
    { label: "GitHub", url: socials.github, Icon: GithubLogo },
    { label: "LinkedIn", url: socials.linkedin, Icon: LinkedinLogo },
    { label: "X", url: socials.twitter, Icon: XLogo },
  ].filter((link) => link.url);
  return (
    <nav className="social-strip" aria-label="Social profiles">
      {links.map(({ label, url, Icon }) => (
        <a key={label} href={url} target="_blank" rel="noopener noreferrer">
          <Icon size={17} aria-hidden="true" />
          <span>{label}</span>
          <ArrowUpRight className="social-arrow" size={14} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
