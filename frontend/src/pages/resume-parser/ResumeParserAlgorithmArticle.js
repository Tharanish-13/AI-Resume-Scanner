import React from "react";
import { isBold } from "../../lib/parse-resume-from-pdf/extract-resume-from-sections/lib/common-features";
import { Badge, Heading, Link, Paragraph, Table } from "../../components/documentation";

export const ResumeParserAlgorithmArticle = ({ textItems, lines }) => {
  const getBadgeContent = (item) => {
    const X1 = Math.round(item.x);
    const X2 = Math.round(item.x + item.width);
    const Y = Math.round(item.y);
    let content = `X₁=${X1} X₂=${X2} Y=${Y}`;
    if (X1 === X2) content = `X=${X2} Y=${Y}`;
    if (isBold(item)) content += " Bold";
    if (item.hasEOL) content += " NewLine";
    return content;
  };

  const step1TextItemsTable = [
    ["#", "Text Content", "Metadata"],
    ...textItems.map((item, idx) => [
      idx + 1,
      item.text,
      <Badge key={idx}>{getBadgeContent(item)}</Badge>,
    ]),
  ];

  const step2LinesTable = [
    ["Lines", "Line Content"],
    ...lines.map((line, idx) => [
      idx + 1,
      line.map((item, i) => (
        <span key={i}>
          {item.text}
          {i !== line.length - 1 && (
            <span style={{ fontWeight: "bold", color: "#0ea5e9", userSelect: "none" }}>
              &nbsp;&nbsp;|&nbsp;&nbsp;
            </span>
          )}
        </span>
      )),
    ]),
  ];

  return (
    <article style={{ marginTop: "2.5rem" }}>
      <Heading>Resume Parser Algorithm Deep Dive</Heading>
      <Paragraph smallMarginTop={true}>
        This section explains how the AI Resume parser works. It&rsquo;s built for single-column, English-language resumes.
      </Paragraph>

      <Heading level={2}>Step 1. Read the text items from a PDF file</Heading>
      <Paragraph smallMarginTop={true}>
        Resume Editor Using AI Resume Scanner <Link href="https://github.com/Tharanish-13/AI-Resume-Scanner">upload.js</Link> to extract text items.
      </Paragraph>
      <Paragraph>
        {textItems.length} text items were extracted, including metadata like x, y position, boldness, and newline status.
      </Paragraph>
      <div style={{ marginTop: "1rem", maxHeight: "280px", overflowY: "auto", border: "1px solid #eee" }}>
        <Table table={step1TextItemsTable} tdClassNames={["", "", ""]} />
      </div>

      <Heading level={2}>Step 2. Group text items into lines</Heading>
      <Paragraph smallMarginTop={true}>
        Text items are combined into lines using spacing heuristics based on character widths.
      </Paragraph>
      <Paragraph>
        {lines.length} lines were formed. Multiple text items in a line are separated by blue dividers.
      </Paragraph>
      <div style={{ marginTop: "1rem", maxHeight: "400px", overflowY: "auto", border: "1px solid #eee" }}>
        <Table table={step2LinesTable} />
      </div>
    </article>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => null;
