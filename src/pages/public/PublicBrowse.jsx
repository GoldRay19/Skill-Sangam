import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInternships } from "../../api/internships";
import Badge from "../../components/Badge";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
export default function PublicBrowse() {
  const [state, setState] = useState({ loading: true, data: [], error: "" });
  useEffect(() => {
    getInternships()
      .then((r) => setState({ loading: false, data: r.data, error: "" }))
      .catch((e) => setState({ loading: false, data: [], error: e.message }));
  }, []);
  if (state.loading) return <Skeleton rows={4} />;
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">OPEN INTERNSHIPS</div>
          <h1>Browse real startup work</h1>
          <p>Explore the marketplace before creating an account.</p>
        </div>
        <Link className="button" to="/register?role=student">
          Create student account
        </Link>
      </div>
      {state.error ? (
        <div className="error-box">{state.error}</div>
      ) : !state.data.length ? (
        <EmptyState>No open internships are available.</EmptyState>
      ) : (
        <div className="card-grid">
          {state.data.map((i) => (
            <article className="card internship-card" key={i.id}>
              <div className="card-top">
                <Badge>Open</Badge>
                <span>2 weeks</span>
              </div>
              <h2>{i.title}</h2>
              <p className="muted">{i.company}</p>
              <p className="clamp">{i.description}</p>
              <div className="chips">
                {i.requiredSkills.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
              <div className="card-meta">
                <b>₹{i.stipend.toLocaleString("en-IN")}</b>
                <Link to="/login">Apply after login →</Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
