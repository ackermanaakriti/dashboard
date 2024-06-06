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

const IncomePdfView = ({ tableData, endDate, startDate }) => {
  if (!tableData || tableData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <>
     <Document>
    <Page size="A4" style={styles.page}>
      <ReportHeader endDate={endDate} startDate={startDate} name='Income Statement Report' />
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader} fixed>
          <Text style={[styles.tableCellHeader, { width: '50%' }]}>Chart of Account</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Debit Amount</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Credit Amount</Text>
        </View>
        {tableData.map((item, rowIndex) => {
          const totalIncomeDebit = item?.income?.reduce((sum, income) => sum + parseFloat(income?.debitAmount), 0);
          const totalIncomeCredit = item?.income?.reduce((sum, income) => sum + parseFloat(income?.creditAmount), 0);
          const totalExpenseDebit = item?.expenses?.reduce((sum, expense) => sum + parseFloat(expense?.debitAmount), 0);
          const totalExpenseCredit = item?.expenses?.reduce((sum, expense) => sum + parseFloat(expense?.creditAmount), 0);

          return (
            <React.Fragment key={rowIndex}>
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid' }]}>
                <Text style={{ fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Income</Text>
              </View>
              {item?.income?.map((income, assetIndex) => (
                <View key={assetIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '50%' }]}>{income.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '25%' }]}>{income.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '25%', borderRight: 'none' }]}>{income.creditAmount}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '50%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '25%' }]}>{totalIncomeDebit}</Text>
                <Text style={[styles.amountCell, { width: '25%' }]}>{totalIncomeCredit}</Text>
              </View>
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid' }]}>
                <Text style={{ fontSize: '12px', fontWeight: 'bold', padding: '5px' }}>Expense</Text>
              </View>
              {item.expenses.map((expense, assetIndex) => (
                <View key={assetIndex} style={styles.tableRow}>
                  <Text style={[styles.tableCell, { width: '50%' }]}>{expense.chartOfAccountAccountName}</Text>
                  <Text style={[styles.tableCell, { width: '25%' }]}>{expense.debitAmount}</Text>
                  <Text style={[styles.tableCell, { width: '25%', borderRight: 'none' }]}>{expense.creditAmount}</Text>
                </View>
              ))}
              <View style={[styles.tableRow, { borderBottomWidth: '1px', borderBottomColor: '#d9d9d9', borderBottomStyle: 'solid', backgroundColor: '#f5f4f2' }]}>
                <Text style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px', width: '50%' }}>Total</Text>
                <Text style={[styles.amountCell, { width: '25%' }]}>{totalExpenseDebit}</Text>
                <Text style={[styles.amountCell, { width: '25%' }]}>{totalExpenseCredit}</Text>
              </View>
            </React.Fragment>
          );
        })}
      </View>
      <ReportFooter />
      </Page>
      </Document>
    </>
  );
};

export default IncomePdfView;
