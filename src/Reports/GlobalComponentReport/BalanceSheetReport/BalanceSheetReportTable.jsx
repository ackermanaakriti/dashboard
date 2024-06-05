// import React, { useEffect, useState } from 'react';
// import '../../Report.css'
// import { MdChevronLeft } from "react-icons/md";
// import { MdChevronRight } from "react-icons/md";



// const BalanceSheetTable = ({ tableData }) => {
//   console.log(tableData)
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [headers, setHeaders] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(8); // You can change this to your desired rows per page

// // const dataKeywithObject = Object.keys(datakeyObj)
// // console.log(dataKeywithObject)
// // console.log(datakeyObj[dataKeywithObject])


//   useEffect(() => {
//     if (!tableData || tableData.length === 0) {
//       return;
//     } else {
//       const keys = Object.keys(tableData[0]);
//       console.log(tableData)
      
//       const keyData = keys.map(key => tableData[0][key]);
//       console.log(keyData);
 
// setData(keyData)



   
//       // const keys = Object.keys(datakeyObj);

//       //  const values = Object.values(datakeyObj);
//       //  console.log(values,keys)
//       //  setData(values)
//       //  console.log(values)
    
//       // const headers = Object.keys(tableData[0]);
//       // setHeaders(headers);
//       // setData(tableData);
//       // setLoading(false);
//     }
//   }, [currentPage]);
//   console.log(data)

//   //Calculate the current data to display based on pagination
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

//   const totalPages = Math.ceil(data.length / rowsPerPage);

//   const handleNextPage = () => {
//     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
//   };

//   const handlePrevPage = () => {
//     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
//   };
  
//   return (
//     <div>
//       <div className="h-[400px] w-[100%] mt-[10px]">
//         <table className="w-[100%] bg-white text-[14px] font-inter">
//           <thead>
//             {/* <tr>
//               {headers?.map((header) => (
//                 <th key={header} className="px-4 py-2 border bg-[#ddd]">
//                   {header}
//                 </th>
//               ))}
//             </tr> */}
//             <tr>
//               <th>Fiscal Year Name</th>
//             </tr>
//           </thead>
//           <tbody>
           
//             {/* {currentData?.map((row, rowIndex) => (
//               <tr key={rowIndex}>
//                 {headers?.map((header) => (
//                   <td key={header} className="px-4 py-2 border table-rowdata hyphens-auto">
//                     {row[header]}
//                   </td>
//                 ))}
//               </tr>
//             ))} */}
//       {data.map((item)=>
//       (
//         <tr>
//           {item.map((its)=>
//           (
//             <td>{its.fiscalYearName}</td>
//           ))}
//         </tr>
//       ))}
            
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center pt-[50px] gap-[20px]">
//         <button 
//           onClick={handlePrevPage} 
//           disabled={currentPage === 1} 
//           className='bg-[#d1d0d0]'
//         >
//           <span className='text-[25px]  text-PrimaryColor'><MdChevronLeft/></span>
//         </button>
//         <button 
//           onClick={handleNextPage} 
//           disabled={currentPage === totalPages} 
//           className='bg-[#d1d0d0]'
//         >
//            <span className='text-[25px] text-PrimaryColor'><MdChevronRight/></span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BalanceSheetTable;

import React,{useState} from 'react'
import '../../Report.css'
 const data = [
  {
    assets: [
      {
        id: 0,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
        transactionDate: '2024-04-24T11:32:41.3934948',
        voucherDetailId: 1,
        chartOfAccountId: 1,
        chartOfAccountAccountName: 'Liabilities',
        chartOfAccountMainParentId: 2,
        chequeNumber: 'dfdsfg',
        debitAmount: 56,
        creditAmount: 50,
        voucherDetailNarration: 'erewewr',
        exchangeRate: 50.2,
        currencyId: 1,
        currencyName: 'gfdgfd',
      },
    ],
    liabilitiesEquity: [
      {
        id: 1,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500, debitAmount: 56,
        creditAmount: 50,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
        chartOfAccountAccountName: 'Liabilities',
        debitAmount: 56,
        creditAmount: 50,
       
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001', debitAmount: 56,
        creditAmount: 50,
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        chartOfAccountAccountName: 'Liabilities',
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current', debitAmount: 56,
        creditAmount: 50,
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        chartOfAccountAccountName: 'Liabilities',
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current', debitAmount: 56,
        creditAmount: 50,
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
     
   
      
    ],
    Equity:[
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }
      ,
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }
      ,
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }
    ]
  },
];

