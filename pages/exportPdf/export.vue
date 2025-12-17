<script setup lang="ts">
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Helper: convert PNG URL to base64
async function getImageBase64(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

const exportHtmlWithMultipleLogos = async () => {
  if (!process.client) return;

  const element = document.getElementById("pdf-content");
  if (!element) return;

  // Capture HTML content
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL("image/png");

  const doc = new jsPDF("p", "mm", "a4");
  const pdfWidth = doc.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  const pageHeight = doc.internal.pageSize.getHeight();
  let remainingHeight = pdfHeight;
  let position = 0;

  // Add HTML content, split across pages if needed
  while (remainingHeight > 0) {
    const h = Math.min(remainingHeight, pageHeight);
    doc.addImage(imgData, "PNG", 0, position, pdfWidth, h);
    remainingHeight -= h;
    position -= pageHeight;
    if (remainingHeight > 0) doc.addPage();
  }

  // Load logo as base64
  const logoBase64 = await getImageBase64("/ldb-logo.png");

  // Logo size
  const logoWidth = 40;
  const logoHeight = 40;
  const logoSpacing = 10; // spacing between logos
  const numberOfLogos = 5; // how many logos in a row

  // Position logos at bottom of last page
  const totalWidth =
    numberOfLogos * logoWidth + (numberOfLogos - 1) * logoSpacing;
  const startX = (pdfWidth - totalWidth) / 2; // center row
  const logoY = pageHeight - logoHeight - 10; // 10mm from bottom

  doc.setPage(doc.getNumberOfPages());

  for (let i = 0; i < numberOfLogos; i++) {
    const logoX = startX + i * (logoWidth + logoSpacing);
    doc.addImage(
      logoBase64,
      "PNG",
      logoX,
      logoY,
      logoWidth,
      logoHeight,
      undefined,
      "FAST"
    );
  }

  doc.save("document.pdf");
};
</script>

<template>
  <div>
    <div id="pdf-content">
      <h1>Report</h1>
      <p>Some content...</p>
    </div>
    <h1>Export Page + Watermark</h1>

    <!-- Upload Logo Watermark -->

    <!-- Area to convert -->
    <v-btn color="success" @click="exportHtmlWithMultipleLogos">export</v-btn>
    <div
      ref="previewRef"
      style="padding: 20px; background: #fff; margin-top: 20px"
    >
      <h2>Invoice Example</h2>
      <p>This content will be exported to PDF and watermarked.</p>
    </div>
  </div>
</template>
