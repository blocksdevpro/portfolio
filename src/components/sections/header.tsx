"use client";

import * as React from "react";

import { CommandMenu } from "@/components/command-menu";
import { ModeSwitcher } from "@/components/mode-switcher";
import { scrollToSection } from "@/lib/scroll-to-section";
import type { SectionHash } from "@/lib/scroll-to-section";

type ActiveSection = "projects" | "experience" | null;

interface HeaderLink {
  id: Exclude<ActiveSection, null>;
  href: SectionHash;
  label: string;
}

interface HeaderProps {
  email: string;
  githubUrl?: string;
}

const HEADER_LINKS: readonly HeaderLink[] = [
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "experience", href: "#experience", label: "Experience" },
];

export const Header: React.FC<HeaderProps> = ({ email, githubUrl }) => {
  const [isCompact, setIsCompact] = React.useState(false);
  const [activeSection, setActiveSection] =
    React.useState<ActiveSection>(null);

  React.useEffect(() => {
    let frameId = 0;

    const updateHeader = () => {
      frameId = 0;
      let nextActiveSection: ActiveSection = null;
      let closestSectionDistance = Number.POSITIVE_INFINITY;
      const activeThreshold = window.innerHeight * 0.35;

      HEADER_LINKS.forEach((link) => {
        const section = document.getElementById(link.id);
        if (!section) {
          return;
        }

        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= activeThreshold) {
          const distance = Math.abs(activeThreshold - sectionTop);
          if (distance < closestSectionDistance) {
            closestSectionDistance = distance;
            nextActiveSection = link.id;
          }
        }
      });

      setIsCompact(window.scrollY > 56);
      setActiveSection(nextActiveSection);
    };

    const requestUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const handleNavigation = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, hash: SectionHash) => {
      event.preventDefault();
      scrollToSection(hash);
    },
    []
  );

  return (
    <header
      className="sticky top-3 z-40 -mx-3 mb-8 flex h-12 items-center justify-between rounded-xl border px-3 transition-[background-color,border-color,box-shadow,transform] duration-300 data-[compact=false]:border-transparent data-[compact=true]:border-border/80 data-[compact=true]:bg-background/80 data-[compact=true]:shadow-lg data-[compact=true]:shadow-black/5 data-[compact=true]:backdrop-blur-xl dark:data-[compact=true]:shadow-black/20"
      data-compact={isCompact}
      data-site-header
    >
      <a
        aria-label="Back to top"
        className="rounded-md bg-primary px-2 py-1 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4"
        href="#top"
        onClick={(event) => handleNavigation(event, "#top")}
      >
        UK
      </a>

      <div className="flex items-center gap-0.5 sm:gap-1">
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 text-xs font-medium text-muted-foreground sm:gap-2 sm:text-sm"
        >
          {HEADER_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                aria-current={isActive ? "location" : undefined}
                className="px-1.5 py-2 transition-colors hover:text-foreground data-[active=true]:text-foreground"
                data-active={isActive}
                href={link.href}
                onClick={(event) => handleNavigation(event, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
        <CommandMenu email={email} githubUrl={githubUrl} />
        <ModeSwitcher />
      </div>
    </header>
  );
};
