export function About() {
  return (
    <section
      id="about"
      className="about-copy"
      tabIndex={-1}
      aria-labelledby="about-heading"
    >
      <h2 id="about-heading">A little about me</h2>
      <ul>
        <li>
          I&apos;m Uttam, a <strong>Rust backend developer</strong> based in
          Jharkhand, India. I build APIs with Axum, Tokio, and PostgreSQL,
          alongside local AI applications and developer tools.
        </li>
        <li>
          I&apos;ve worked on production APIs, authentication, and database
          integrations for a multi-tenant CRM. Now I&apos;m going deeper into
          concurrency and local inference through my own projects.
        </li>
      </ul>
    </section>
  );
}
