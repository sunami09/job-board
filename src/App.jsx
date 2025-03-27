// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Page from "./Page";

const pages = [
  { path: "/", label: "New Jobs", filter: job => job.state === "New" },
  { path: "/priority", label: "Priority", filter: job => job.state === "Old" && job.action === "Priority" },
  { path: "/not-interested", label: "Not Interested", filter: job => job.state === "Old" && job.action === "Not interested" },
  { path: "/maybe", label: "Maybe", filter: job => job.state === "Old" && job.action === "Maybe" },
  { path: "/applied", label: "Applied", filter: job => job.state === "Old" && job.action === "Applied" }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Router>
        <nav className="p-4 flex gap-6 bg-slate-900 border-b border-slate-700 shadow-md">
          {pages.map(p => (
            <NavLink
              key={p.path}
              to={p.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }              
            >
              {p.label}
            </NavLink>
          ))}
        </nav>
  
        <Routes>
          {pages.map(p => (
            <Route key={p.path} path={p.path} element={<Page filter={p.filter} />} />
          ))}
        </Routes>
      </Router>
    </div>
  );  
}
