"use client";
import { getHasUsedAppBefore } from "../../lib/redux/local-storage";
import { ResumeDropzone } from "../../components/ResumeDropzone";
import { useState, useEffect } from "react";
import Link from "next/link";

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ImportResume() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false);
  const [hasAddedResume, setHasAddedResume] = useState(false);

  const onFileUrlChange = (fileUrl) => {
    setHasAddedResume(Boolean(fileUrl));
  };

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore());
  }, []);

  return (
    <main>
      <Header />
      <div style={styles.container}>
        {!hasUsedAppBefore ? (
          <>
            <h1 style={styles.heading}>Import data from an existing resume</h1>
            <ResumeDropzone onFileUrlChange={onFileUrlChange} style={styles.dropzone} />
            {!hasAddedResume && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a resume yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedResume && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in browser from prior session"
                  buttonText="Continue where I left off"
                />
                <OrDivider />
              </>
            )}
            <h1 style={styles.heading}>Override data with a new resume</h1>
            <ResumeDropzone onFileUrlChange={onFileUrlChange} style={styles.dropzone} />
          </>
        )}
      </div>
      <Footer />
    </main>
  );
}

const OrDivider = () => (
  <div style={styles.dividerWrapper} aria-hidden="true">
    <div style={styles.divider} />
    <span style={styles.orText}>or</span>
    <div style={styles.divider} />
  </div>
);

const SectionWithHeadingAndCreateButton = ({ heading, buttonText }) => {
  return (
    <>
      <p style={styles.heading}>{heading}</p>
      <div style={{ marginTop: '20px' }}>
        <Link href="/resume-builder">
          <span style={styles.button}>{buttonText}</span>
        </Link>
      </div>
    </>
  );
};

const styles = {
  container: {
    margin: '56px auto',
    maxWidth: '768px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#111827',
  },
  dropzone: {
    marginTop: '20px',
  },
  dividerWrapper: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '32px',
    paddingBottom: '24px',
    marginLeft: '-40px',
    marginRight: '-40px',
  },
  divider: {
    flexGrow: 1,
    borderTop: '1px solid #e5e7eb',
  },
  orText: {
    marginLeft: '8px',
    marginRight: '8px',
    fontSize: '18px',
    color: '#9ca3af',
    marginTop: '-2px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#0ea5e9',
    color: 'white',
    fontWeight: '600',
    fontSize: '16px',
    padding: '6px 24px',
    borderRadius: '9999px',
    textDecoration: 'none',
  },
};
