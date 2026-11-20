import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RoleBadge from "../components/RoleBadge";
export default function EmployerLayout({ children }) {
  const { user, logout } = useAuth();
  const postPath =
    user.verificationStatus === "approved"
      ? "/employer/internships/new"
      : "/employer/verify";
  return (
    <div className="role-layout employer-theme">
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/employer" className="brand">
            ✦ Skill<span>Sangam</span>
          </Link>
          <nav>
            <NavLink end to="/employer">
              Dashboard
            </NavLink>
            <NavLink to="/employer/internships">My internships</NavLink>
            <NavLink
              className={
                user.verificationStatus === "approved" ? "" : "disabled"
              }
              to={postPath}
              title={
                user.verificationStatus === "approved"
                  ? "Post internship"
                  : "Complete verification before posting"
              }
            >
              Post internship
            </NavLink>
            <NavLink to="/employer/company">Company profile</NavLink>
          </nav>
          <div className="user-menu">
            <RoleBadge role="employer" />
            <span>{user.companyName || user.name}</span>
            <Link to="/account">Account</Link>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      </header>
      <main className="container page-content">{children}</main>
    </div>
  );
}
