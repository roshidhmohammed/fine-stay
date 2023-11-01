import React from "react";
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import image from "../../src/Assests/logo/logo6.png";
const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 60,
  },
  label: {
    width: 60,
    fontweight: 500,
  },
  value: {
    fontweight: 500,
    fontSize: 15,
  },
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
  },
  name: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  days: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "15%",
  },
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  nameVal: {
    width: "40%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qtyVal: {
    width: "30%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  daysVal: {
    width: "15%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amountVal: {
    width: "15%",
    textAlign: "right",
    paddingRight: 8,
  },
  final: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 3,
  },
  total: {
    marginRight: 20,
    fontWeight: 700,
    fontSize: 11,
  },
  titleContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
  },
  reportTitle: {
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#bf0a1c",
  },
});

const InvoicePdf = ({ invoiceData }) => {
  const invoiceNo = invoiceData?._id;
  const invoiceDate = invoiceData?.checkOutDate.slice(0, 10);
  const hotel = invoiceData?.propertyName;
  const rooms = invoiceData?.roomsCount;
  const amount = invoiceData?.totalPrice;
  const checkinDate = invoiceData?.checkinDate;
  const checkOutDate = invoiceData?.checkOutDate;
  const date1 = new Date(checkinDate);
  const date2 = new Date(checkOutDate);
  const timeDifference = date2 - date1;

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const logo = image;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.invoiceNoContainer}>
          <Image style={styles.logo} src={logo} />
        </View>
        <View style={styles.invoiceNoContainer}>
          <Text style={styles.label}>Invoice No:</Text>
          <Text style={styles.invoiceDate}>{invoiceNo}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
          <Text style={styles.label}>Date: </Text>
          <Text>{invoiceDate}</Text>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.container}>
            <Text style={styles.name}>Hotel Name</Text>
            <Text style={styles.qty}>No of Rooms</Text>
            <Text style={styles.days}>No of Days</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.nameVal}>{hotel}</Text>
            <Text style={styles.qtyVal}>{rooms}</Text>
            <Text style={styles.daysVal}>{daysDifference + 1}</Text>
            <Text style={styles.amountVal}>{amount}</Text>
          </View>
        </View>
        <View style={styles.final}>
          <Text style={styles.total}>Total:</Text>
          <Text>{amount}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Thank you for choosing us!!!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePdf;
