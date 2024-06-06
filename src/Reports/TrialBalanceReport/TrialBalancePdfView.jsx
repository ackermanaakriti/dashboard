import React,{useState,useEffect} from 'react';
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

const TrialBalancePdfView = ({ tableData, endDate, startDate }) => {
    const totalDebit = tableData?.reduce((sum, items) => sum + parseFloat(items?.debitAmount), 0);
    const totalCredit = tableData?.reduce((sum, items) => sum + parseFloat(items?.creditAmount), 0);
    const [balances, setBalances] = useState([]);
    const [sortedTableData, setSortedTableData] = useState([]);



    useEffect(() => {
        const formattedData = tableData.map(item => ({
            ...item,
            formattedDate: item.transactionDateBS.split('T')[0]
        })).sort((a, b) => new Date(a.formattedDate) - new Date(b.formattedDate));

        setSortedTableData(formattedData);

        let balance = 0;
        const newBalances = tableData?.map((item) => {
            balance = balance - parseFloat(item.debitAmount || 0) + parseFloat(item.creditAmount || 0);
            return balance;
        });
        setBalances(newBalances);
    }, [tableData]);

    
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
          
          <Text style={[styles.tableCellHeader, { width: '10%' }]}>Voucher Number</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Transaction Date</Text>
          <Text style={[styles.tableCellHeader, { width: '20%' }]}>Chart of Account</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Debit Amount</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Credit Amount</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Balance</Text>
        </View>
        {sortedTableData.map((item, rowIndex) => {
        

          return (
            <React.Fragment key={rowIndex}>
           
                <View key={rowIndex} style={styles.tableRow}>
                 
                  <Text style={[styles.tableCell, { width: '10%', borderRight: 'none' }]}>{item.voucherNumber}</Text>
             
                  <Text style={[styles.tableCell, { width: '25%', borderRight: 'none' }]}>{item.transactionDateBS}</Text>
                  <Text style={[styles.tableCell, { width: '20%' }]}>{item.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '15%' }]}>{item.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '15%', borderRight: 'none' }]}>{item.creditAmount}</Text>
                  <Text style={[styles.tableCell, { width: '15%', borderRight: 'none' }]}>{balances[rowIndex]}</Text>
                  
                </View>
             
              
              
          
            </React.Fragment>
          );
        })}
        <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '55%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalDebit}</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}>{totalCredit}</Text>
                <Text style={[styles.amountCell, { width: '15%' }]}></Text>
              </View>
      </View>
      <ReportFooter />
      </Page>
      </Document>
    </>
  );
};

export default TrialBalancePdfView;
