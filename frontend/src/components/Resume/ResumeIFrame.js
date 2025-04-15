"use client";
import { useMemo } from "react";
import Frame from "react-frame-component";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_WIDTH_PT,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
  LETTER_WIDTH_PT,
} from "../../lib/constants";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "../fonts/lib";

const getIframeInitialContent = (isA4) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  const fonts = getAllFontFamiliesToLoad();
  const preload = fonts
    .map(
      (f) => `
    <link rel="preload" as="font" href="/fonts/${f}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
    <link rel="preload" as="font" href="/fonts/${f}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
    )
    .join("");
  const faces = fonts
    .map(
      (f) => `
    @font-face { font-family: "${f}"; src: url("/fonts/${f}-Regular.ttf"); }
    @font-face { font-family: "${f}"; src: url("/fonts/${f}-Bold.ttf"); font-weight: bold; }`
    )
    .join("");

  return `<!DOCTYPE html><html><head>${preload}<style>${faces}</style></head>
    <body style='overflow:hidden; width:${width}pt; margin:0; padding:0; -webkit-text-size-adjust:none;'><div></div></body></html>`;
};

const ResumeIframe = ({ documentSize, scale, children, enablePDFViewer = false }) => {
  const isA4 = documentSize === "A4";
  const initialContent = useMemo(() => getIframeInitialContent(isA4), [isA4]);

  if (enablePDFViewer) {
    return <DynamicPDFViewer style={{ width: "100%", height: "100%" }}>{children}</DynamicPDFViewer>;
  }

  const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

  return (
    <div style={{ maxWidth: `${width * scale}px`, maxHeight: `${height * scale}px` }}>
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          marginLeft: "-60px",
          backgroundColor: "white",
        }}
      >
        <Frame
          style={{ width: "100%", height: "100%" }}
          initialContent={initialContent}
          key={isA4 ? "A4" : "LETTER"}
        >
          {children}
        </Frame>
      </div>
    </div>
  );
};

export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), { ssr: false });

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  { ssr: false }
);