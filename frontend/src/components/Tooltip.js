"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A simple Tooltip component that shows tooltip text centered below children on hover and focus.
 */
export const Tooltip = ({ text, children }) => {
  const spanRef = useRef(null);
  const tooltipRef = useRef(null);

  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [show, setShow] = useState(false);

  const showTooltip = () => setShow(true);
  const hideTooltip = () => setShow(false);

  useEffect(() => {
    const span = spanRef.current;
    const tooltip = tooltipRef.current;
    if (span && tooltip) {
      const rect = span.getBoundingClientRect();
      const TOP_OFFSET = 6;
      const newTop = rect.top + rect.height + TOP_OFFSET;
      const newLeft = rect.left - tooltip.offsetWidth / 2 + rect.width / 2;
      setTooltipPos({ top: newTop, left: newLeft });
    }
  }, [show]);

  return (
    <span
      ref={spanRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onClick={hideTooltip}
    >
      {children}
      {show &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            className="custom-tooltip"
            style={{
              position: "absolute",
              left: `${tooltipPos.left}px`,
              top: `${tooltipPos.top}px`,
            }}
          >
            {text}
          </div>,
          document.body
        )}
    </span>
  );
};
