import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import db from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Page({ filter }) {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsSnapshot = await getDocs(collection(db, "jobs"));
      let jobList = jobsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (user) {
        const actionsSnapshot = await getDocs(collection(db, "users", user.uid, "job_actions"));
        const actionsMap = {};
        actionsSnapshot.forEach(doc => {
          actionsMap[doc.id] = doc.data();
        });

        jobList = jobList.map(job =>
          actionsMap[job.id]
            ? { ...job, ...actionsMap[job.id] }
            : job
        );
      }

      // ✅ Sort by 'created' date descending
      jobList.sort((a, b) => (b.created || "").localeCompare(a.created || ""));

      setJobs(jobList);
    };

    fetchJobs();
  }, [user, reloadTrigger]);

  const filtered = jobs.filter(filter);

  return (
    <div className="page-container">
      {filtered.length === 0 ? (
        <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#94a3b8" }}>
          No jobs yet!
        </p>
      ) : (
        filtered.map(job => (
          <JobCard
            key={job.id}
            job={job}
            removeJob={id => setJobs(prev => prev.filter(j => j.id !== id))}
            triggerReload={() => setReloadTrigger(r => r + 1)}
          />
        ))
      )}
    </div>
  );
}
