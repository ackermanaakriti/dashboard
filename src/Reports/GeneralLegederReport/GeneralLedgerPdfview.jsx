import React from 'react';
import { View, Text, StyleSheet , Document, Page,} from '@react-pdf/renderer';
import ReportHeader from '../GlobalComponentReport/ReportHeaderPdf';
import ReportFooter from '../GlobalComponentReport/ReportFooter';

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
    borderRightColor: '#d9d9d9',
    borderRightWidth: 1,
    fontSize: 10,
    wordBreak: 'break-all',
    overflow: 'break-word',
    hyphens: 'auto',
  },
  tableCellHeader: {
    padding: 5,
    borderRightStyle: 'solid',
    borderRightColor: '#d9d9d9',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    fontSize: 10,
    fontWeight: 'bold',
    wordBreak: 'break-all',
  },
  amountCell: {
    borderLeftWidth: '1px',
    borderLeftStyle: 'solid',
    borderLeftColor: '#d9d9d9',
    padding: '5px',
    fontSize: 10,
  },
});

const GeneralLedgerPdfView = ({ tableData, endDate, startDate }) => {
    const totalDebit = tableData?.reduce((sum, items) => sum + parseFloat(items?.debitAmount), 0);
    const totalCredit = tableData?.reduce((sum, items) => sum + parseFloat(items?.creditAmount), 0);
    
  if (!tableData || tableData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <>
     <Document>
    <Page size="A4" style={styles.page}>
      <ReportHeader endDate={endDate} startDate={startDate} name='General Ledger Report' />
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader} fixed>
          <Text style={[styles.tableCellHeader, { width: '50%' }]}>Chart of Account</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Debit Amount</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Credit Amount</Text>
        </View>
        {tableData.map((item, rowIndex) => {
        

          return (
            <React.Fragment key={rowIndex}>
           
                <View key={rowIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '50%' }]}>{item.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '25%' }]}>{item.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '25%', borderRight: 'none' }]}>{item.creditAmount}</Text>
                </View>
             
              
              
          
            </React.Fragment>
          );
        })}
        <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '50%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '25%' }]}>{totalDebit}</Text>
                <Text style={[styles.amountCell, { width: '25%' }]}>{totalCredit}</Text>
              </View>
      </View>
      <ReportFooter />
      </Page>
      </Document>
    </>
  );
};

export default GeneralLedgerPdfView;
