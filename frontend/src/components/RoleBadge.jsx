export default function RoleBadge({ role }) {
  const labels = { student: "Student", employer: "Employer", admin: "Admin" };
  return (
    <span className={`role-badge role-${role}`}>{labels[role] || role}</span>
  );
}
