import React, { useEffect, useState } from 'react'
import BalanceReportHeader from '../GlobalComponentReport/BalanceReportHeader'

import GeneralLedgerTableWeb from './GeneralLedgerTableWeb'

const GeneralLedgerWebView = ({tableData,startDate,endDate}) => {


  
  return (
    <>
    
    <BalanceReportHeader startDate={startDate} endDate={endDate} name='General Ledger Statement Report'/>
 <GeneralLedgerTableWeb tableData={tableData} />
    
    
    <div className='pt-[20px]'>
      <p className='font-inter'>Notes : </p>
      <p className='font-inter font-[500]'>Powered By Onviro Tech</p>
    </div>
    </>
  )
}

export default GeneralLedgerWebView