"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "../../components/Resume/hooks";
import { MagnifyingGlassIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";

const ResumeControlBar = ({ scale, setScale, documentSize, document, fileName }) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({ setScale, documentSize });
  const pdfInstance = usePDF({ document });

  useEffect(() => {
    if (document && typeof pdfInstance.update === "function") {
      pdfInstance.update(); // Ensure update is only called when document is valid and update is a function
    }
  }, [pdfInstance.update, document]);

  return (
    <div style={{
      position: "sticky",
      bottom: 0,
      left: 0,
      right: 0,
      display: "flex",
      height: "var(--resume-control-bar-height)",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 var(--resume-padding)",
      backgroundColor: "#f9fafb"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <MagnifyingGlassIcon style={{ height: "20px", width: "20px" }} />
        <input
          type="range"
          min={0.5}
          max={1.5}
          step={0.01}
          value={scale}
          onChange={(e) => {
            setScaleOnResize(false);
            setScale(Number(e.target.value));
          }}
        />
        <div style={{ width: "2.5rem" }}>{`${Math.round(scale * 100)}%`}</div>
        <label style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <input
            type="checkbox"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize(prev => !prev)}
          />
          <span>Autoscale</span>
        </label>
      </div>
      {pdfInstance.url ? (
        <a
          href={pdfInstance.url}
          download={fileName}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.25rem 0.75rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            textDecoration: "none",
            color: "#333",
          }}
        >
          <ArrowDownTrayIcon style={{ height: "16px", width: "16px" }} />
          <span>Download Resume</span>
        </a>
      ) : (
        <div style={{ color: "#999" }}>Generating PDF...</div>
      )}
    </div>
  );
};

export const ResumeControlBarCSR = dynamic(() => Promise.resolve(ResumeControlBar), { ssr: false });

export const ResumeControlBarBorder = () => (
  <div style={{
    position: "absolute",
    bottom: "var(--resume-control-bar-height)",
    width: "100%",
    borderTop: "2px solid #eee",
    backgroundColor: "#f9fafb"
  }} />
);
