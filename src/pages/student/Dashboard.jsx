import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../api/applications";
import { getInternships } from "../../api/internships";
import { useAuth } from "../../context/AuthContext";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";
export default function Dashboard() {
  const { user } = useAuth();
  const [state, setState] = useState(null);
  useEffect(() => {
    Promise.all([
      getApplications({ studentId: user.id }),
      getInternships({ studentSkills: user.skills }),
    ]).then(([a, i]) => setState({ apps: a.data, top: i.data.slice(0, 3) }));
  }, []);
  if (!state) return <Skeleton rows={4} />;
  const fields = [
    user.name,
    user.college,
    user.bio,
    user.skills?.length ? "skills" : "",
    user.github,
  ];
  const complete = Math.round(
    (fields.filter(Boolean).length / fields.length) * 100,
  );
  const counts = ["Applied", "Shortlisted", "Accepted", "Rejected"].map(
    (status) => ({
      status,
      count: state.apps.filter((a) => a.status === status).length,
    }),
  );
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">STUDENT WORKSPACE</div>
          <h1>Welcome back, {user.name}</h1>
          <p>Build a profile that turns learning into visible proof.</p>
        </div>
        <Link className="button" to="/student/browse">
          Browse internships
        </Link>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <b>{complete}%</b>
          <span>Profile completeness</span>
          <div className="progress">
            <i style={{ width: `${complete}%` }} />
          </div>
        </div>
        {counts.map((c) => (
          <div className="stat-card" key={c.status}>
            <b>{c.count}</b>
            <span>{c.status} applications</span>
          </div>
        ))}
      </div>
      {!user.github && (
        <div className="banner">
          Connect GitHub to detect skills from public repositories.{" "}
          <Link to="/student/profile">Connect GitHub →</Link>
        </div>
      )}
      <section>
        <div className="section-title">
          <div>
            <h2>Top matches</h2>
            <p>Computed from your saved profile skills.</p>
          </div>
          <Link to="/student/browse">View all</Link>
        </div>
        <div className="card-grid">
          {state.top.map((i) => (
            <Link
              className="card internship-card"
              to={`/student/internships/${i.id}`}
              key={i.id}
            >
              <div className="card-top">
                <Badge>Open</Badge>
                <strong>{i.match ?? 0}% match</strong>
              </div>
              <h2>{i.title}</h2>
              <p className="muted">{i.company}</p>
              <div className="card-meta">
                <b>₹{i.stipend.toLocaleString("en-IN")}</b>
                <span>{i.openings} openings</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
