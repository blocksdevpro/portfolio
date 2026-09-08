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
const route = (vertices: Point[]) => vertices.map((point, index) => `${index ? "L" : "M"}${project(point).join(" ")}`).join(" ");
const uRoute: Point[] = [[16, 38], [16, 132], [94, 132], [94, 78]];
const bridgeRoute: Point[] = [[94, 78], [162, 78]];
const kRoute: Point[] = [[162, 78], [174, 78], [248, 134]];
const signalRoute = route([...uRoute, ...bridgeRoute.slice(1), ...kRoute.slice(1)]);
const input = project([16, 38]);
const output = project([248, 134]);
const handoff = project([94, 78]);
const receive = project([162, 78]);
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
    <BrandInteraction caption="Fig. 1">
      <svg viewBox="0 0 720 300" fill="none" className="brand-drawing" aria-hidden="true">
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
            <g key={index} data-brand-letter={index === 0 ? "U" : "K"} stroke="currentColor" strokeWidth=".8" strokeLinejoin="round">
              {letter.sides.map((side, sideIndex) => (
                <polygon key={sideIndex} points={side} fill="var(--background)" />
              ))}
              <polygon points={letter.top} fill="var(--background)" />
              <polygon points={letter.top} fill="url(#hatching)" />
            </g>
          ))}
        </g>
        <g className="signal-circuit" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path data-route-u d={route(uRoute)} className="signal-route signal-route-u" />
          <path data-route-bridge d={route(bridgeRoute)} className="signal-bridge" strokeDasharray="3 4" />
          <path d={route(kRoute)} className="signal-route signal-route-k" />
          <circle cx={handoff[0]} cy={handoff[1]} r="2" className="signal-port" />
          <circle cx={receive[0]} cy={receive[1]} r="2" className="signal-port" />
          <path data-signal-trace d={signalRoute} className="signal-trace" strokeWidth="2" />
          <circle data-signal-head cx={input[0]} cy={input[1]} r="2.3" className="signal-head" />
          <circle cx={input[0]} cy={input[1]} r="3.5" className="signal-input" />
          <circle cx={output[0]} cy={output[1]} r="3.5" className="signal-output" />
          <circle cx={output[0]} cy={output[1]} r="8" className="signal-ack" />
        </g>
      </svg>
    </BrandInteraction>
  );
}
