import React from "react";
import Link from "next/link";
import { FlexboxSpacer } from "./FlexboxSpacer";
import { StaticResume as AutoTypingResume } from "./AutoTypingResume";

export const Hero = () => {
  return (
    <section className="hero-section">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hero-spacer-left" />

      <div className="hero-content">
        <h1 className="hero-title">
          Create a professional
          <br />
          resume easily
        </h1>
        <p className="hero-subtitle">
          With this free, open-source, and powerful resume builder
        </p>

        {/* Remove the <a> tag */}
        <Link href="/resume-import" className="hero-button">
          Create Resume <span aria-hidden="true">→</span>
        </Link>

        <p className="hero-note">No sign up required</p>

        <p className="hero-ats-note">
          Already have a resume? Test its ATS readability with the{" "}
          <Link href="/resume-parser" className="hero-parser-link">
            resume parser
          </Link>
        </p>
      </div>

      <FlexboxSpacer maxWidth={100} minWidth={50} className="hero-spacer-right" />

      <div className="hero-animation-container">
        <AutoTypingResume />
      </div>
    </section>
  );
};