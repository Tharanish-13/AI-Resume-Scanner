import { useState, useEffect } from "react";
import Header from '../components/Header';
import Loader from "../components/Loader";
import Footer from '../components/Footer';
import ResumeList from "../components/ResumeList";

const Uploads = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Add loading state

  const fetchResumes = async () => {
    const token = localStorage.getItem("token");
    setLoading(true); // ✅ Start loading
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/get-resumes`, {
        console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE);
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setResumes(data.resumes || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="homeContainer">
      <Header />

      {loading && <Loader />} {/* ✅ Loader based on state */}

      <div className="container-uploads">
        <h2>Uploaded Resumes</h2>
        <div className="resume-container">
          {resumes.length > 0 ? (
            <ResumeList resumes={resumes} />
          ) : (
            !loading && <p>No resumes found.</p> // Only show message if not loading
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Uploads;
