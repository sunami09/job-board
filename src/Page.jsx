// src/Page.jsx
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

export default function Page({ filter }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://34.176.141.5:5001/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const filtered = jobs.filter(filter);

  return (
    <div className="page-container">
      {filtered.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
