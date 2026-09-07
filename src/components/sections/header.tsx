"use client";

import { useEffect, useState } from "react";
import { GithubLogo } from "@phosphor-icons/react";
import { BrandMark } from "@/components/brand";
import { CommandMenu } from "@/components/command-menu";
import { ModeSwitcher } from "@/components/mode-switcher";
import { scrollToSection, type SectionHash } from "@/lib/scroll-to-section";

const links = [
  { id: "projects", label: "Work", href: "#projects" },
  { id: "about", label: "About", href: "#about" },
  { id: "contact", label: "Contact", href: "#contact" },
] satisfies { id: string; label: string; href: SectionHash }[];

export function Header({
  email,
  githubUrl,
}: {
  email: string;
  githubUrl?: string;
}) {
  const [active, setActive] = useState("");
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setCompact(window.scrollY > 24);
      let current = "";
      for (const link of links) {
        const section = document.getElementById(link.id);
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          current = link.id;
      }
      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 8
      )
        current = "contact";
      setActive(current);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);
  function navigate(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: SectionHash,
  ) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    event.preventDefault();
    scrollToSection(href);
  }
  return (
    <header
      className="site-header section-inset"
      data-site-header
      data-compact={compact}
    >
      <a
        href="#top"
        aria-label="Uttam Kumbhakar, back to top"
        className="brand-link"
        onClick={(event) => navigate(event, "#top")}
      >
        <BrandMark />
      </a>
      <div className="header-controls">
        <nav aria-label="Primary navigation" className="header-nav">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? "location" : undefined}
              onClick={(event) => navigate(event, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <span className="header-separator" aria-hidden="true" />
        <CommandMenu email={email} githubUrl={githubUrl} />
        {githubUrl && (
          <>
            <span className="header-separator" aria-hidden="true" />
            <a className="header-github" href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <GithubLogo size={18} weight="fill" aria-hidden="true" />
            </a>
          </>
        )}
        <span className="header-separator" aria-hidden="true" />
        <ModeSwitcher />
      </div>
    </header>
  );
}
