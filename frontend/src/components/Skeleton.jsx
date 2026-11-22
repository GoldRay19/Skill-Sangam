export default function Skeleton({ rows = 3 }) {
  return (
    <div className="stack">
      {Array.from({ length: rows }, (_, i) => (
        <div className="skeleton" key={i} />
      ))}
    </div>
  );
}
