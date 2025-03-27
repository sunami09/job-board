import React from "react";
import { FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

export default function JobCard({ job }) {
  function updateJob(id, action) {
    fetch(`http://34.176.141.5:5001/api/jobs/${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, state: "Old" })
    })
      .then(res => res.json())
      .then(() => window.location.reload());
  }

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p className="company">{job.company}</p>
      <p className="desc">{job.desc.slice(0, 200)}...</p>
      <a href={job.link} target="_blank" rel="noreferrer" className="link">
        View Job
      </a>

      <div className="actions">
        {job.state === "New" && (
          <>
            <button onClick={() => updateJob(job.id, "Priority")} className="hover-text-green">
              <FaCheckCircle />
            </button>
            <button onClick={() => updateJob(job.id, "Not interested")} className="hover-text-red">
              <FaTimesCircle />
            </button>
            <button onClick={() => updateJob(job.id, "Maybe")} className="hover-text-yellow">
              <FaExclamationCircle />
            </button>
          </>
        )}

        {job.state === "Old" && job.action === "Priority" && (
          <>
            <button onClick={() => updateJob(job.id, "Applied")} className="hover-text-green">
              <FaCheckCircle />
            </button>
            <button onClick={() => updateJob(job.id, "Maybe")} className="hover-text-yellow">
              <FaExclamationCircle />
            </button>
          </>
        )}

        {job.state === "Old" && job.action === "Not interested" && (
          <button onClick={() => updateJob(job.id, "Maybe")} className="hover-text-yellow">
            <FaExclamationCircle />
          </button>
        )}

        {job.state === "Old" && job.action === "Maybe" && (
          <>
            <button onClick={() => updateJob(job.id, "Priority")} className="hover-text-green">
              <FaCheckCircle />
            </button>
            <button onClick={() => updateJob(job.id, "Not interested")} className="hover-text-red">
              <FaTimesCircle />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
