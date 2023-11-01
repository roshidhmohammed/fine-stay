import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllDestination } from "../../redux/actions/destination";
import Loader from "../Layout/Loader";

const DestinationManagement = () => {
  const [addDestinationShow, setAddDestinationShow] = useState(false);
  const { allDestination, isLoading } = useSelector(
    (state) => state.destination
  );
  const [destinationName, setDestinationName] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDestination());
  }, [dispatch]);

  const handleFileInputChange = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleTopDestinationSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    const uploadImage = response.data.secure_url;

    axios
      .post(
        `${server}/topDestination/create-top-destination`,
        {
          destinationName,
          destinationPlace,
          image: uploadImage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setDestinationName("");
        setDestinationPlace("");
        setImage();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
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
      minWidth: 150,
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Destination",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "place",
      headerName: "Location",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "image",
      headerName: "Image",
      type: "number",
      minWidth: 80,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        return (
          <div>
            <img
              src={params.value}
              alt=""
              style={{ width: "80px", height: "auto" }}
            />
          </div>
        );
      },
    },
  ];

  const row = [];
  allDestination &&
    allDestination.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.destination,
        place: item.placeName,
        image: item.image,
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
    if (column.headerName === "Destination") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Location") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Destination Image") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "ID") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });
  return (
    <div className=" flex flex-col">
      <div className="flex justify-start      text-lg px-5 font-Roboto  font-medium  gap-3 mt-5 ">
        <div
          className={`${
            addDestinationShow ? "text-gray-800  bg-red-700" : "text-white"
          } border border-solid   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddDestinationShow(!addDestinationShow)}
        >
          Add Top Destination
        </div>
        <div
          className={` ${
            addDestinationShow ? "text-white" : "text-gray-800  bg-red-700 "
          }  border   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddDestinationShow(!addDestinationShow)}
        >
          Listed Top Destinations
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : addDestinationShow ? (
        <div className=" flex justify-center ">
          <div className=" z-0 min-w-[30vh] max-w-[90vh]   mt-[3rem]   flex-col py-5  px-2    bg-[#272424]  shadow rounded-md   ">
            <h2 className=" font-Poppins text-gray-200  text-center   md:text-[30px]  mb-3">
              Add Top Destination in India
            </h2>
            <form onSubmit={handleTopDestinationSubmit}>
              <div className="mt-2 pl-2 pb-2">
                <label className=" font-Roboto text-gray-200 font-medium ">
                  Destination Name
                  <span className="text-red-500 text-lg">* </span>
                  <span>:</span>
                </label>
                <input
                  type="text"
                  name="destinationName"
                  value={destinationName}
                  required
                  onChange={(e) => setDestinationName(e.target.value)}
                  placeholder="Enter the coupon name"
                  className=" sm:ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-700 focus:border-blue-900"
                />
              </div>
              <div className="mt-2 pl-2 pb-2">
                <label className=" font-Roboto text-gray-200 font-medium  ">
                  Place Name
                  <span className="text-red-500 text-lg">* </span>
                  <span>:</span>
                </label>
                <input
                  type="text"
                  name="destinationPlace"
                  value={destinationPlace}
                  required
                  onChange={(e) => setDestinationPlace(e.target.value)}
                  onWheel={(e) => e.target.blur()}
                  placeholder="Enter the coupon discount in percentage"
                  className=" sm:ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mt-2 pl-2 pb-2">
                <div className="font-medium text-gray-200 font-Roboto">
                  Image
                  <span className="text-red-700 text-md">
                    {" "}
                    (upload only single image) *{" "}
                  </span>
                  <span>:</span>
                </div>
                <label
                  htmlFor="file-input"
                  className="  ml-2 mr-3 flex items-center justify-center px-4 py-2 mt-2 border border-gray-300 rounded-sm shadow-sm text-sm font-medium text-gray-700 bg-white  hover:bg-gray-50"
                >
                  <input
                    type="file"
                    name="image"
                    id="file-input"
                    accept=".jpg,.jpeg,.png,.webp,.avif"
                    required
                    onChange={handleFileInputChange}
                    className="  appearance-none focus:outline-none block focus:ring-blue-500 focus:border-blue-500 "
                  />
                </label>
                {/* <img src={image} alt='' className='h-80 w-80'/> */}
              </div>
              <div className="flex justify-center items-center py-2 rounded shadow-sm mx-5  mt-3 bg-blue-700 hover:bg-blue-800">
                <button className=" text-white font-medium font-Roboto  ">
                  Add Destination
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className=" rounded-md    overflow-y-scroll    mt-[2rem] flex  flex-col  px-2 pt-1 justify-start  bg-[#1c3134]  ">
          <div className="flex justify-center  text-2xl mb-5 text-gray-200  font-Roboto font-bold items-center">
            Listed Top Destination
          </div>
          <DataGrid
            rowHeight={70}
            rows={row}
            columns={updatedColumns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            disableRowSelectionOnClick
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

export default DestinationManagement;
