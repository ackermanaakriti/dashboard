import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const data = [
  {
    assets: [
      {
        id: 0,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
        transactionDate: '2024-04-24T11:32:41.3934948',
        voucherDetailId: 1,
        chartOfAccountId: 1,
        chartOfAccountAccountName: 'Liabilities',
        chartOfAccountMainParentId: 2,
        chequeNumber: 'dfdsfg',
        debitAmount: 56,
        creditAmount: 50,
        voucherDetailNarration: 'erewewr',
        exchangeRate: 50.2,
        currencyId: 1,
        currencyName: 'gfdgfd',
      },
    ],
    liabilitiesEquity: [
      {
        id: 1,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500, debitAmount: 56,
        creditAmount: 50,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
        chartOfAccountAccountName: 'Liabilities',

      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001', debitAmount: 56,
        creditAmount: 50,
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        chartOfAccountAccountName: 'Liabilities',
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current', debitAmount: 56,
        creditAmount: 50,
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        chartOfAccountAccountName: 'Liabilities',
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current', debitAmount: 56,
        creditAmount: 50,
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25',
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }

      ,
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }

    ],
    Equity: [
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      },
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }
      ,
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }
      ,
      {
        id: 2,
        voucherId: 1,
        fiscalYearId: 1,
        fiscalYearName: 'current',
        voucherNumber: 'A001',
        voucherTypeId: 1,
        voucherTypeName: 'ewrew',
        transactionDateBS: '2080-01-25', debitAmount: 56,
        creditAmount: 50,
        voucherNarration: 'FREGF',
        moduleId: 1,
        moduleName: 'dfds',
        toTalAmount: 500,
        branchId: 1,
        branchName: 'dfsf',
        invoiceNumber: 'dss',
      }
    ]
  },
];

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  tableContainer: {
    display: 'table',
    width: 'auto',
   
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#bdbdbd',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderRightStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    borderBottomStyle: 'solid',
    borderRightColor: '#d9d9d9',
    borderRightWidth: 1,
    fontSize: 10,
    wordBreak: 'break-all',
    overflow: 'break-word',
    hyphens: 'auto'


  },
  tableCellHeader: {
    padding: 5,
    borderRightStyle: 'solid',

    borderRightColor: '#d9d9d9',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    borderBottomStyle: 'solid',
    fontSize: 10,
    fontWeight: 'bold',

    wordBreak: 'break-all',

  },
  amountCell:
  {
  borderLeftWidth:'1px',
  borderLeftStyle:'solid',
  borderLeftColor:'#d9d9d9',
  padding:'5px',
  fontSize: 10,

  },
 
});
const ReportTable = ({ tableData }) => {

  // const headers = new Set();
  // data.forEach((item) =>
  //   Object.keys(item).forEach((key) => {
  //     item[key].forEach((entry) => {
  //       Object.keys(entry).forEach((header) => headers.add(header));
  //     });
  //   })
  // );



  // const headersArray = Array.from(headers);
  if (!tableData || tableData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={styles.tableContainer}>
  <View style={styles.tableHeader} fixed>
    <Text style={[styles.tableCellHeader, { width: '20%' }]}>Chart of Account</Text>
    <Text style={[styles.tableCellHeader, { width: '20%' }]}>Voucher Number</Text>
    <Text style={[styles.tableCellHeader, { width: '30%' }]}>Transaction Date</Text>
    <Text style={[styles.tableCellHeader, { width: '15%' }]}>Debit Amount</Text>
    <Text style={[styles.tableCellHeader, { width: '15%' }]}>Credit Amount</Text>
  </View>
  {data.map((item, rowIndex) => {
      const totalDebitQuity = item.liabilitiesEquity.reduce((sum, asset) => sum + parseFloat(asset.debitAmount), 0);
      const totalCreditEquity = item.liabilitiesEquity.reduce((sum, asset) => sum + parseFloat(asset.creditAmount), 0);
      const totalDebitAssest = item.assets.reduce((sum, asset) => sum + parseFloat(asset.debitAmount), 0);
        const totalCreditAssest = item.assets.reduce((sum, asset) => sum + parseFloat(asset.creditAmount), 0);
    return(
    <>
    <View key={rowIndex} style={[styles.tableRow,{borderBottomWidth:'1px', borderBottomColor:'#d9d9d9',borderBottomStyle:'solid'}]}>
       <Text style={{fontSize:'12px' ,fontWeight:'bold',padding:'5px'}}>Assest</Text></View>
      {item.assets.map((asset, assetIndex) => {
        
        return (
        <> 
        <View key={assetIndex} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '20%' }]}>{asset.chartOfAccountAccountName}</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>{asset.voucherNumber}</Text>
          <Text style={[styles.tableCell, { width: '30%' }]}>{asset.transactionDateBS}</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>{asset.debitAmount}</Text>
          <Text style={[styles.tableCell, { width: '15%',borderRight:'none'}]}>{asset.creditAmount}</Text>
        </View>
        
        </>
        )
        
       
  })}
  <View key={rowIndex} style={[styles.tableRow,{borderBottomWidth:'1px', borderBottomColor:'#d9d9d9',borderBottomStyle:'solid',backgroundColor:'#f5f4f2'}]}>
       <Text style={{fontSize:'10px' ,fontWeight:'bold',padding:'5px',width:'70%'}}>Total</Text>
       
       <Text style={ [styles.amountCell,{ width: '15%'}]}>{totalDebitAssest}</Text>
       <Text style={[ styles.amountCell,{ width: '15%' }]}>{totalCreditAssest}</Text>
       </View>
      <View key={rowIndex} style={[styles.tableRow,{borderBottomWidth:'1px', borderBottomColor:'#d9d9d9',borderBottomStyle:'solid'}]}>
       <Text style={{fontSize:'12px' ,fontWeight:'bold',padding:'5px'}}>Equity</Text></View>
      {item.liabilitiesEquity.map((asset, assetIndex) => {
       
        return(
          <> 
        <View key={assetIndex} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '20%' }]}>{asset.chartOfAccountAccountName}</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>{asset.voucherNumber}</Text>
          <Text style={[styles.tableCell, { width: '30%' }]}>{asset.transactionDateBS}</Text>
          <Text style={[styles.tableCell, { width: '15%' }]}>{asset.debitAmount}</Text>
          <Text style={[styles.tableCell, { width: '15%',borderRight:'none'}]}>{asset.creditAmount}</Text>
        </View>
        
        </>
        )
       
  })}
  <View key={rowIndex} style={[styles.tableRow,{borderBottomWidth:'1px', borderBottomColor:'#d9d9d9',borderBottomStyle:'solid',backgroundColor:'#f5f4f2'}]}>
       <Text style={{fontSize:'10px' ,fontWeight:'bold',padding:'5px',width:'70%'}}>Total</Text>
       
       <Text style={ [styles.amountCell,{ width: '15%'}]}>{totalDebitQuity}</Text>
       <Text style={[ styles.amountCell,{ width: '15%' }]}>{totalCreditEquity}</Text>
       </View>

</>
)
})}
</View>

    //   <View style={styles.tableContainer}>
    //   <View style={styles.tableHeader} fixed>
    //     <Text style={[styles.tableCellHeader, styles.emptyHeaderCell]}></Text>
    //     {headersArray.map(header => (
    //       <Text style={[styles.tableCellHeader, styles.wideCell]} key={header}>{header}</Text>
    //     ))}
    //   </View>
    //   {data.map((item, idx) => (
    //     Object.keys(item).map(key => (
    //       <React.Fragment key={`${key}-${idx}`}>
    //         {item[key].map((entry, index) => (
    //           <View style={styles.tableRow} key={`${key}-${idx}-${index}`}>
    //             <Text style={[styles.tableCell, styles.emptyHeaderCell]}>{index === 0 ? key.charAt(0).toUpperCase() + key.slice(1) : ''}</Text>
    //             {headersArray.map(header => (
    //               <Text style={[styles.tableCell, styles.wideCell]} key={`${header}-${idx}-${index}`}>
    //                 {entry[header] !== undefined ? entry[header] : ''}
    //               </Text>
    //             ))}
    //           </View>
    //         ))}
    //       </React.Fragment>
    //     ))
    //   ))}
    // </View>
  );
};

export default ReportTable;
