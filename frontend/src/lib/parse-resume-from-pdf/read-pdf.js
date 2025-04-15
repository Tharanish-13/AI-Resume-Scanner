let pdfjsLib = null;

export async function readPdf(fileUrl) {
  if (!pdfjsLib) {
    pdfjsLib = await import("pdfjs-dist");
    // Use the correct version of the worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
  }

  const loadingTask = pdfjsLib.getDocument(fileUrl);
  const pdf = await loadingTask.promise;

  const textItems = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();

    textContent.items.forEach((item) => {
      textItems.push({
        text: item.str,
        x: item.transform[4],
        y: item.transform[5],
        width: item.width,
        height: item.height,
        fontName: item.fontName,
        hasEOL: item.hasEOL || false,
      });
    });
  }

  return textItems;
}
