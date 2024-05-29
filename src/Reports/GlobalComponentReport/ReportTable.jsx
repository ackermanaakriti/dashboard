import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'column',
    width: '100%',
    marginTop: '15px',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    backgroundColor: '#f2f2f2',
    textAlign: 'left',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlign: 'left',
    
   
  },
  tableCellHeader: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 8,
    textAlign:'center',
 
  },
  tableCell: {
    flex: 1,
    fontSize: 8,
    borderLeftWidth: 1,
    borderLeftColor: '#ddd',
    backgroundColor: '#f2f2f2',
    textAlign:'center',
    padding:'8px 4px'
    
  },
});

const ReportTable = ({ tableData }) => {
  if (!tableData || tableData.length === 0) {
    return <Text>No data available</Text>;
  }

  const headers = Object.keys(tableData[0]);

  return (
    <View style={styles.tableContainer}>
      <View style={styles.tableHeader}>
        {headers.map((header) => (
          <Text key={header} style={styles.tableCellHeader}>
            {header}
          </Text>
        ))}
      </View>
      {tableData.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.tableRow}>
          {headers.map((header) => (
            <Text key={header} style={styles.tableCell}>
              {row[header]}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

export default ReportTable;
