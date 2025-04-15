import { useState } from "react";
import Loader from "../components/Loader";
import MyResumeList from "../components/My-Resumes";

const ResumeUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [jobRole, setJobRole] = useState(null);
  const [matchScore, setMatchScore] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [showResumes, setShowResumes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUploadedResumes = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/get-resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setResumes(data.resumes || []);
        setShowResumes(true);
      } else {
        setMessage(data.detail || "Failed to fetch resumes.");
      }
    } catch (error) {
      setMessage("❌ Error fetching resumes.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileSizeMB = selectedFile.size / (1024 * 1024);
      if (fileSizeMB > 5) {
        setMessage("❌ ERROR: Maximum file size 5MB. Your file exceeds the limit.");
        setFile(null);
        return;
      }

      setFile(selectedFile);
      setMessage("");
      setJobRole(null);
      setMatchScore(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Unauthorized. Please login.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/upload_resume", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error("File upload failed.");
      }

      const data = await response.json();
      setMessage("✅ Upload successful!");
      setJobRole(data.best_match);
      setMatchScore(data.match_score);
      onUpload?.(file);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}

      <div className="Upload-container">
        <div className="optionBox3">
          <h2 className="title">AI Resume Scanner</h2>
          <p className="description">
            AI Resume Scanner is an advanced tool designed to streamline the hiring process by analyzing resumes 
            and matching them with job roles efficiently. Our system leverages artificial intelligence to extract key 
            skills, qualifications, and experience, ensuring that every resume is evaluated with precision.
          </p>
        </div>
      </div>

      <div className="upload-section-wrapper">
        <div className="Upload-container2">
          <div className="upload-box">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              accept=".pdf"
            />

            <button onClick={handleUpload} className="upload-btn" disabled={loading}>
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

            <button 
              onClick={() => { window.location.href = '/Uploads'; }}
              className="my-resume"
              >
               My Resumes
            </button>

            {message && <p className="message">{message}</p>}

            {(jobRole && matchScore !== null) || showResumes ? (
              <div className="result-resume-wrapper">
                <div className="results-container">
                  {jobRole && matchScore !== null && (
                    <div className="result-box">
                      <p className="result-title">Best Job Role Match:</p>
                      <p className="result-content">
                        {jobRole} ({matchScore}%)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeUpload;