const BalanceSheetTable = () => {

  console.log(data)
  const headers = new Set();

  data.forEach((item) =>
    Object.keys(item).forEach((key) => {
      item[key].forEach((entry) => {
        Object.keys(entry).forEach((header) => headers.add(header));
      });
    })
  );



  const headersArray = Array.from(headers);
  return (
    <>
    <div className='report-webtable-container'>
    <table className='report-webtable font-inter' border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr className='bg-[#dad8d8]'>
         
          <th>ChartofAccount Name</th>
          <th>Voucher Number</th>
          <th>Transaction Date</th>
          <th>Debit Amount</th>
          <th>Credit Amount</th>
        
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
       
          const totalDebitAssets = item.assets.reduce((sum, asset) => sum + parseFloat(asset.debitAmount || 0), 0);
          const totalCreditAssets = item.assets.reduce((sum, asset) => sum + parseFloat(asset.creditAmount || 0), 0);
      
          const totalDebitEquityy = item.Equity.reduce((sum, asset) => sum + parseFloat(asset.debitAmount || 0), 0);
          const totalCreditEquityy = item.Equity.reduce((sum, asset) => sum + parseFloat(asset.creditAmount || 0), 0);
     
       console.log(item.liabilitiesEquity)
          const totalDebitEquity = item.liabilitiesEquity.reduce((sum, asset) => sum + parseFloat(asset.debitAmount || 0), 0);
          const totalCreditEquity = item.liabilitiesEquity.reduce((sum, asset) => sum + parseFloat(asset.creditAmount || 0), 0);
     
          return (
          <React.Fragment key={index}>
            <tr>
              <td style={{fontSize:'18px', borderRight:'none',fontWeight:'600'}}>Assets</td>
              <td colSpan="8"></td>
            </tr>
            {item.assets.map((asset) => (
              <tr key={asset.id}>
               
                <td>{asset.chartOfAccountAccountName}</td>
                <td>{asset.voucherNumber}</td>
                <td>{asset.transactionDateBS}</td>
                <td>{asset.debitAmount}</td>
                <td>{asset.creditAmount}</td>
                
              </tr>
              
            ))}
             <tr className='bg-[#f5f4f2]'>
              <td  colspan="3">Total</td>
             
              <td>{totalDebitAssets}</td>
              <td>{totalCreditAssets}</td>
            </tr>
            <tr>
              <td style={{fontSize:'18px', borderRight:'none',fontWeight:'600'}}>Liabilities Equity</td>
              <td colSpan="8"></td>
            </tr>
            {item?.liabilitiesEquity.map((liability) => (
              <tr key={liability.id}>
               <td>{liability.chartOfAccountAccountName}</td>
                <td>{liability.voucherNumber}</td>
                <td>{liability.transactionDateBS}</td>
                <td>{liability.debitAmount}</td>
                <td>{liability.creditAmount}</td>
              </tr>
        ))}
            <tr className='bg-[#f5f4f2]'>
              <td colspan="3">Total</td>
             
              <td>{totalDebitEquity}</td>
              <td>{totalCreditEquity}</td>
            </tr>
             <tr>
              <td style={{fontSize:'18px', borderRight:'none',fontWeight:'600'}}>Equity</td>
              <td colSpan="8"></td>
            </tr>
            {item.Equity.map((Equity) => (
              <tr key={Equity.id}>
               <td>{Equity.chartOfAccountAccountName}</td>
                <td>{Equity.voucherNumber}</td>
                <td>{Equity.transactionDateBS}</td>
                <td>{Equity.debitAmount}</td>
                <td>{Equity.creditAmount}</td>
              </tr>
            ))}
             <tr className='bg-[#f5f4f2]'>
              <td colspan="3">Total</td>
             
              <td>{totalDebitEquityy}</td>
              <td>{totalCreditEquityy}</td>
            </tr>
          </React.Fragment>
          )
})}
      </tbody>
    </table>
    
    </div></>
  )
}

export default BalanceSheetTable