import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { BrandMark } from "@/components/brand";
import type { ResumeData } from "@/types/resume";

export function Footer({ data }: { data: ResumeData }) {
  return (
    <footer className="site-footer section-inset">
      <div className="flex items-center gap-3">
        <BrandMark />
        <span>
          © {new Date().getFullYear()} {data.name}
        </span>
      </div>
      <a href="#top" aria-label="Back to top">
        Back to top <ArrowUp size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
