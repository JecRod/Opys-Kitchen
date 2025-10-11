// 404Page.tsx
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" style={{ color: "#667eea", fontWeight: "bold" }}>
        Go Home
      </Link>
    </div>
  );
}
