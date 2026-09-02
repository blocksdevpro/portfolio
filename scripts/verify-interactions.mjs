import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const checks = [
  {
    file: "src/components/viewport-reveals.tsx",
    label: "viewport observer",
    pattern: /IntersectionObserver/,
  },
  {
    file: "src/components/sections/projects.tsx",
    label: "project reveal marker",
    pattern: /data-reveal/,
  },
  {
    file: "src/components/sections/header.tsx",
    label: "sticky compact header",
    pattern: /sticky top-3[\s\S]*data-compact/,
  },
  {
    file: "src/components/sections/header.tsx",
    label: "deterministic section navigation",
    pattern: /handleNavigation[\s\S]*scrollToSection/,
  },
  {
    file: "src/components/sections/header.tsx",
    label: "navigation underline removal",
    pattern: /after:bg-blue|scaleX\(|\bprogress\b/,
    shouldMatch: false,
  },
  {
    file: "src/app/globals.css",
    label: "sticky header anchor clearance",
    pattern: /scroll-padding-top:\s*5rem/,
  },
  {
    file: "src/hooks/use-theme-transition.ts",
    label: "radial theme transition",
    pattern: /startViewTransition[\s\S]*clipPath/,
  },
  {
    file: "src/components/pointer-grid.tsx",
    label: "pointer spotlight",
    pattern: /(?=[\s\S]*pointermove)(?=[\s\S]*--spotlight-x)/,
  },
  {
    file: "src/components/pointer-grid.tsx",
    label: "shared grid fade boundary",
    pattern: /site-grid-field/,
  },
  {
    file: "src/app/globals.css",
    label: "restrained dark grid spotlight",
    pattern:
      /\.dark \.site-grid-spotlight[\s\S]*rgb\(148 163 184 \/ 0\.72\)[\s\S]*opacity:\s*0\.36/,
  },
  {
    file: "src/components/command-menu.tsx",
    label: "command shortcut",
    pattern:
      /event\.ctrlKey \|\| event\.metaKey[\s\S]*key\.toLowerCase\(\) === "k"/,
  },
  {
    file: "src/components/command-menu.tsx",
    label: "command menu without document scroll lock",
    pattern: /DialogPrimitive\.Root[\s\S]{0,120}modal=\{false\}/,
  },
  {
    file: "src/components/command-menu.tsx",
    label: "navigation without focus-restoration race",
    pattern:
      /pendingNavigationRef[\s\S]*onCloseAutoFocus[\s\S]*event\.preventDefault\(\)/,
  },
  {
    file: "src/components/command-menu.tsx",
    label: "scroll-safe command focus restoration",
    pattern: /triggerRef[\s\S]*focus\(\{ preventScroll: true \}\)/,
  },
  {
    file: "src/components/sections/projects.tsx",
    label: "restrained project hover accents",
    pattern: /group-hover:text-blue-500/,
    shouldMatch: false,
  },
  {
    file: "src/components/sections/experience.tsx",
    label: "restrained experience hover accents",
    pattern: /group-hover:(?:bg|text)-blue-500/,
    shouldMatch: false,
  },
];

const failures = [];

for (const check of checks) {
  const source = await readFile(resolve(check.file), "utf8");
  const shouldMatch = check.shouldMatch ?? true;
  if (check.pattern.test(source) !== shouldMatch) {
    failures.push(`${check.label} (${check.file})`);
  }
}

if (failures.length > 0) {
  console.error(`Interaction verification failed:\n- ${failures.join("\n- ")}`);
  process.exitCode = 1;
} else {
  console.log(`Verified ${checks.length} interaction contracts.`);
}
