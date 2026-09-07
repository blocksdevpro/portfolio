const groups = [
  { label: "Languages", skills: ["Rust", "Python", "SQL"] },
  {
    label: "Backend",
    skills: [
      "Axum",
      "Tokio",
      "FastAPI",
      "REST APIs",
      "Async Programming",
      "Concurrent Systems",
    ],
  },
  { label: "Data", skills: ["PostgreSQL", "SQLx", "MongoDB"] },
  {
    label: "Infrastructure",
    skills: ["Docker", "DigitalOcean", "Cloudflare", "Git"],
  },
];

export function TechStack({ skills }: { skills: string[] }) {
  const known = new Set(groups.flatMap((group) => group.skills));
  const other = skills.filter((skill) => !known.has(skill));
  const rows = [
    ...groups,
    ...(other.length ? [{ label: "Other tools", skills: other }] : []),
  ];
  return (
    <section
      id="stack"
      className="stack-section section-inset"
      aria-labelledby="stack-heading"
    >
      <h2 id="stack-heading" className="eyebrow">
        TOOLS I WORK WITH
      </h2>
      <dl className="stack-table">
        {rows.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>
              {group.skills
                .filter((skill) => skills.includes(skill))
                .map((skill) => (
                  <span key={skill} data-rust={skill === "Rust"}>
                    {skill}
                  </span>
                ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
