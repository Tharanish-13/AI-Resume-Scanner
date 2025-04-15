import React, { useState } from "react";
import { INPUT_CLASS_NAME } from "../../../components/ResumeForm/Form/InputGroup";

export const FeaturedSkillInput = ({
  skill,
  rating,
  setSkillRating,
  placeholder,
  className,
  circleColor,
}) => {
  return (
    <div className={`featured-skill-input ${className || ""}`}>
      <input
        type="text"
        value={skill}
        placeholder={placeholder}
        onChange={(e) => setSkillRating(e.target.value, rating)}
        className={INPUT_CLASS_NAME}
      />
      <CircleRating
        rating={rating}
        setRating={(newRating) => setSkillRating(skill, newRating)}
        circleColor={circleColor}
      />
    </div>
  );
};

const CircleRating = ({ rating, setRating, circleColor = "#38bdf8" }) => {
  const numCircles = 5;
  const [hoverRating, setHoverRating] = useState(null);

  return (
    <div className="circle-rating-container">
      {[...Array(numCircles)].map((_, idx) => (
        <div
          className="circle-wrapper"
          key={idx}
          onClick={() => setRating(idx)}
          onMouseEnter={() => setHoverRating(idx)}
          onMouseLeave={() => setHoverRating(null)}
        >
          <div
            className="circle"
            style={{
              backgroundColor:
                (hoverRating !== null && hoverRating >= idx) ||
                (hoverRating === null && rating >= idx)
                  ? circleColor
                  : "#d1d5db",
            }}
          />
        </div>
      ))}
    </div>
  );
};
