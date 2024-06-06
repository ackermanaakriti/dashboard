import React from 'react'
import BalanceReportHeader from '../GlobalComponentReport/BalanceReportHeader'
import { WebReportTableTree } from './WebViewTreeTable'

const TreeReportWebView = ({endDate,startDate}) => {
  return (
    <>
  
    <BalanceReportHeader startDate={startDate} endDate={endDate}/>
    <WebReportTableTree/>
    <div>
      <p className='font-inter'>Notes : </p>
      <p className='font-inter font-[500]'>Powered By Onviro Tech</p>
    </div>
    </>
  )
}

export default TreeReportWebView