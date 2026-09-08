import {
  GithubLogo,
  LinkedinLogo,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { ResumeData } from "@/types/resume";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Socials({ socials }: { socials: ResumeData["socials"] }) {
  const links = [
    { label: "GitHub", url: socials.github, Icon: GithubLogo },
    { label: "LinkedIn", url: socials.linkedin, Icon: LinkedinLogo },
    { label: "X", url: socials.twitter, Icon: XLogo },
  ].filter((link) => link.url);
  return (
    <nav className="social-strip" aria-label="Social profiles">
      {links.map(({ label, url, Icon }) => (
        <Tooltip key={label}>
          <TooltipTrigger
            render={
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              />
            }
          >
            <Icon size={20} aria-hidden="true" />
          </TooltipTrigger>
          <TooltipContent>{label}</TooltipContent>
        </Tooltip>
      ))}
    </nav>
  );
}
