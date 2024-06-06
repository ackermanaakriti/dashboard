import React, { useState, useRef } from 'react';
import axios from 'axios';
import { baseUrl } from '../../Apis/Baseurl';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver'
import { useLayouData } from '../../Context/MainLayoutContext';
import { FaRegFilePdf } from "react-icons/fa6";
import TrialBalancewebView from './TrialBalanceWebview';
import TrialBalancePdfView from './TrialBalancePdfView';


const TrialBalanceReportMain = () => {
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState('2081-08-05');
    const [endDate, setEndDate] = useState('2081-08-05');

    const {token} = useLayouData()
    const [showWebView,setWebView]= useState(false)


    const fetchData = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}Ledger/GenerateTrailBalanceReport`,{startDate,endDate},
                {   
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            console.log(response)
            setTableData(response.data.data);
            if(response.status === 200)
                {
                    setWebView(true);
                }
        } catch (err) {
            console.log(err);
        }
    };
    console.log(tableData)

    const handleDownload = async () => {
        const blob = await pdf(<TrialBalancePdfView startDate={startDate} endDate={endDate} tableData={tableData}/>).toBlob();
        saveAs(blob, 'myDocument.pdf');
      };

    return (
        <>
        <div className='pb-[50px]'>
            <div className='w-full pb-[20px] border-b-[1px] border-b-[#ddd] border-b-solid'>
                <div className='flex justify-center items-center h-full'>
                    <h2 className='text-inter text-PrimaryColor text-[30px]'>Trial Balance Report</h2>
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
                
                        
                <div className='flex justify-center items-center gap-[30px]'>
                    {showWebView && <div className='flex gap-[20px] items-center justify-center'> 
                        <span className='text-[20px] text-PrimaryColor'><FaRegFilePdf/></span>
                          <button onClick={handleDownload} className=' text-white bg-PrimaryColor px-[15px]  py-[4px] font-inter cursor-pointer'>Download PDF</button> </div>
}
                    <div onClick={() => { fetchData();  }} className="bg-PrimaryColor px-[15px] py-[4px] text-white font-inter cursor-pointer"> Create Report</div>

                </div>
                
                </div> 
                </div>
                <div className='pt-[20px]'>
                {showWebView &&   <TrialBalancewebView tableData={tableData} endDate={endDate} startDate={startDate}/>}
                </div>
             
                </div>
               

           
        </>
    );
};

export default TrialBalanceReportMain;
