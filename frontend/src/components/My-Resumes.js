import { useState, useEffect } from "react";
import Loader from "./Loader";

const MyResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/resume/get-resumes`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) throw new Error("Failed to fetch resumes");
      
      const data = await response.json();
      setResumes(data.resumes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="my-resumes-container">
      {loading && <Loader />}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && resumes.length > 0 ? (
        <ul className="my-resume-list">
        {resumes.map((resume, index) => (
          <li key={index} className="my-resume-item">
            <div className="my-resume-details">
            <span className="my-resume-name">{resume.name}</span>
              <span className="my-resume-time">
                Uploaded: {new Date(resume.upload_time).toLocaleString()}
              </span>
        </div>
          </li>
        ))}
      </ul>      
      ) : (
        !loading && <p className="not-found">No resumes found.</p>
      )}
    </div>
  );
};

export default MyResumeList;
