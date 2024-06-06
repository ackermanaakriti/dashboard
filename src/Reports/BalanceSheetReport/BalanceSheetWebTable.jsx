
import React,{useState} from 'react'
import '../GlobalComponentReport/Report.css'

const BalanceSheetWebTable = ({tableData}) => {

  console.log(tableData)
  




  return (
    <>
    <div className='report-webtable-container'>
    <table className='report-webtable font-inter' border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr className='bg-[#dad8d8]'>
         
          <th>ChartofAccount Name</th>
         
          <th>Debit Amount</th>
          <th>Credit Amount</th>
        
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => {
       
          const totalDebitAssets = item.assets.reduce((sum, asset) => sum + parseFloat(asset.debitAmount || 0), 0);
          const totalCreditAssets = item.assets.reduce((sum, asset) => sum + parseFloat(asset.creditAmount || 0), 0);
      
          const totalDebitEquityy = item.capital.reduce((sum, asset) => sum + parseFloat(asset.debitAmount || 0), 0);
          const totalCreditEquityy = item.capital.reduce((sum, asset) => sum + parseFloat(asset.creditAmount || 0), 0);
     
       
          const totalDebitEquity = item.liabilities.reduce((sum, asset) => sum + parseFloat(asset.debitAmount || 0), 0);
          const totalCreditEquity = item.liabilities.reduce((sum, asset) => sum + parseFloat(asset.creditAmount || 0), 0);
     
          return (
          <React.Fragment key={index}>
            <tr>
              <td style={{fontSize:'18px', borderRight:'none',fontWeight:'600'}}>Assets</td>
              <td colSpan="8"></td>
            </tr>
            {item.assets.map((asset) => (
              <tr key={asset.id}>
               
                <td>{asset.chartOfAccountAccountName}</td>
               
                <td>{asset.debitAmount}</td>
                <td>{asset.creditAmount}</td>
                
              </tr>
              
            ))}
             <tr className='bg-[#f5f4f2]'>
              <td  colspan="1">Total</td>
             
              <td>{totalDebitAssets}</td>
              <td>{totalCreditAssets}</td>
            </tr>
            <tr>
              <td style={{fontSize:'18px', borderRight:'none',fontWeight:'600'}}>Liabilities Equity</td>
              <td colSpan="8"></td>
            </tr>
            {item?.liabilities.map((liability) => (
              <tr key={liability.id}>
               <td>{liability.chartOfAccountAccountName}</td>
               
                <td>{liability.debitAmount}</td>
                <td>{liability.creditAmount}</td>
              </tr>
        ))}
            <tr className='bg-[#f5f4f2]'>
              <td colspan="1">Total</td>
             
              <td>{totalDebitEquity}</td>
              <td>{totalCreditEquity}</td>
            </tr>
             <tr>
              <td style={{fontSize:'18px', borderRight:'none',fontWeight:'600'}}>Equity</td>
              <td colSpan="8"></td>
            </tr>
            {item.capital.map((Equity) => (
              <tr key={Equity.id}>
               <td>{Equity.chartOfAccountAccountName}</td>
                
                <td>{Equity.debitAmount}</td>
                <td>{Equity.creditAmount}</td>
              </tr>
            ))}
             <tr className='bg-[#f5f4f2]'>
              <td colspan="1">Total</td>
             
              <td>{totalDebitEquityy}</td>
              <td>{totalCreditEquityy}</td>
            </tr>
          </React.Fragment>
          )
})}
      </tbody>
    </table>
    
    </div></>
  )
}

export default BalanceSheetWebTable