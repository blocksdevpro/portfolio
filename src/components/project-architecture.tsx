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
  number,
}: {
  media: Project["media"];
  number: number;
}) {
  return (
    <figure className="project-architecture" data-layout={media.layout}>
      <div className="diagram-canvas">
        <div className="diagram-caption">
          <span>System overview</span>
          <span>Fig. {String(number).padStart(2, "0")}</span>
        </div>
        <div className="diagram-root">
          {media.layout === "branches" && <Cpu size={22} aria-hidden="true" />}
          <div>
            <strong>{media.title}</strong>
            <span>{media.context}</span>
          </div>
        </div>
        <ol className="diagram-nodes">
          {media.nodes.map((node, index) => {
            const Icon = icons[node.icon];
            return (
              <li key={node.title}>
                <div className="diagram-node-icon">
                  <Icon size={22} aria-hidden="true" />
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <strong>{node.title}</strong>
                <p>{node.detail}</p>
              </li>
            );
          })}
        </ol>
        <p className="diagram-note">{media.note}</p>
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
