import React from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "./firebase";
import { useToast } from "./ToastContext";

export default function JobCard({ job, removeJob, triggerReload }) {
  const user = getAuth().currentUser;
  const toast = useToast();

  async function updateJob(id, action) {
    if (!user) {
      toast("Please login to track jobs.");
      return;
    }

    const userActionRef = doc(db, "users", user.uid, "job_actions", id);
    await setDoc(userActionRef, { action, state: "Old" });

    removeJob(id);         // visually remove
    triggerReload();       // reload latest state
  }

  function ActionButton({ label, onClick, bgColor }) {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: bgColor,
          color: bgColor === "#facc15" ? "#000" : "#fff",
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "15px"
        }}
        onMouseOver={e => (e.currentTarget.style.opacity = "0.85")}
        onMouseOut={e => (e.currentTarget.style.opacity = "1")}
      >
        {label}
      </button>
    );
  }

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p className="company">{job.company}</p>
      <p className="desc">{job.desc.slice(0, 200)}...</p>
      <a href={job.link} target="_blank" rel="noreferrer" className="link">
        View Job
      </a>

      <div className="actions" style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
        {job.state === "New" && (
          <>
            <ActionButton label="Interested" onClick={() => updateJob(job.id, "Priority")} bgColor="#16a34a" />
            <ActionButton label="Not Interested" onClick={() => updateJob(job.id, "Not interested")} bgColor="#dc2626" />
            <ActionButton label="Maybe" onClick={() => updateJob(job.id, "Maybe")} bgColor="#facc15" />
          </>
        )}

        {job.state === "Old" && job.action === "Priority" && (
          <>
            <ActionButton label="Applied" onClick={() => updateJob(job.id, "Applied")} bgColor="#16a34a" />
            <ActionButton label="Maybe" onClick={() => updateJob(job.id, "Maybe")} bgColor="#facc15" />
          </>
        )}

        {job.state === "Old" && job.action === "Not interested" && (
          <ActionButton label="Maybe" onClick={() => updateJob(job.id, "Maybe")} bgColor="#facc15" />
        )}

        {job.state === "Old" && job.action === "Maybe" && (
          <>
            <ActionButton label="Interested" onClick={() => updateJob(job.id, "Priority")} bgColor="#16a34a" />
            <ActionButton label="Not Interested" onClick={() => updateJob(job.id, "Not interested")} bgColor="#dc2626" />
          </>
        )}
      </div>
    </div>
  );
}
