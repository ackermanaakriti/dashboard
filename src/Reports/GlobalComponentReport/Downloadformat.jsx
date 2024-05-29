import React from 'react';
import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import ReportHeader from './ReportHeader';
import ReportTable from './ReportTable';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    marginBottom: 20,
  },
  content: {
    marginTop: 80, // Adjust this to avoid overlapping the header
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: 'grey',
  },
});

const MyDocument = ({ headerData, tableData,endDate,startDate }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View fixed style={styles.headerContainer}>
        <ReportHeader endDate={endDate} startDate={startDate}/>
      </View>
      <View style={styles.content}>
        <ReportTable tableData={tableData} />
      </View>
      <Text style={styles.footer} fixed>
        Page <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
      </Text>
    </Page>
  </Document>
);

export default MyDocument;
