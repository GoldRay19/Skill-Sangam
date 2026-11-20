import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RoleBadge from "../components/RoleBadge";
export default function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  return (
    <div className="role-layout admin-theme">
      <header className="navbar">
        <div className="container nav-inner">
          <Link to="/admin" className="brand">
            ✦ Skill<span>Sangam</span>
          </Link>
          <nav>
            <NavLink end to="/admin">
              Dashboard
            </NavLink>
            <NavLink to="/admin/employers">Employer approvals</NavLink>
            <NavLink to="/admin/reports">Reports</NavLink>
            <NavLink to="/admin/audit">Audit log</NavLink>
          </nav>
          <div className="user-menu">
            <RoleBadge role="admin" />
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
