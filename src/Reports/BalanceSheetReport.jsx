import React, { useState, useRef } from 'react';
import axios from 'axios';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { baseUrl } from '../Apis/Baseurl';
import ReportHeader from './GlobalComponentReport/ReportHeader';
import ReportTable from './GlobalComponentReport/ReportTable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import MyDocument from './GlobalComponentReport/Downloadformat';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver'
import WebView from './GlobalComponentReport/BalanceSheetReport/WebView';
import { useLayouData } from '../Context/MainLayoutContext';
import { FaRegFilePdf } from "react-icons/fa6";


const BalanceSheetReport = () => {
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [paperSize, setPaperSize] = useState('a4');
    const reportRef = useRef();
    const {token} = useLayouData()
    const [showWebView,setWebView]= useState(false)


    const fetchData = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}Module/GetAll`,
                {
                    // params: {
                    //     startDate: startDate,
                    //     endDate: endDate,
                    // },
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                }
            );
            setTableData(response.data.data);
            if(response.status === 200)
                {
                    setWebView(prevView => !prevView);
                }
        } catch (err) {
            console.log(err);
        }
    };

    const handleDownload = async () => {
        const blob = await pdf(<MyDocument startDate={startDate} endDate={endDate} tableData={tableData}/>).toBlob();
        saveAs(blob, 'myDocument.pdf');
      };

    return (
        <>
        <div className='pb-[50px]'>
            <div className='w-full pb-[20px] border-b-[1px] border-b-[#ddd] border-b-solid'>
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
                {showWebView &&   <WebView tableData={tableData} endDate={endDate} startDate={startDate}/>}
                </div>
             
                </div>
               

           
        </>
    );
};

export default BalanceSheetReport;
