import React from 'react'
import BalanceReportHeader from '../GlobalComponentReport/BalanceReportHeader'
import BalanceSheetWebTable from './BalanceSheetWebTable'
const BalanceSheetWebView = ({tableData,endDate,startDate}) => {
  return (
    <>
    <BalanceReportHeader startDate={startDate} endDate={endDate}/>
    <BalanceSheetWebTable  tableData={tableData}/>
    <div>
      <p className='font-inter'>Notes : </p>
      <p className='font-inter font-[500]'>Powered By Onviro Tech</p>
    </div>
    </>
  )
}

export default BalanceSheetWebView