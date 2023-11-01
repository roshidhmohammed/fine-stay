import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FiArrowLeftCircle, FiEye } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../redux/actions/property";
import { getAllBookings } from "../../redux/actions/booking";
import Loader from "../Layout/Loader";

const ListedPropertiesManagement = () => {
  const { allProperties, isLoading } = useSelector((state) => state.property);
  const { allBookings } = useSelector((state) => state.bookings);
  const [propertyView, setPropertyView] = useState(false);
  const [propertyId, setPropertyId] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProperties());
    dispatch(getAllBookings());
  }, [dispatch]);
  const currentBookings = allBookings?.filter(
    (booking) =>
      booking.propertyId === propertyId &&
      (booking.bookingStatus === "booked" ||
        booking.bookingStatus === "checked-in")
  );

  const totalBooking = allBookings?.filter(
    (booking) => booking.propertyId === propertyId
  );

  const handleProperty = (id) => {
    setPropertyView(!propertyView);
    setPropertyId(id);
  };
  const filterPropertiesById =
    allProperties && allProperties.find((obj) => obj["_id"] === propertyId);
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
      headerName: "property id",
      minWidth: 150,
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Property name",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "owner",
      headerName: "Owner id",
      minWidth: 120,
      flex: 1.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "preview",
      headerName: "preview",
      type: "number",
      minWidth: 80,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              color="warning"
              variant="contained"
              onClick={() => handleProperty(params.id)}
            >
              <FiEye />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  allProperties &&
    allProperties.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.propertyName,
        owner: item.partnerId,
        category: item.category,
        price: item.price,
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
    if (column.headerName === "Property name") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Owner id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Category") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Price") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : propertyView ? (
        <div className="bg-[#09091c] w-full overflow-y-scroll">
          <div className="flex justify-between items-center pl-5 pt-5 pb-5 ">
            <FiArrowLeftCircle
              size={28}
              color="white"
              onClick={() => setPropertyView(!propertyView)}
            />
            <h1 className="text-gray-200 text-2xl font-medium font-Roboto">
              Property Details
            </h1>
            <h1></h1>
          </div>

          <div className="flex  bg-[#272424] shadow-sm mx-2 mb-5">
            <div className="flex md:justify-between justify-center flex-wrap items-center  ">
              <div className=" ">
                <img
                  src={
                    filterPropertiesById && filterPropertiesById.images[0].url
                  }
                  alt=""
                  className="h-[15rem] w-[15rem] rounded-md "
                />
              </div>
              <div className="pl-5 font-Roboto">
                <div className=" flex ">
                  <h1 className="font-medium text-gray-200 text-lg">
                    property Name :
                  </h1>

                  <h1 className=" font-normal text-md text-gray-200 pl-2 pt-[2px]">
                    {" "}
                    {filterPropertiesById && filterPropertiesById.propertyName}
                  </h1>
                </div>
                <div className=" flex">
                  <h1 className="font-medium text-gray-200 text-lg">
                    Category:
                  </h1>
                  <h1 className=" font-normal text-md pl-2 text-gray-200 pt-[2px]">
                    {filterPropertiesById && filterPropertiesById.category}
                  </h1>
                </div>
                <div className=" flex">
                  <h1 className="font-medium text-gray-200 text-lg">Price:</h1>
                  <h1 className=" font-normal text-md text-gray-200 pl-2 pt-[2px]">
                    {filterPropertiesById && filterPropertiesById.price}
                  </h1>
                </div>
                <div className=" flex">
                  <h1 className="font-medium text-gray-200 text-lg">place:</h1>
                  <h1 className=" font-normal text-md text-gray-200 pl-2 pt-[2px]">
                    {filterPropertiesById &&
                      filterPropertiesById.currentLocation.placeName}
                  </h1>
                </div>

                <div className=" flex">
                  <h1 className="font-medium  text-gray-200 text-lg">
                    Rooms left:
                  </h1>
                  <h1 className=" font-normal text-gray-200 text-lg pl-2 pt-[2px]">
                    {filterPropertiesById && filterPropertiesById.roomsCount}
                  </h1>
                </div>
                <div className=" flex">
                  <h1 className="font-medium text-orange-500 text-lg">
                    On going booking:
                  </h1>
                  <h1 className=" font-normal text-lg pl-2 text-gray-200 pt-[2px]">
                    {currentBookings?.length}
                  </h1>
                </div>
                <div className=" flex">
                  <h1 className="font-medium text-emerald-500 text-lg">
                    Total Booking:
                  </h1>
                  <h1 className=" font-normal text-lg text-gray-200 pl-2 pt-[2px]">
                    {totalBooking?.length}
                  </h1>
                </div>
                <div className=" flex">
                  <h1 className="font-medium text-blue-500 text-lg">Rating:</h1>
                  <h1 className=" font-normal text-lg text-gray-200 pl-2 pt-[2px]">
                    {filterPropertiesById?.rating}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:w-full w-[70%] text-gray-100    px-1 pt-1  bg-[#1f1f41] ">
          <div className="flex text-gray-200 my-2 justify-center h-10 text-2xl   font-Roboto font-bold items-center">
            All Properties
          </div>
          <DataGrid
            rows={row}
            columns={updatedColumns}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
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
    </>
  );
};

export default ListedPropertiesManagement;
