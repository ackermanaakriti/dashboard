import React, { useEffect, useState } from 'react'
import BalanceReportHeader from '../GlobalComponentReport/BalanceReportHeader'
import axios from 'axios'
import { baseUrl } from '../../Apis/Baseurl'
import { useLayouData } from '../../Context/MainLayoutContext'
import IncomeReportTableWeb from './IncomeReportTableWeb'

const IncomeStatementWebView = ({tableData,startDate,endDate}) => {


  
  return (
    <>
    
    <BalanceReportHeader startDate={startDate} endDate={endDate} name='Income Statement Report'/>
    <IncomeReportTableWeb tableData={tableData}/>
    
    
    <div className='pt-[20px]'>
      <p className='font-inter'>Notes : </p>
      <p className='font-inter font-[500]'>Powered By Onviro Tech</p>
    </div>
    </>
  )
}

export default IncomeStatementWebView