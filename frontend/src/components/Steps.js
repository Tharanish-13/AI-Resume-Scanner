import React from "react";

const STEPS = [
  { title: "Add a resume pdf", text: "or create from scratch" },
  { title: "Preview design", text: "and make edits" },
  { title: "Download new resume", text: "and apply with confidence" },
];

export const Steps = () => {
  return (
    <section className="steps-background">
      <div className="steps-container">
        <h1 className="steps-title">3 Simple Steps</h1>
        <div className="steps-list-wrapper">
          <dl className="steps-list">
            {STEPS.map(({ title, text }, idx) => (
              <div className="step" key={idx}>
                <dt className="step-title">
                  <div className="step-number-circle">
                    <div className="step-number">{idx + 1}</div>
                  </div>
                  {title}
                </dt>
                <dd className="step-description">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
