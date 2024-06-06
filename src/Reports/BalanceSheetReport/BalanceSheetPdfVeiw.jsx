import React from 'react';
import { View, Text, StyleSheet, Document,Page } from '@react-pdf/renderer';
import ReportFooter from '../GlobalComponentReport/ReportFooter';
import ReportHeader from '../GlobalComponentReport/ReportHeaderPdf';

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
const BalanceSheetPdfView = ({ tableData,endDate,startDate }) => {
    if (!tableData || tableData.length === 0) {
      return <Text>No data available</Text>;
    }
  
    return (
        <Document>
            <Page style={styles.page}>
            <ReportHeader endDate={endDate} startDate={startDate} name='Balance Sheet Report' />
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader} fixed>
          <Text style={[styles.tableCellHeader, { width: '20%' }]}>Chart of Account</Text>
          <Text style={[styles.tableCellHeader, { width: '20%' }]}>Voucher Number</Text>
          <Text style={[styles.tableCellHeader, { width: '30%' }]}>Transaction Date</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Debit Amount</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Credit Amount</Text>
        </View>
        {tableData.map((item, rowIndex) => {
          const totalDebitQuity = item.capital.reduce((sum, capital) => sum + parseFloat(capital.debitAmount), 0);
          const totalCreditEquity = item.capital.reduce((sum, capital) => sum + parseFloat(capital.creditAmount), 0);
          const totalDebitLiability = item.liabilities.reduce((sum, liability) => sum + parseFloat(liability.debitAmount), 0);
          const totalCreditLiability = item.liabilities.reduce((sum, liability) => sum + parseFloat(liability.creditAmount), 0);
          const totalDebitAssest = item.assets.reduce((sum, asset) => sum + parseFloat(asset.debitAmount), 0);
          const totalCreditAssest = item.assets.reduce((sum, asset) => sum + parseFloat(asset.creditAmount), 0);
  
          return (
            <React.Fragment key={rowIndex}>
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid' }]}>
                <Text style={{ fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Asset</Text>
              </View>
              {item.assets.map((asset, assetIndex) => (
                <View key={assetIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{asset.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{asset.voucherNumber}</Text>
                  <Text style={[styles.tableCell, { width: '30%' }]}>{asset.transactionDateBS}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{asset.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '15%', borderRight: 'none' }]}>{asset.creditAmount}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '70%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalDebitAssest}</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalCreditAssest}</Text>
              </View>
  
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid' }]}>
                <Text style={{ fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Liability</Text>
              </View>
              {item.liabilities.map((liability, liabilityIndex) => (
                <View key={liabilityIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{liability.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{liability.voucherNumber}</Text>
                  <Text style={[styles.tableCell, { width: '30%' }]}>{liability.transactionDateBS}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{liability.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '15%', borderRight: 'none' }]}>{liability.creditAmount}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '70%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalDebitLiability}</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalCreditLiability}</Text>
              </View>
  
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid' }]}>
                <Text style={{ fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Equity</Text>
              </View>
              {item.capital.map((capital, capitalIndex) => (
                <View key={capitalIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{capital.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{capital.voucherNumber}</Text>
                  <Text style={[styles.tableCell, { width: '30%' }]}>{capital.transactionDateBS}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{capital.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '15%', borderRight: 'none' }]}>{capital.creditAmount}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '70%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalDebitQuity}</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalCreditEquity}</Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <ReportFooter/>
      </Page>
      </Document>
    );
  };
  
    


export default BalanceSheetPdfView;
