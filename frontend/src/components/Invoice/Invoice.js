import React from 'react'
import { PDFViewer, PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      margin: 20,
    },
    header: {
      fontSize: 20,
      marginBottom: 10,
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
  });
  
const Invoice = ({invoiceData}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>Invoice</Text>
        </View>
        <View style={styles.item}>
          <Text>Item Description</Text>
          <Text>Quantity</Text>
          <Text>Price</Text>
        </View>
        {invoiceData.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text>{item.description}</Text>
            <Text>{item.quantity}</Text>
            <Text>{item.price}</Text>
          </View>
        ))}
      </Page>
    </Document>
  )
}

export default Invoice