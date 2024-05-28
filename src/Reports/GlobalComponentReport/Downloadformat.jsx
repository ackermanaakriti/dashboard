import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { HiOutlineDownload } from 'react-icons/hi';

const Downloadformat = ({ reportRef, tableData }) => {
  const [paperSize, setPaperSize] = useState('a4');

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scrollY: -window.scrollY }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF(paperSize, 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      let pdfWidth, pdfHeight;

      if (paperSize === 'a4') {
        pdfWidth = 210;
        pdfHeight = 297;
      } else {
        pdfWidth = 297;
        pdfHeight = 420;
      }

      const scaleFactor = Math.min(pdfWidth / imgProps.width, pdfHeight / imgProps.height);

      const scaledWidth = imgProps.width * scaleFactor;
      const scaledHeight = imgProps.height * scaleFactor;

      pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
      pdf.save('balance_sheet_report.pdf');
    });
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'BalanceSheet');
    XLSX.writeFile(wb, 'balance_sheet_report.xlsx');
  };

  const handleDownload = (format) => {
    if (format === 'pdf') {
      downloadPDF();
    } else if (format === 'excel') {
      downloadExcel();
    }
  };

  return (
    <div className="flex justify-end items-center pt-[20px]">
      <select
        className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter cursor-pointer mr-4"
        onChange={e => handleDownload(e.target.value)}
      >
        <option value="">Download as</option>
        <option value="pdf">PDF</option>
        <option value="excel">Excel</option>
      </select>
    </div>
  );
};

export default Downloadformat;
