"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTailwindBreakpoints } from "../lib/hooks/useTailwindBreakpoints";

// Heart icon path (replace with actual path if needed)
const heartSrc = "/assets/heart.svg";

const TESTIMONIALS = [
  {
    src: "/assets/testimonial-spiegel.jpg",
    quote:
      "Students often make silly mistakes on their resume by using inconsistent bullet points or font sizes. OpenResume’s auto format feature is a great help to ensure consistent format.",
    name: "Ms. Spiegel",
    title: "Educator",
  },
  {
    src: "/assets/testimonial-santi.jpg",
    quote:
      "I used OpenResume during my last job search and was invited to interview at top tech companies such as Google and Amazon thanks to its slick yet professional resume design.",
    name: "Santi",
    title: "Software Engineer",
  },
  {
    src: "/assets/testimonial-vivian.jpg",
    quote:
      "Creating a professional resume on OpenResume is so smooth and easy! It saves me so much time and headache to not deal with google doc template.",
    name: "Vivian",
    title: "College Student",
  },
];

const LG_TESTIMONIALS_CLASSNAMES = [
  "z-10",
  "translate-x-44 translate-y-24 opacity-40",
  "translate-x-32 -translate-y-28 opacity-40",
];
const SM_TESTIMONIALS_CLASSNAMES = ["z-10", "opacity-0", "opacity-0"];
const ROTATION_INTERVAL_MS = 8000;

export const Testimonials = ({ children }) => {
  const [testimonialsClassNames, setTestimonialsClassNames] = useState(
    LG_TESTIMONIALS_CLASSNAMES
  );
  const isHoveredOnTestimonial = useRef(false);
  const { isLg } = useTailwindBreakpoints();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHoveredOnTestimonial.current) {
        setTestimonialsClassNames((prev) => [prev[1], prev[2], prev[0]]);
      }
    }, ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTestimonialsClassNames(
      isLg ? LG_TESTIMONIALS_CLASSNAMES : SM_TESTIMONIALS_CLASSNAMES
    );
  }, [isLg]);

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-heading">
        People{" "}
        <Image
          src={heartSrc}
          alt="love"
          width={24}
          height={24}
          className="heart-icon"
        />{" "}
        OpenResume
      </h2>

      <div className="testimonials-container">
        <div className="testimonial-carousel">
          {TESTIMONIALS.map(({ src, quote, name, title }, idx) => {
            const className = testimonialsClassNames[idx];
            return (
              <div
                key={idx}
                className={`testimonial-card ${className}`}
                onMouseEnter={() => {
                  if (className === "show") {
                    isHoveredOnTestimonial.current = true;
                  }
                }}
                onMouseLeave={() => {
                  if (className === "show") {
                    isHoveredOnTestimonial.current = false;
                  }
                }}
              >
                <figure className="testimonial-figure">
                  <Image
                    className="testimonial-img-lg"
                    src={src}
                    alt="profile"
                    width={100}
                    height={100}
                  />
                  <div>
                    <blockquote>
                      <p className="testimonial-quote">{quote}</p>
                    </blockquote>
                    <figcaption className="testimonial-caption">
                      <div className="caption-lg">
                        <div className="testimonial-name">{name}</div>
                        <div className="testimonial-dot">•</div>
                        <div className="testimonial-title">{title}</div>
                      </div>
                      <div className="caption-sm">
                        <Image
                          className="testimonial-img-sm"
                          src={src}
                          alt="profile"
                          width={60}
                          height={60}
                        />
                        <div>
                          <div className="testimonial-name">{name}</div>
                          <div className="testimonial-title">{title}</div>
                        </div>
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
            );
          })}
        </div>
      </div>

      {children}
    </section>
  );
};
