import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: '5px',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'left',
  },
  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 9,
    textAlign: 'center',
    padding: '8px 4px',
  },
  tableCell: {
    fontSize: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    textAlign: 'center',
    padding: '8px 4px',
  },
});

const ReportTable = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return <Text>No data available</Text>;
  }

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader} fixed>
        <Text style={[styles.tableCellHeader, { width: '10%' }]}>ID</Text>
        <Text style={[styles.tableCellHeader, { width: '30%' }]}>Name</Text>
        <Text style={[styles.tableCellHeader, { width: '30%' }]}>Prefix</Text>
        <Text style={[styles.tableCellHeader, { width: '10%' }]}>Active</Text>
        <Text style={[styles.tableCellHeader, { width: '20%' }]}>Accounting</Text>
      </View>
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          <Text style={[styles.tableCell, { width: '10%' }]}>{row.id}</Text>
          <Text style={[styles.tableCell, { width: '30%' }]}>{row.name}</Text>
          <Text style={[styles.tableCell, { width: '30%' }]}>{row.prefix}</Text>
          <Text style={[styles.tableCell, { width: '10%' }]}>{row.isActive ? 'Yes' : 'No'}</Text>
          <Text style={[styles.tableCell, { width: '20%' }]}>ACCOUNTING</Text>
        </View>
      ))}
    </View>
  );
};

export default ReportTable;
  