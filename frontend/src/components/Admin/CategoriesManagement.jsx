import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/actions/categories";
import Loader from "../Layout/Loader";

const CategoriesManagement = () => {
  const [addCategoryShow, setAddCategoryShow] = useState(false);
  const { allCategories, isLoading } = useSelector((state) => state.categories);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleFileInputChange = async (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const handleAddCategorySubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", categoryImage);
    formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
      formData
    );
    const categoryUploadImage = response.data.secure_url;

    await axios
      .post(
        `${server}/categories/create-category`,
        {
          categoryName,
          categoryImage: categoryUploadImage,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setCategoryName("");
        setCategoryImage();
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
      headerName: "Categories",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "image",
      headerName: "Categories Image",
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
  allCategories &&
    allCategories.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.categoryName,
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
    if (column.headerName === "Categories") {
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
    <>
      <div className="flex justify-start     text-lg px-5 font-Roboto   font-medium  gap-3 mt-5">
        <div
          className={`${
            addCategoryShow ? "text-gray-800  bg-red-700" : "text-white"
          } border border-solid   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddCategoryShow(!addCategoryShow)}
        >
          Add Category
        </div>
        <div
          className={` ${
            addCategoryShow ? "text-white" : "text-gray-800  bg-red-700 "
          }  border   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddCategoryShow(!addCategoryShow)}
        >
          Listed Categories
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : addCategoryShow ? (
        <div className="sm:w-[40%]  h-[60vh] mt-[7rem] absolute pb-5 sm:right-[20%] sm:left-[40%]  right-[10%] left-[30%]   bg-[#272424] shadow rounded-md overflow-y-scroll  ">
          <h2 className=" font-Poppins text-gray-200 text-center p-5  sm:text-[30px] border-b">
            Add Category
          </h2>
          <form onSubmit={handleAddCategorySubmit}>
            <div className="mt-2 pl-2 pb-2">
              <label className=" font-Roboto text-gray-200 font-medium ">
                Category Name<span className="text-red-400 text-lg">* </span>
                <span>:</span>
              </label>
              <input
                type="text"
                name="categoryName"
                value={categoryName}
                required
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter the coupon name"
                className=" sm:ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-700 focus:border-blue-900"
              />
            </div>

            <div className="mt-2 pl-2 pb-2">
              <div className="font-medium text-gray-200 font-Roboto">
                Category Image
                <span className="text-red-700 text-md">
                  {" "}
                  (upload single image) *{" "}
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
            </div>
            <div className="flex justify-center items-center py-2 rounded shadow-sm mx-5  mt-3 bg-blue-700 hover:bg-blue-800">
              <button className=" text-white font-medium font-Roboto  ">
                Add Category
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className=" rounded-md  overflow-x-scroll    mt-[3rem]  flex  flex-col   px-2 pt-1   bg-[#1c3134] ">
          <div className="flex justify-center text-gray-200 py-1 text-2xl mb-5  font-Roboto font-bold items-center">
            Listed Categories
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
    </>
  );
};

export default CategoriesManagement;
