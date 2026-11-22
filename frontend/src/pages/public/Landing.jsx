import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="landing">
      <div className="container landing-inner">
        <div className="eyebrow">
          <Sparkles size={14} /> SKILLS INTO REAL EXPERIENCE
        </div>
        <h1>Short projects. Real proof. Better beginnings.</h1>
        <p className="lead">
          SkillSangam connects fresh software graduates with startups for paid,
          focused two-week micro-internships.
        </p>
        <div className="cta-row">
          <Link className="button" to="/register?role=student">
            Find internships <ArrowRight size={16} />
          </Link>
          <Link className="button secondary" to="/register?role=employer">
            Hire interns
          </Link>
        </div>
        <div className="steps">
          <div>
            <b>01</b>
            <h3>Discover</h3>
            <p>Find a project that fits your skills.</p>
          </div>
          <div>
            <b>02</b>
            <h3>Build</h3>
            <p>Deliver real work in two weeks.</p>
          </div>
          <div>
            <b>03</b>
            <h3>Grow</h3>
            <p>Turn outcomes into credible proof.</p>
          </div>
        </div>
        <p className="demo-note">
          <CheckCircle2 size={14} /> Phase 1 demo with local data and working
          role-based flows.
        </p>
      </div>
      <div className="benefit-grid">
        <article>
          <b>For students</b>
          <h3>Earn while you learn</h3>
          <p>Build a portfolio from paid, real deliverables.</p>
        </article>
        <article>
          <b>For students</b>
          <h3>Show your signal</h3>
          <p>Match your skills to work that makes them visible.</p>
        </article>
        <article>
          <b>For startups</b>
          <h3>Meet emerging talent</h3>
          <p>Find focused contributors for scoped projects.</p>
        </article>
      </div>
    </div>
  );
}
