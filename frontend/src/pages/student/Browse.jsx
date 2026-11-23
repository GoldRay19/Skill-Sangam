import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { getInternships } from "../../api/internships";
import { useAuth } from "../../context/AuthContext";
import Skeleton from "../../components/Skeleton";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";
export default function Browse() {
  const { user } = useAuth();
  const [filters, setFilters] = useState({ q: "", skill: "", sort: "match" });
  const [state, setState] = useState({ loading: true, data: [], error: "" });
  useEffect(() => {
    setState((s) => ({ ...s, loading: true }));
    getInternships({ ...filters, studentSkills: user.skills })
      .then((r) => setState({ loading: false, data: r.data, error: "" }))
      .catch((e) => setState({ loading: false, data: [], error: e.message }));
  }, [filters, user.skills.join(",")]);
  const skills = [...new Set(state.data.flatMap((i) => i.requiredSkills))];
  return (
    <>
      <div className="page-head">
        <div>
          <div className="eyebrow">STUDENT WORKSPACE</div>
          <h1>Find your next project</h1>
          <p>Paid, focused work from startups building something real.</p>
        </div>
      </div>
      {!user.skills.length && (
        <div className="banner">
          Add skills to see match scores.{" "}
          <Link to="/student/profile">Update your profile →</Link>
        </div>
      )}
      <div className="filters">
        <label className="search">
          <Search size={17} />
          <input
            placeholder="Search internships"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
          />
        </label>
        <label>
          <SlidersHorizontal size={16} />
          <select
            value={filters.skill}
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          >
            <option value="">All skills</option>
            {skills.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="match">Best match</option>
          <option value="stipend">Highest stipend</option>
        </select>
      </div>
      {state.loading ? (
        <Skeleton rows={4} />
      ) : state.error ? (
        <div className="error-box">{state.error}</div>
      ) : !state.data.length ? (
        <EmptyState title="No open internships found">
          Try a different search or skill filter.
        </EmptyState>
      ) : (
        <div className="card-grid">
          {state.data.map((i) => (
            <Link
              className="card internship-card"
              to={`/student/internships/${i.id}`}
              key={i.id}
            >
              <div className="card-top">
                <Badge>{i.status}</Badge>
                {i.match !== null && <strong>{i.match}% match</strong>}
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
                <span>
                  2 weeks · {i.openings} opening{i.openings === 1 ? "" : "s"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
