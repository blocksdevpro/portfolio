import { BrandInteraction } from "@/components/brand-interaction";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="30"
      height="22"
      viewBox="0 0 60 44"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 5V29C3 35 7 39 14 39C21 39 25 35 25 29V5M36 5V39M57 5L37 23L58 39"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function BrandIllustration() {
  return (
    <BrandInteraction>
      <span className="drawing-label">UK / ENGINEERING & CRAFT</span>
      <svg viewBox="0 0 720 176" fill="none" className="brand-drawing">
        <defs>
          <pattern
            id="hatching"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(35)"
          >
            <path d="M0 0V6" stroke="currentColor" strokeWidth=".55" />
          </pattern>
          <radialGradient
            id="brand-light"
            data-brand-light
            gradientUnits="userSpaceOnUse"
            cx="360"
            cy="88"
            r="140"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </radialGradient>
          <mask id="brand-light-mask">
            <rect width="720" height="176" fill="url(#brand-light)" />
          </mask>
        </defs>
        <g
          className="drawing-guides"
          stroke="currentColor"
          strokeWidth=".5"
          strokeDasharray="3 5"
        >
          <path d="M0 42H720M0 134H720M200 0V176M512 0V176M0 176L512 0M200 176L720 0" />
          <circle cx="200" cy="134" r="5" />
          <circle cx="512" cy="42" r="5" />
        </g>
        <g
          id="brand-geometry"
          className="drawing-mark"
          transform="translate(225 34) skewY(-8)"
        >
          <path
            d="M0 6H26V78H74V6H100V100H0ZM132 6H158V43L204 6H240L180 55L245 100H204L158 67V100H132Z"
            stroke="currentColor"
            fill="url(#hatching)"
          />
          <path
            d="M0 100L17 115H117V21L100 6M100 100L117 115M132 100L149 115H175V82M158 100L175 115M204 100L221 115H262L245 100M240 6L257 21L195 66"
            stroke="currentColor"
          />
        </g>
        <g className="drawing-highlight" mask="url(#brand-light-mask)">
          <use href="#brand-geometry" />
        </g>
        <g className="drawing-nodes" stroke="currentColor">
          <path
            d="M80 91H164L181 108H213M506 73H548L566 55H637"
            strokeWidth="1"
          />
          <circle cx="80" cy="91" r="3" fill="var(--background)" />
          <circle cx="637" cy="55" r="3" fill="var(--background)" />
        </g>
      </svg>
      <span className="drawing-caption">systems, thoughtfully built.</span>
    </BrandInteraction>
  );
}
