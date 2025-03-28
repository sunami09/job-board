import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = e => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
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
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.4)"
      }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#fff" }}>Register</h2>
        <form onSubmit={handleRegister}>
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
              border: "none",
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
              border: "none",
              boxSizing: "border-box"
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#22d3ee",
              color: "#0f172a",
              borderRadius: "6px",
              fontWeight: "bold",
              border: "none",
              cursor: "pointer"
            }}
          >
            Register
          </button>
        </form>
        {error && <p style={{ color: "#f87171", marginTop: "12px" }}>{error}</p>}
        <p style={{ marginTop: "20px", color: "#cbd5e1" }}>
          Already a member? <Link to="/login" style={{ color: "#67e8f9", textDecoration: "underline" }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
