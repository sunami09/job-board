import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Page from "./Page";
import Login from "./Login";
import Register from "./Register";

const pages = [
  { path: "/", label: "New Jobs", filter: job => job.state === "New" },
  { path: "/priority", label: "Priority", filter: job => job.state === "Old" && job.action === "Priority" },
  { path: "/not-interested", label: "Not Interested", filter: job => job.state === "Old" && job.action === "Not interested" },
  { path: "/maybe", label: "Maybe", filter: job => job.state === "Old" && job.action === "Maybe" },
  { path: "/applied", label: "Applied", filter: job => job.state === "Old" && job.action === "Applied" }
];

export default function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, [auth]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      window.location.href = "/";
    });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f172a", color: "white" }}>
      <Router>
        <nav style={{
          backgroundColor: "#1e293b",
          padding: "12px 24px",
          borderBottom: "1px solid #334155",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.4)"
        }}>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {pages.map(p => (
              <NavLink
                key={p.path}
                to={p.path}
                style={({ isActive }) => ({
                  color: isActive ? "#22d3ee" : "#94a3b8",
                  textDecoration: "none",
                  fontWeight: "500",
                  fontSize: "16px",
                  padding: "6px 12px",
                  borderRadius: "6px"
                })}
              >
                {p.label}
              </NavLink>
            ))}
          </div>

          <div style={{ marginLeft: "auto" }}>
            {!user ? (
              <NavLink to="/login">
                {({ isActive }) => (
                  <button
                    style={{
                      backgroundColor: isActive ? "#22d3ee" : "#334155",
                      color: isActive ? "#0f172a" : "#94a3b8",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "15px"
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.backgroundColor = "#22d3ee";
                      e.currentTarget.style.color = "#0f172a";
                    }}
                    onMouseOut={e => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "#334155";
                        e.currentTarget.style.color = "#94a3b8";
                      }
                    }}
                  >
                    Login / Register
                  </button>
                )}
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#334155",
                  color: "#94a3b8",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "500",
                  fontSize: "15px"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.backgroundColor = "#334155";
                  e.currentTarget.style.color = "#94a3b8";
                }}
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <Routes>
          {pages.map(p => (
            <Route key={p.path} path={p.path} element={<Page filter={p.filter} />} />
          ))}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}
