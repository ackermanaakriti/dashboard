import React from 'react'
import BalanceReportHeader from './BalanceReportHeader'
import BalanceSheetTable from './BalanceSheetReportTable'

const WebView = ({tableData,endDate,startDate}) => {
  return (
    <>
    <BalanceReportHeader startDate={startDate} endDate={endDate}/>
    <BalanceSheetTable  tableData={tableData}/>
    </>
  )
}

export default WebView