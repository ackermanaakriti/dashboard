
import React, { useEffect, useState } from 'react';
import '../Report.css'


const ReportTable = ({tableData,reportRef}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headers,setHeaders]= useState([])

  console.log(tableData)
 

useEffect(()=>
{
  
  if (!tableData || tableData.length === 0) {
    console.log('hello')
    return;
  }

else 
{
  const headers = Object.keys(tableData[0]);
  console.log(headers)
  setHeaders(headers)
}
},[tableData])

  
  // Get the table headers from the keys of the first object in the data array
 

  return (
    <div>
    <div className="  h-[400px] w-[100%]  ">
    <table className=" w-[100%]  bg-white text-[14px] font-courier">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-2 border ">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td  key={header} className="px-4 py-2 border table-rowdata hyphens-auto ">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
 
</div>

  );
};

export default ReportTable;
