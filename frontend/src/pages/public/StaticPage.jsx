export default function StaticPage({ title, description, children }) {
  return (
    <article className="static-page">
      <div className="eyebrow">SKILLSANGAM</div>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      {children || (
        <p>
          SkillSangam helps students build practical experience through short
          paid projects while giving startups a focused way to work with
          emerging talent.
        </p>
      )}
    </article>
  );
}
