import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function Unauthorized() {
  const { user } = useAuth();
  return (
    <div className="empty page-message">
      <h1>Unauthorized</h1>
      <p>You do not have access to this role's workspace.</p>
      <Link className="button" to={user ? `/${user.role}` : "/login"}>
        Go to my workspace
      </Link>
    </div>
  );
}
