import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAmenities,
  getAllAmenities,
} from "../../redux/actions/amenities";
import Loader from "../Layout/Loader";

const AmenitiesManagement = () => {
  const { allAmenities, isLoading } = useSelector((state) => state.amenities);
  const [addAmenitiesShow, setAddAmenitiesShow] = useState(false);
  const [amenitiesName, setAmenitiesName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAmenities());
  }, [dispatch]);

  const handleAddAmenities = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/amenities/create-amenities`,
        {
          amenitiesName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setAmenitiesName("");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleAmenitiesDelete = (id) => {
    dispatch(deleteAmenities(id));
    toast.success("successfully deleted");
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

  const columns = [
    {
      field: "no",
      headerName: "Sl-No",
      minWidth: 100,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 220,
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Amenities Name",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "Delete",
      headerName: "Action",
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
              color="error"
              variant="contained"
              onClick={() => handleAmenitiesDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const row = [];
  allAmenities &&
    allAmenities.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.AmenitiesName,
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
    if (column.headerName === "Sl-No") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Amenities Name") {
      return { ...column, renderCell: CustomCellRenderer };
    }

    if (column.headerName === "ID") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });
  return (
    <div className=" ">
      <div className="flex justify-start     text-lg px-5 font-Roboto  font-medium  gap-3 mt-5">
        <div
          className={`${
            addAmenitiesShow ? "text-gray-800  bg-red-700" : "text-white"
          } border border-solid   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddAmenitiesShow(!addAmenitiesShow)}
        >
          Add Amenities
        </div>
        <div
          className={` ${
            addAmenitiesShow ? "text-white" : "text-gray-800  bg-red-700 "
          }  border   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddAmenitiesShow(!addAmenitiesShow)}
        >
          Listed Amenities
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : addAmenitiesShow ? (
        <div className="sm:w-[35%] w-[55%] h-[40vh] mt-[8rem] pb-5  absolute sm:right-[20%] sm:left-[45%]  right-[5%] left-[30%]   bg-[#272424]  shadow rounded-md overflow-y-scroll  ">
          <h2 className=" font-Poppins text-center p-5 text-gray-200 text-[30px] border-b">
            Add Amenities
          </h2>
          <form onSubmit={handleAddAmenities}>
            <div className="mt-2 pl-2 pb-2">
              <label className=" font-Roboto text-gray-200 ">
                Amenity<span className="text-red-400 text-lg">* </span>
                <span>:</span>
              </label>
              <input
                type="text"
                name="amenitiesName"
                value={amenitiesName}
                required
                onChange={(e) => setAmenitiesName(e.target.value)}
                placeholder="Enter the amenity"
                className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-700 focus:border-blue-900"
              />
            </div>

            <div className="flex justify-center items-center py-2 rounded shadow-sm mx-10  mt-5 bg-blue-700 hover:bg-blue-800">
              <button className=" text-white font-medium font-Roboto  ">
                Create Amenities
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className=" rounded-md w-full  mt-[3rem] flex     flex-col justify-start px-2 pt-1   bg-[#1c3134] ">
          <div className="flex justify-center text-gray-200 h-10 text-2xl mb-2  font-Roboto font-bold items-center">
            Listed Amenities
          </div>
          <DataGrid
            rows={row}
            columns={updatedColumns}
            pageSize={10}
            disableSelectionOnClick
            disableRowSelectionOnClick
            autoHeight
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
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

export default AmenitiesManagement;
