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

type Point = readonly [x: number, y: number];

// Project the letter outlines onto one isometric plane, then extrude its edges.
const letterOutlines: Point[][] = [
  [[0, 0], [32, 0], [32, 116], [78, 116], [78, 0], [110, 0], [110, 150], [0, 150]],
  [[145, 0], [180, 0], [180, 54], [230, 0], [272, 0], [203, 73], [276, 150], [231, 150], [180, 94], [180, 150], [145, 150]],
];
const project = ([x, y]: Point): Point => [160 + (x + y) * 1.18, 175 + (y - x) * 0.59];
const points = (vertices: Point[]) => vertices.map(([x, y]) => `${x},${y}`).join(" ");
const letters = letterOutlines.map((outline) => {
  const top = outline.map(project);
  const sides = top.flatMap((start, index) => {
    const end = top[(index + 1) % top.length];
    if (!end || end[0] >= start[0]) return [];
    return [points([start, end, [end[0], end[1] + 30], [start[0], start[1] + 30]])];
  });
  return { top: points(top), sides };
});

export function BrandIllustration() {
  return (
    <BrandInteraction>
      <svg viewBox="0 0 720 300" fill="none" className="brand-drawing">
        <defs>
          <pattern
            id="hatching"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(38)"
          >
            <path d="M0 0V7" stroke="currentColor" strokeWidth=".65" />
          </pattern>
          <radialGradient
            id="brand-light"
            data-brand-light
            gradientUnits="userSpaceOnUse"
            cx="360"
            cy="150"
            r="190"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </radialGradient>
          <mask id="brand-light-mask">
            <rect width="720" height="300" fill="url(#brand-light)" />
          </mask>
        </defs>
        <g
          className="drawing-guides"
          stroke="currentColor"
          strokeWidth=".5"
          strokeDasharray="3 5"
        >
          <path d="M-120 32L720 452M-120 168L600 528M0 360L720 0M165 0L885 360" />
        </g>
        <g
          id="brand-geometry"
          className="drawing-mark"
        >
          {letters.map((letter, index) => (
            <g key={index} stroke="currentColor" strokeWidth=".8" strokeLinejoin="round">
              {letter.sides.map((side, sideIndex) => (
                <polygon key={sideIndex} points={side} fill="var(--background)" />
              ))}
              <polygon points={letter.top} fill="var(--background)" />
              <polygon points={letter.top} fill="url(#hatching)" />
            </g>
          ))}
        </g>
        <g className="drawing-highlight" mask="url(#brand-light-mask)">
          <use href="#brand-geometry" />
        </g>
      </svg>
      <span className="drawing-caption">Fig. 1</span>
    </BrandInteraction>
  );
}
