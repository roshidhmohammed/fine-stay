import React, { useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import InvoicePdf from "../../src/components/InvoicePdf.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/booking.js";

const Invoice = () => {
  const { allBookings } = useSelector((state) => state.bookings);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookings);
  }, [dispatch]);
  const getInvoiceBooking = allBookings?.filter(
    (booking) => booking._id === id
  );
  console.log(getInvoiceBooking);

  return (
    <div>
      <PDFViewer width={1550} height={700}>
        <InvoicePdf invoiceData={getInvoiceBooking && getInvoiceBooking[0]} />
      </PDFViewer>
    </div>
  );
};

export default Invoice;
