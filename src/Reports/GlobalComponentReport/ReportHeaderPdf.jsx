import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: '10px',
    // backgroundColor:'#b2d6cc'
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical:'5px'
  },
  companyInfo: {
    fontSize: 10,
    display:'block',
    paddingVertical:'5px'
  },
  dateInfo: {
    fontSize: 10,
    display:'block',
    paddingTop:'50px'
    
  },
});

const ReportHeader = ({ header, Company, startDate, endDate,name }) => {
  const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  const issuedDate = formatDate(new Date());

  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.companyInfo}>Company Name: Onviro Tech</Text>
        <Text style={styles.companyInfo}>Start Date: {startDate}</Text>
        <Text style={styles.companyInfo}>End Date: {endDate}</Text>
      </View>
      <View>
        <Text style={styles.dateInfo}>Issued Date: {issuedDate}</Text>
      </View>
    </View>
  );
};

export default ReportHeader;
