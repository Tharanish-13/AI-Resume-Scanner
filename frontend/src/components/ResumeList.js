import { useState, useEffect } from "react";
import Loader from "./Loader";

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:8000/api/get-resumes", {
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

  const handleDelete = async (fileName) => {
    if (!window.confirm(`Delete ${fileName}?`)) return;
    const encodedFilename = encodeURIComponent(fileName);
    const token = localStorage.getItem("token");
      try {
      const response = await fetch(`http://localhost:8000/api/delete-resume/${encodedFilename}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) throw new Error("Delete failed");

      // Remove from UI
      setResumes((prev) => prev.filter((resume) => resume.name !== fileName));
    } catch (error) {
      alert("Failed to delete resume");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDownload = async (filename) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:8000/api/get-resume/${filename}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
  
      if (!response.ok) {
        throw new Error("Download failed");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert("Failed to download file");
      console.error("Download error:", error);
    }
  };  

  return (
    <div>
      {loading && <Loader />}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && resumes.length > 0 ? (
        <ul className="resume-list">
        {resumes.map((resume, index) => (
          <li key={index} className="resume-item">
            <div className="resume-details">
            <span className="resume-name">{resume.name}</span>
              <span className="resume-time">
                Uploaded: {new Date(resume.upload_time).toLocaleString()}
              </span>
            </div>
            <div className="button-container">
            <button className="download-resume" onClick={() => handleDownload(resume.name)}>
              Download
            </button>
            <button
              className="delete-button"
              onClick={() => handleDelete(resume.name)}
              >
                Delete
            </button>
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

export default ResumeList;
