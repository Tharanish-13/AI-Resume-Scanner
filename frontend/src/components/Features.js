import Image from "next/image";
import { Link } from "../components/documentation";

const FEATURES = [
  {
    src: "/assets/feature-free.svg",
    title: "Free Forever",
    text: "OpenResume is created with the belief that everyone should have free and easy access to a modern professional resume design",
  },
  {
    src: "/assets/feature-us.svg",
    title: "U.S. Best Practices",
    text: "OpenResume has built-in best practices for the U.S. job market and works well with top ATS platforms such as Greenhouse and Lever",
  },
  {
    src: "/assets/feature-privacy.svg",
    title: "Privacy Focus",
    text: "OpenResume stores data locally in your browser so only you have access to your data and with complete control",
  },
  {
    src: "/assets/feature-open-source.svg",
    title: "Open-Source",
    text: (
      <>
        OpenResume is an open-source project, and its source code can be viewed
        by anyone on its{" "}
        <Link href="https://github.com/xitanggg/open-resume">
          GitHub repository
        </Link>
      </>
    ),
  },
];

export const Features = () => {
  return (
    <section className="features-section">
      <div className="mx-auto lg:max-w-4xl">
        <dl className="features-grid">
          {FEATURES.map(({ src, title, text }) => (
            <div key={title}>
              <div className="feature-box">
                <Image
                  src={src}
                  alt="Feature icon"
                  width={48}
                  height={48}
                />
                <div>
                  <dt className="feature-title">{title}</dt>
                  <dd className="feature-desc">{text}</dd>
                </div>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

