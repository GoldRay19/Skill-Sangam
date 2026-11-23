import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RoleBadge from "../components/RoleBadge";
import Navbar from "../components/Navbar";
export default function StudentLayout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="role-layout student-theme">
      <Navbar user={user} onLogout={logout} />
      <header className="navbar hidden">
        <div className="container nav-inner">
          <Link to="/student" className="brand">
            ✦ Skill<span>Sangam</span>
          </Link>
          <nav>
            <NavLink end to="/student">
              Dashboard
            </NavLink>
            <NavLink to="/student/browse">Browse</NavLink>
            <NavLink to="/student/applications">Applications</NavLink>
            <NavLink to="/student/profile">Profile</NavLink>
          </nav>
          <div className="user-menu">
            <RoleBadge role="student" />
            <span>{user.name}</span>
            <Link to="/account">Account</Link>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      </header>
      <main className="container page-content">{children}</main>
    </div>
  );
}
