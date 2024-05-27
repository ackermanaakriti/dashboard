// import React from 'react';
// import { jsPDF } from 'jspdf';
// import 'jspdf-autotable';

// function convertArrayOfObjectsToPDF(array) {
//   if (!array || array.length === 0) {
//     return null;
//   }
  
//   const doc = new jsPDF();
//   const tableColumn = Object.keys(array[0]);
//   const tableRows = array.map(item => Object.values(item));
//   const startY = doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 10;

//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: startY,
//     columnWidth: 'auto',
//   });

//   return doc;
// }

// export function downloadPDF(array,fileName) {
//   const pdf = convertArrayOfObjectsToPDF(array);
//   if (!pdf) {
//     console.error("No data available to export");
//     return;
//   }

// //   pdf.save("export.pdf");
// pdf.save(`${fileName}.pdf`)
// }

// const Export = ({ filteredItems,fileName }) => {
//   const handleExport = () => {
//     downloadPDF(filteredItems,fileName);
//   };

//   return (
//     <button className='bg-PrimaryColor text-white text-inter px-[12px] py-[5px]' onClick={handleExport}>Export</button>
//   );
// };

// export default Export;

import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function convertArrayOfObjectsToPDF(array) {
    if (!array || array.length === 0) {
      return null;
    }
    
    const doc = new jsPDF();
    const tableColumn = Object.keys(array[0]).slice(0, 7); // Selecting the first 7 keys
    const tableRows = array.map(item => {
      const selectedValues = [];
      tableColumn.forEach(key => {
        selectedValues.push(item[key]);
      });
      return selectedValues;
    });
  
    // Calculate the startY position based on the header height
    const startY = doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 10;
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: startY,
    });
  
    return doc;
  }
  
export function downloadPDF(array,fileName) {
  const pdf = convertArrayOfObjectsToPDF(array);
  if (!pdf) {
    console.error("No data available to export");
    return;
  }
  pdf.save(`${fileName}.pdf`)
}

const Export = ({ filteredItems ,fileName}) => {
  const handleExport = () => {
    downloadPDF(filteredItems,fileName);
  };

  return (
    <button className='bg-PrimaryColor text-white text-inter px-[12px] py-[5px]' onClick={handleExport}>Export</button>
  );
};

export default Export;

