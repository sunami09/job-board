import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch(err => setError(err.message));
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "#0f172a"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        background: "#1e293b",
        borderRadius: "10px",
        padding: "24px",
        boxSizing: "border-box",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              boxSizing: "border-box"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px",
              borderRadius: "6px",
              boxSizing: "border-box"
            }}
          />
          <button type="submit" style={{
            width: "100%",
            padding: "10px",
            background: "#22d3ee",
            color: "#0f172a",
            borderRadius: "6px",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            cursor: "pointer"
          }}>
            Login
          </button>
        </form>
        {error && <p style={{ color: "#f87171", marginTop: "10px" }}>{error}</p>}
        <p style={{ marginTop: "16px" }}>
          Not a member? <Link to="/register" style={{ color: "#67e8f9" }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
