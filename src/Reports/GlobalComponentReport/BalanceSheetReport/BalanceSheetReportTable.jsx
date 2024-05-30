import React, { useEffect, useState } from 'react';
import '../../Report.css'
import { MdChevronLeft } from "react-icons/md";
import { MdChevronRight } from "react-icons/md";



const BalanceSheetTable = ({ tableData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headers, setHeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8); // You can change this to your desired rows per page
console.log(tableData)
  useEffect(() => {
    if (!tableData || tableData.length === 0) {
      return;
    } else {
      const headers = Object.keys(tableData[0]);
      setHeaders(headers);
      setData(tableData);
      setLoading(false);
    }
  }, [tableData]);

  //Calculate the current data to display based on pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  
  return (
    <div>
      <div className="h-[400px] w-[100%] mt-[10px]">
        <table className="w-[100%] bg-white text-[14px] font-inter">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-2 border bg-[#ddd]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header) => (
                  <td key={header} className="px-4 py-2 border table-rowdata hyphens-auto">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center pt-[50px] gap-[20px]">
        <button 
          onClick={handlePrevPage} 
          disabled={currentPage === 1} 
          className='bg-[#d1d0d0]'
        >
          <span className='text-[25px]  text-PrimaryColor'><MdChevronLeft/></span>
        </button>
        <button 
          onClick={handleNextPage} 
          disabled={currentPage === totalPages} 
          className='bg-[#d1d0d0]'
        >
           <span className='text-[25px] text-PrimaryColor'><MdChevronRight/></span>
        </button>
      </div>
    </div>
  );
};

export default BalanceSheetTable;
