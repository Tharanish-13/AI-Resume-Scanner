import Header from "../components/Header";
import Footer from "../components/Footer";
import ResumeUpload from "../components/ResumeUpload";
import Loader from "../components/Loader";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true); // Start as loading
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Minimum loader time (1.5s)
    const delay = setTimeout(() => {
      if (!token) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delay);
  }, [router]);

  const handleUpload = (file) => {
    const newResume = {
      name: file.name,
    };
    setResumes((prevResumes) => [...prevResumes, newResume]);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />
      <main className="main-content">
        <div className="upload-container">
          <ResumeUpload onUpload={handleUpload} setLoading={setLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
