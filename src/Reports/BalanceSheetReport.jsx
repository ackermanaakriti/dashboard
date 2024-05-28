import React, { useState, useRef } from 'react';
import ReportHeader from './GlobalComponentReport/ReportHeader';
import ReportTable from './GlobalComponentReport/ReportTable';
import axios from 'axios';
import { baseUrl } from '../Apis/Baseurl';
import Downloadformat from './GlobalComponentReport/Downloadformat';


const BalanceSheetReport = () => {
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const reportRef = useRef();

    const fetchData = async () => {
        console.log(startDate, endDate);
        try {
            const response = await axios.get(
                `${baseUrl}Ledger/GetAll`,
                {
                    params: {
                        startDate: startDate,
                        endDate: endDate,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            console.log(response.data.data);
            const assets = response.data.data.map(item => item.assets);
            console.log(assets);
            const liabilitiesEquity = response.data.data.map(item => item.liabilitiesEquity);
            console.log(liabilitiesEquity);
            const flattenedAssets = assets.length > 0 ? assets[0] : {};
            const flattenedLiabilitiesEquity = liabilitiesEquity.length > 0 ? liabilitiesEquity[0] : {};
            console.log('Flattened Assets:', flattenedAssets);
            setTableData(response.data.data);
            console.log('Flattened Liabilities and Equity:', flattenedLiabilitiesEquity);
        } catch (err) {
            console.log(err);
        }
    };

   

    
   

    return (
        <>
            <div className='w-full' >
            <div className='flex justify-center items-center h-full'>
    <h2 className='text-inter text-PrimaryColor text-[30px]'>Balance Sheet Report</h2>
    </div>
              
                <div className='flex justify-between items-center mb-[20px] '>
                    <div className='flex gap-[50px]'>
                        <div>
                            <label className='block py-[5px] font-[500] font-inter'>Start Date</label>
                            <input className='border-[1px] py-[5px] px-[12px] outline-none border-borderclr' type='date' onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <label className='block py-[5px] font-[500] font-inter'>End Date</label>
                            <input className='border-[1px] py-[5px] px-[12px] outline-none border-borderclr' type='date' onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <div onClick={() => fetchData()} className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter cursor-pointer"> Create Report</div>
                    </div>
                </div>
                <div>
                <Downloadformat reportRef={reportRef} tableData={tableData}/>
            </div>
                <div ref={reportRef} className='pdf-content'  >
                    <div className='mx-[20px] w-[100%]' >
                <ReportHeader  header='Balance Sheet Report' Company='Onviro Tech' startDate={startDate} endDate={endDate} />
                <div className='mt-[20px] w-[100%]' >
                <ReportTable tableData={tableData} reportRef={reportRef}  />
                </div>
                </div>
                <div className='p-[20px]'>
                    Report Footer
                </div>
                </div>
            </div>
            
        </>
    );
};

export default BalanceSheetReport;
