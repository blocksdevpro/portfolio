import {
  Cloud,
  Cpu,
  Database,
  HardDrives,
  Microphone,
  SpeakerHigh,
} from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/types/resume";

const icons = {
  microphone: Microphone,
  cpu: Cpu,
  speaker: SpeakerHigh,
  database: Database,
  storage: HardDrives,
  cloud: Cloud,
};

export function ProjectArchitecture({
  media,
}: {
  media: Project["media"];
}) {
  return (
    <figure
      className="project-architecture"
      data-layout={media.layout}
      aria-label={media.title}
    >
      <div className="diagram-canvas">
        {media.layout === "branches" && (
          <div className="diagram-root">
            <Cpu size={20} aria-hidden="true" />
            <strong>{media.title}</strong>
          </div>
        )}
        <ol className="diagram-nodes">
          {media.nodes.map((node) => {
            const Icon = icons[node.icon];
            return (
              <li key={node.title}>
                <div className="diagram-node-icon">
                  <Icon size={24} weight="duotone" aria-hidden="true" />
                </div>
                <strong>{node.title}</strong>
                <p>{node.detail}</p>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="sr-only">{media.caption}</figcaption>
    </figure>
  );
}
