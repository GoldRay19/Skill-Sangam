import { Link, NavLink } from "react-router-dom";
export default function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/" className="brand">
            ✦ Skill<span>Sangam</span>
          </Link>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/how-it-works">How it works</NavLink>
            <NavLink to="/internships">Browse internships</NavLink>
          </nav>
          <div className="nav-actions">
            <Link to="/login">Login</Link>
            <Link className="button small" to="/register">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <div className="container footer-inner">
          <b>SkillSangam</b>
          <div>
            <Link to="/about">About</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
