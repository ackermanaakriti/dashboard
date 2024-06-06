import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    footer:
    {
        paddingTop:'20px'
    },
    footerText:
    {
        fontSize:'10px',
       
    }
})

const ReportFooter = () => {
  return (
   <View style={styles.footer} >
    <Text style={styles.footerText}>
        Note:
    </Text>
    <Text style={styles.footerText}>
        Powered By Onviro Tech
    </Text>
   </View>
  )
}

export default ReportFooter