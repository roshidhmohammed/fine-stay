import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../redux/actions/booking";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";

const BookingManagement = () => {
  const { allBookings, isLoading } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();
  const [paymentMode, setPaymentMode] = useState("cashPayment");

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const filterBookingsCash =
    allBookings &&
    allBookings.filter(
      (booking, index) => booking.paymentMode === "Cash Payment"
    );
  const filterBookingsStripe =
    allBookings &&
    allBookings.filter((booking, index) => booking.paymentMode === "stripe");
  const filterBookingsPaypal =
    allBookings &&
    allBookings.filter((booking, index) => booking.paymentMode === "paypal");

  const columns = [
    {
      field: "no",
      headerName: "Sl-no",
      minWidth: 100,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "id",
      headerName: "Booking id",
      minWidth: 220,
      flex: 1.9,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "paymentId",
      headerName: "Payment Id",
      minWidth: 220,
      flex: 2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "PaymentMode",
      headerName: "Payment Mode",
      minWidth: 190,
      flex: 1.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "BookingStatus",
      headerName: "Booking Status",
      minWidth: 150,
      flex: 1.3,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        const filterBookingsParams =
          allBookings && allBookings.filter((i) => i._id === params.id);
        console.log(filterBookingsParams[0].bookingStatus);
        return (
          <>
            {filterBookingsParams &&
              filterBookingsParams[0].bookingStatus === "booked" && (
                <Button color="warning" variant="contained">
                  Booked
                </Button>
              )}
            {filterBookingsParams &&
              filterBookingsParams[0].bookingStatus === "checked-in" && (
                <Button color="success" variant="contained">
                  Checked-in
                </Button>
              )}
            {filterBookingsParams &&
              filterBookingsParams[0].bookingStatus === "checked-out" && (
                <Button color="error" variant="contained">
                  Checked-out
                </Button>
              )}
          </>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "bookedOn",
      headerName: "Booked On",
      minWidth: 150,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
  ];

  const rowCash = [];
  filterBookingsCash &&
    filterBookingsCash.forEach((item, index) => {
      rowCash.push({
        no: index + 1,
        id: item._id,
        paymentId: item.paymentId,
        PaymentMode: item.paymentMode,
        bookedOn: item.createdAt.slice(0, 10),
        amount: item.totalPrice,
      });
    });

  const rowStripe = [];
  filterBookingsStripe &&
    filterBookingsStripe.forEach((item, index) => {
      rowStripe.push({
        no: index + 1,
        id: item._id,
        paymentId: item.paymentId,
        PaymentMode: item.paymentMode,
        bookedOn: item.createdAt.slice(0, 10),
        amount: item.totalPrice,
      });
    });

  const rowPaypal = [];
  filterBookingsPaypal &&
    filterBookingsPaypal.forEach((item, index) => {
      rowPaypal.push({
        no: index + 1,
        id: item._id,
        paymentId: item.paymentId,
        PaymentMode: item.paymentMode,
        bookedOn: item.createdAt.slice(0, 10),
        amount: item.totalPrice,
      });
    });

  const headerCellStyle = {
    color: "white",
  };

  const CustomCellRenderer = ({ value }) => (
    <span style={{ color: "white", border: "  white" }}>{value}</span>
  );

  const updatedColumns = columns.map((column) => {
    if (column.field === "id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Sl-no") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Payment Id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Payment Mode") {
      return { ...column, renderCell: CustomCellRenderer };
    }

    if (column.headerName === "Amount") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Booked On") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });

  return (
    <div className=" ">
      {isLoading && <Loader />}
      <div className="flex justify-start  overflow-x-scroll    text-lg sm:px-5 font-Roboto  font-medium  gap-3 mt-5">
        <div
          className={`${
            paymentMode === "cashPayment"
              ? "text-gray-800  bg-red-700"
              : "text-white"
          } border border-solid   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setPaymentMode("cashPayment")}
        >
          Cash Payment
        </div>
        <div
          className={` ${
            paymentMode === "StripePayment"
              ? "text-gray-800  bg-red-700"
              : "text-white "
          }  border   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setPaymentMode("StripePayment")}
        >
          Stripe Payment
        </div>
        <div
          className={` ${
            paymentMode === "PaypalPayment"
              ? "text-gray-800  bg-red-700"
              : "text-white "
          }  border   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setPaymentMode("PaypalPayment")}
        >
          Paypal Payment
        </div>
      </div>
      {paymentMode === "cashPayment" && (
        <div className=" rounded-md w-[79%] overflow-x-scroll overflow-y-scroll h-[60vh]   mt-[5rem] absolute right-[10%] left-[20%] xl:px-5 lg:px-16 sm:px-28 px-2 pt-1   bg-[#1c3134] ">
          <div className="flex justify-center  text-gray-200 text-2xl mb-5  py-1 font-Roboto font-bold items-center">
            Cash payment Bookings
          </div>
          <DataGrid
            rows={rowCash}
            columns={updatedColumns}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            disableSelectionOnClick
            disableRowSelectionOnClick
            autoHeight
          />
          <style>
            {`
              .custom-header {
                color: ${headerCellStyle.color};
              }
              
              
            `}
          </style>
        </div>
      )}

      {paymentMode === "StripePayment" && (
        <div className="rounded-md w-[79%] overflow-x-scroll overflow-y-scroll h-[60vh]   mt-[5rem] absolute right-[10%] left-[20%] xl:px-5 lg:px-16 sm:px-28 px-2 pt-1   bg-[#1c3134]">
          <div className="flex justify-center text-gray-200 py-1 text-2xl mb-5  font-Roboto font-bold items-center">
            Stripe payment Bookings
          </div>
          <DataGrid
            rows={rowStripe}
            columns={updatedColumns}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            disableSelectionOnClick
            disableRowSelectionOnClick
            autoHeight
          />
          <style>
            {`
              .custom-header {
                color: ${headerCellStyle.color};
              }
              
              
            `}
          </style>
        </div>
      )}

      {paymentMode === "PaypalPayment" && (
        <div className=" rounded-md w-[79%] overflow-x-scroll overflow-y-scroll h-[60vh]   mt-[5rem] absolute right-[10%] left-[20%] xl:px-5 lg:px-16 sm:px-28 px-2 pt-1   bg-[#1c3134]">
          <div className="flex justify-center text-gray-200 py-1 text-2xl mb-5  font-Roboto font-bold items-center">
            Paypal payment Bookings
          </div>
          <DataGrid
            rows={rowPaypal}
            columns={updatedColumns}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            disableSelectionOnClick
            disableRowSelectionOnClick
            autoHeight
          />
          <style>
            {`
              .custom-header {
                color: ${headerCellStyle.color};
              }
              
              
            `}
          </style>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
