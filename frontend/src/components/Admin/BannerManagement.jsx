import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { TiTick } from "react-icons/ti";

const BannerManagement = () => {
  const [select, setSelect] = useState(1);
  const [bannerName, setBannerName] = useState("");
  const [image, setImage] = useState();
  const [allBanner, setAllBanner] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/banner/get-all-banners`, { withCredentials: true })
      .then((res) => {
        setAllBanner(res.data.allBanner);
      });
  }, []);

  const handleFileInputChange = async (e) => {
    setImage(e.target.files[0]);
  };

  const handleBannerSubmit = async (e) => {
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
        `${server}/banner/create-banner-img`,
        {
          bannerName: bannerName,
          image: uploadImage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setBannerName("");
        setImage();
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleBannerSelect = async (id) => {
    axios
      .put(
        `${server}/banner/select-banner-img`,
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
      minWidth: 220,
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Banner Name",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "image",
      headerName: "image",
      type: "image",
      minWidth: 150,
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
              style={{ width: "100px", height: "auto" }}
            />
          </div>
        );
      },
    },
    {
      field: "select",
      headerName: "Choose",
      type: "number",
      minWidth: 150,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {params.value === 0 && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => handleBannerSelect(params.id)}
              >
                select
              </Button>
            )}
          </>
        );
      },
    },
    {
      field: "show",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {params.value === 1 && (
              <Button
                color="success"
                variant="contained"
                onClick={() => handleBannerSelect(params.id)}
              >
                <TiTick />
              </Button>
            )}
          </>
        );
      },
    },
  ];

  const row = [];
  allBanner &&
    allBanner.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.bannerName,
        image: item.image,
        select: item.isAvailable,
        show: item.isAvailable,
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
    if (column.headerName === "Banner Name") {
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
    <div className=" mt-5 pl-5  text-white">
      <div className=" flex  gap-5 ">
        <button
          className={`${
            select === 1 ? "bg-red-700" : ""
          } border p-2 rounded-lg  font-Roboto font-medium text-[20px]`}
          onClick={() => setSelect(1)}
        >
          Add Banner
        </button>
        <button
          className={`${
            select === 2 ? "bg-red-700" : ""
          } border p-2 rounded-lg  font-Roboto font-medium text-[20px]`}
          onClick={() => setSelect(2)}
        >
          Listed Banners
        </button>
      </div>
      {select === 1 ? (
        <div className=" mt-[5rem] ">
          <div>
            <div className=" flex justify-center">
              <div className="bg-[#272424] min-w-[30vh] max-w-[90vh] py-5  px-2 shadow rounded-md">
                <div className="font-Poppins text-gray-200  text-center py-1   md:text-[30px]  mb-3">
                  Add Banner Image
                </div>
                <form onSubmit={handleBannerSubmit}>
                  <div className="mt-2 pl-2 pb-2">
                    <label className=" font-Roboto text-gray-200 font-medium ">
                      Banner Name
                      <span className="text-red-500 text-lg">* </span>
                      <span>:</span>
                    </label>
                    <input
                      type="text"
                      name="bannerName"
                      value={bannerName}
                      required
                      onChange={(e) => setBannerName(e.target.value)}
                      placeholder="Enter the banner name"
                      className=" sm:ml-1 mt-2 appearance-none w-[97%] border text-gray-900 h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-700 focus:border-blue-900"
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
                    <button
                      type="submit"
                      className=" text-white font-medium font-Roboto  "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-[5rem] ">
          <div>
            <div className=" flex justify-">
              <div className=" rounded-md  w-full   overflow-y-scroll    mt-[2rem] flex  flex-col  px-2 pt-1 justify-start  bg-[#1c3134]  ">
                <div className="flex justify-center  py-1 text-2xl mb-5 text-gray-200  font-Roboto font-bold items-center">
                  Banner Images
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
