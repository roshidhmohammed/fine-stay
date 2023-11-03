import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getDeleteProperty,
  getPartnerAllProperties,
} from "../../redux/actions/property";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader";

const ListedProperties = ({ setPropertyShow, setPropId }) => {
  const { properties, isLoading } = useSelector((state) => state.property);
  const { partner } = useSelector((state) => state.partner);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPartnerAllProperties(partner._id));
  }, [dispatch, partner]);

  const handleCouponDelete = (id) => {
    dispatch(getDeleteProperty(id));
    // window.location.reload();
  };
  const columns = [
    { field: "id", headerName: "Property Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Property Name",
      minWidth: 180,
      flex: 1.4,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "price",
      type: "number",
      minWidth: 100,
      flex: 0.6,
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
      field: "TotalBooking",
      headerName: "Total Bookings",
      type: "number",
      minWidth: 110,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "OngoingBooking",
      headerName: "Ongoing Booking",
      type: "number",
      minWidth: 110,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "preview",
      headerName: "preview",
      type: "number",
      minWidth: 80,
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => setPropertyShow(true) || setPropId(params.id)}
            >
              <AiOutlineEye size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Action",
      type: "number",
      minWidth: 80,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCouponDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
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
        price: "₹" + item.price,
        roomsCount: item.roomsCount,
        TotalBooking: 20,
        OngoingBooking: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8  mb-10 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default ListedProperties;
