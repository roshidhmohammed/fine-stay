import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPartnerAllProperties } from "../../redux/actions/property";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { getAllBookings } from "../../redux/actions/booking";

const PartnerAllBookings = ({ setBookingDetails, setpropertyId }) => {
  const { properties, isLoading } = useSelector((state) => state.property);
  const { partner } = useSelector((state) => state.partner);
  const { allBookings } = useSelector((state) => state.bookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnerAllProperties(partner._id));
    dispatch(getAllBookings());
  }, [dispatch, partner]);

  const handleBookingDetails = (id) => {
    setBookingDetails("accomodationDetails");
    setpropertyId(id);
  };

  const columns = [
    { field: "id", headerName: "Property Id", minWidth: 150, flex: 0.6 },
    {
      field: "name",
      headerName: "Property Name",
      minWidth: 150,
      flex: 0.9,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "roomsCount",
      headerName: "Rooms Count",
      minWidth: 100,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OngoingAccommodation",
      headerName: "Ongoing Accommodation",
      type: "number",
      minWidth: 110,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const bookingFilterByPartner =
          allBookings &&
          allBookings.filter(
            (item, index) =>
              item.propertyId === params.id &&
              (item.bookingStatus === "booked" ||
                item.bookingStatus === "checked-in")
          );
        return bookingFilterByPartner && bookingFilterByPartner.length;
      },
    },
    {
      field: "CompletedAccommodation",
      headerName: "Completed Accommodation",
      type: "number",
      minWidth: 110,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const bookingFilterByPartner =
          allBookings &&
          allBookings.filter(
            (item, index) =>
              item.propertyId === params.id &&
              item.bookingStatus === "checked-out"
          );
        return bookingFilterByPartner && bookingFilterByPartner.length;
      },
    },
    {
      field: "preview",
      headerName: "preview",
      type: "number",
      minWidth: 80,
      flex: 0.4,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => handleBookingDetails(params.id)}
            >
              <AiOutlineEye size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  properties &&
    properties.forEach((item) => {
      row.push({
        id: item._id,
        name: item.propertyName,
        roomsCount: item.roomsCount,
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-3 pt-1 mt-10  mb-1  bg-gray-100 ">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            rowSelection={false}
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default PartnerAllBookings;
