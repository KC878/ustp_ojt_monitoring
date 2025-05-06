import React, { useEffect, useRef } from 'react';
import { Logs } from '../utils/interfaces';

interface PDFLogsProps {
  name: string;
  logs: Logs[];
}

const PDFLogs: React.FC<PDFLogsProps> = ({ name, logs }) => {
  const hasPrinted = useRef(false);

  useEffect(() => {
    if (hasPrinted.current) return; // Prevent multiple runs
    hasPrinted.current = true;

    const newWindow = window.open('', '_blank', 'width=800,height=1000');
    if (newWindow) {
      const doc = newWindow.document;
      doc.write(`
        <html>
          <head>
            <title>Daily Attendance Logs</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
            <style>
              * {
                box-sizing: border-box;
              }
              body {
                font-family: Arial, sans-serif;
                padding: 10px;
                max-width: 100%;
                margin: 0;
                font-size: 8px;
              }
              h2 {
                margin-bottom: 5px;
              }
              .header-logo {
                width: 100px;
                height: auto;
                margin-bottom: 10px;
              }
              .header-section {
                text-align: center;
                margin-bottom: 20px;
              }
              p.email {
                font-size: 14px;
                margin-bottom: 20px;
                color: #555;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
                word-wrap: break-word;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #ccc;
                padding: 4px;
                text-align: center;
                font-size: 11px;
              }
              th {
                background-color: #f2f2f2;
              }
              .signature-section {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                page-break-inside: avoid;
                break-inside: avoid;
              }
              .signature-box {
                width: 45%;
                text-align: center;
              }
              .signature-line {
                border-bottom: 1px solid #000;
                height: 30px;
                margin-bottom: 5px;
              }
              .signature-label {
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div id="pdf-content">
              <div class="header-section">
                <img class="header-logo" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png" alt="Logo" />
                <h2>Daily Attendance Logs</h2>
                <p class="email">Email: ${name}</p>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  ${logs.map((log) => `
                    <tr>
                      <td>${log.createdAt.slice(0, 10)}</td>
                      <td>${log.timeIn || '-'}</td>
                      <td>${log.timeOut || '-'}</td>
                      <td>${log.renderedTime}</td>
                    </tr>`).join('')}
                </tbody>
              </table>

              <div class="signature-section">
                <div class="signature-box">
                  <div class="signature-label"></div>
                  <div class="signature-line"></div>
                  <div class="signature-label">Supervisor's Signature</div>
                </div>
                <div class="signature-box">
                  <div class="signature-label">${name}</div>
                  <div class="signature-line"></div>
                  <div class="signature-label">Student's Signature</div>
                </div>
              </div>
            </div>

            <script>
              window.onload = function () {
                const element = document.getElementById('pdf-content');
                const opt = {
                  margin: [0.3, 0.5, 0.5, 0.5],
                  filename: '${name.replace(/\s+/g, "_")}_attendance.pdf',
                  image: { type: 'jpeg', quality: 0.98 },
                  html2canvas: {
                    scale: 2,
                    useCORS: true,
                    scrollY: 0
                  },
                  jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait'
                  },
                  pagebreak: {
                    mode: ['avoid-all', 'css', 'legacy']
                  }
                };
                html2pdf().set(opt).from(element).save();
              };
            </script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [name, logs]);

  return null;
};

export default PDFLogs;
