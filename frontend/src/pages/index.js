import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="homeContainer">
      <Header />

      <main className="mainContent">
        {loading && <Loader />}
        
        {!loading && (
          <>
            <div className="optionBox1">
              <h1>AI Resume Scanner</h1>
              <p>
              AI Resume Scanner is an advanced tool designed to streamline the hiring process by analyzing resumes and 
          matching them with job roles efficiently. Our system leverages artificial intelligence to extract key skills, 
          qualifications, and experience, ensuring that every resume is evaluated with precision.AI Resume Scanner is an advanced tool designed to streamline the hiring process by analyzing resumes and 
          matching them with job roles efficiently. Our system leverages artificial intelligence to extract key skills, 
          qualifications, and experience, ensuring that every resume is evaluated with precision.
              </p>
            </div>

            <div className="optionsContainer">
              <div className="optionBox">
                <Link href="/upload">
                  <h2>Upload Resume</h2>
                  <p>Upload your resume to get job suggestions.</p>
                </Link>
              </div>

              <div className="optionBox2">
                <Link href="/my-resume">
                  <h2>My Resume</h2>
                  <p>Edit your resumes here.</p>
                </Link>
              </div>

              <div className="optionBox">
                <Link href="/resume-templates">
                  <h2>Resume Templates</h2>
                  <p>Select your resume templates here.</p>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
