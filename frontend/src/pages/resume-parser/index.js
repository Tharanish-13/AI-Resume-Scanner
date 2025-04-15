"use client";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { groupTextItemsIntoLines } from "../../lib/parse-resume-from-pdf/group-text-items-into-lines";
import { groupLinesIntoSections } from "../../lib/parse-resume-from-pdf/group-lines-into-sections";
import { extractResumeFromSections } from "../../lib/parse-resume-from-pdf/extract-resume-from-sections";
import { ResumeDropzone } from "../../components/ResumeDropzone";
import { Heading, Link, Paragraph } from "../../components/documentation";
import { ResumeTable } from "../resume-parser/ResumeTable";
import { ResumeParserAlgorithmArticle } from "../resume-parser/ResumeParserAlgorithmArticle";

const RESUME_EXAMPLES = [
  {
    fileUrl: "resume-example/laverne-resume.pdf",
    description: (
      <span>
        Borrowed from University of La Verne Career Center -{" "}
        <Link href="https://laverne.edu/careers/wp-content/uploads/sites/15/2010/12/Undergraduate-Student-Resume-Examples.pdf">
          Link
        </Link>
      </span>
    ),
  },
  {
    fileUrl: "resume-example/openresume-resume.pdf",
    description: (
      <span>
        Created with OpenResume resume builder -{" "}
        <Link href="/resume-builder">Link</Link>
      </span>
    ),
  },
];

const defaultFileUrl = RESUME_EXAMPLES[0].fileUrl;

export default function ResumeParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl);
  const [textItems, setTextItems] = useState([]);

  const lines = groupTextItemsIntoLines(textItems || []);
  const sections = groupLinesIntoSections(lines);
  const resume = extractResumeFromSections(sections);

  useEffect(() => {
    async function test() {
      const { readPdf } = await import("../../lib/parse-resume-from-pdf/read-pdf");
      const textItems = await readPdf(fileUrl);
      setTextItems(textItems);
    }
    test();
  }, [fileUrl]);

  return (
    <main style={{ width: "100%", overflow: "hidden" }}>
    <Header />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: 1, padding: "1rem" }}>
          <section style={{ maxWidth: 650, marginLeft: "40px"}}>
            <div style={{ aspectRatio: "7 / 9.5" }}>
              <iframe
                src={`${fileUrl}#navpanes=0`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </section>
        </div>

        <div style={{ flex: 1, padding: "1rem", overflowY: "auto" }}>
          <section style={{ maxWidth: 600 }}>
            <Heading>ARS Parser Playground</Heading>
            <Paragraph smallMarginTop={true}>
              This playground showcases the AI Resume Scanner resume parser and its
              ability to parse information from a resume PDF.
            </Paragraph>

            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              {RESUME_EXAMPLES.map((example, idx) => (
                <article
                  key={idx}
                  onClick={() => setFileUrl(example.fileUrl)}
                  tabIndex={0}
                  style={{
                    flex: 1,
                    border:
                      example.fileUrl === fileUrl
                        ? "2px solid blue"
                        : "2px solid gray",
                    padding: "1rem",
                    cursor: "pointer",
                    borderRadius: "6px",
                  }}
                >
                  <h1 style={{ fontWeight: "600" }}>Resume Example {idx + 1}</h1>
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.9rem",
                      color: "#666",
                    }}
                  >
                    {example.description}
                  </p>
                </article>
              ))}
            </div>

            <Paragraph>
              You can also <strong>add your resume below</strong> to test how
              well your resume can be parsed by ARS.
            </Paragraph>

            <div style={{ marginTop: "1rem" }}>
              <ResumeDropzone
                onFileUrlChange={(url) => setFileUrl(url || defaultFileUrl)}
                playgroundView={true}
              />
            </div>

            <Heading level={2}>Resume Parsing Results</Heading>
            <ResumeTable resume={resume} />
            <ResumeParserAlgorithmArticle
              textItems={textItems}
              lines={lines}
              sections={sections}
            />

            <div style={{ paddingTop: "6rem" }} />
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
