import React from 'react';
import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import ReportHeader from './ReportHeader';
import ReportTable from './ReportTable';
import ReportFooter from '../ReportFooter';

const styles = StyleSheet.create({
  page: {
   
    paddingTop: 20,
    paddingBottom: 40, // Ensure space for footer
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: '10px',
  },
  content: {
   
    marginTop: '10px',
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
  header: {
    position: 'fixed',
    top: 20,
    left: 20,
    right: 20,
    marginBottom: '10px',
  },
  footerSection:
  {
    paddingTop:'20px'
  }
});

const MyDocument = ({ headerData, tableData, endDate, startDate }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer} fixed>
        <ReportHeader endDate={endDate} startDate={startDate} />
      </View>
      <View style={styles.content}>
        <ReportTable tableData={tableData} />
      </View>
      <View style={styles.footerSection} fixed>
        <ReportFooter />
      </View>
      <Text style={styles.footer} fixed render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </Page>
  </Document>
);

export default MyDocument;
