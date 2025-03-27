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
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "24px", background: "#1e293b", borderRadius: "10px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "6px" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", background: "#22d3ee", color: "#0f172a", borderRadius: "6px", fontWeight: "bold" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "#f87171", marginTop: "10px" }}>{error}</p>}
      <p style={{ marginTop: "16px" }}>
        Not a member? <Link to="/register" style={{ color: "#67e8f9" }}>Sign up</Link>
      </p>
    </div>
  );
}
