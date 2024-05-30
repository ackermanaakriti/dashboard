import React from 'react'
import BalanceReportHeader from './BalanceReportHeader'
import BalanceSheetTable from './BalanceSheetReportTable'

const WebView = ({tableData,endDate,startDate}) => {
  return (
    <>
    <BalanceReportHeader startDate={startDate} endDate={endDate}/>
    <BalanceSheetTable  tableData={tableData}/>
    <div>
      <p className='font-inter'>Notes : </p>
      <p className='font-inter font-[500]'>Powered By Onviro Tech</p>
    </div>
    </>
  )
}

export default WebView