import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { deleteCoupons, getAllCoupons } from "../../redux/actions/coupon";
import { AiOutlineDelete } from "react-icons/ai";
import Loader from "../Layout/Loader";

const CouponManagement = () => {
  const { allCoupons, message, isLoading } = useSelector(
    (state) => state.coupon
  );
  const dispatch = useDispatch();
  const [couponName, setCouponName] = useState("");
  const [discount, setDiscount] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [addCouponShow, setAddCouponShow] = useState(false);

  useEffect(() => {
    dispatch(getAllCoupons());
  }, [dispatch]);

  const handleCouponDelete = (id) => {
    dispatch(deleteCoupons(id));
    toast.success(message);
    // window.location.reload();
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    axios
      .post(
        `${server}/coupon/create-coupon`,
        {
          couponName,
          discount,
          minAmount,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setCouponName("");
        setDiscount("");
        setMinAmount("");
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
      headerName: "Coupon Name",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "discount",
      headerName: "Discount",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "minAmount",
      headerName: "Min Amount",
      minWidth: 100,
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
  allCoupons &&
    allCoupons.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.couponName,
        discount: item.discount + "%",
        minAmount: item.minAmount,
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
    if (column.headerName === "Coupon Name") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Discount") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Min Amount") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "ID") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });
  return (
    <div>
      <div className="flex justify-start     text-lg px-5 font-Roboto  font-medium  gap-3 mt-5">
        <div
          className={`${
            addCouponShow ? "text-gray-800  bg-red-700" : "text-white"
          } border border-solid   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddCouponShow(!addCouponShow)}
        >
          Add Coupon
        </div>
        <div
          className={` ${
            addCouponShow ? "text-white" : "text-gray-800  bg-red-700 "
          }  border   px-2 rounded-md  shadow-md py-1`}
          onClick={() => setAddCouponShow(!addCouponShow)}
        >
          Listed Coupons
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : addCouponShow ? (
        <div className="sm:w-[40%] h-[60vh] mt-[5rem] pb-10  absolute sm:right-[20%] sm:left-[40%] right-[10%] left-[30%]     bg-[#272424]  shadow rounded-md overflow-y-scroll  ">
          <h2 className=" font-Poppins text-center p-5 text-gray-200  text-[30px] border-b">
            Add Coupon
          </h2>
          <form onSubmit={handleAddCoupon}>
            <div className="mt-2 pl-2 pb-2">
              <label className=" text-gray-200 font-Roboto ">
                Coupon Name<span className="text-red-500 text-lg">* </span>
                <span>:</span>
              </label>
              <input
                type="text"
                name="couponName"
                value={couponName}
                required
                onChange={(e) => setCouponName(e.target.value)}
                placeholder="Enter the coupon name"
                className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-700 focus:border-blue-900"
              />
            </div>
            <div className="mt-2 pl-2 pb-2">
              <label className="text-gray-200 font-Roboto ">
                Discount(in percentage)
                <span className="text-red-400 text-lg">* </span>
                <span>:</span>
              </label>
              <input
                type="number"
                name="discount"
                value={discount}
                required
                onChange={(e) => setDiscount(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter the coupon discount in percentage"
                className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-2 pl-2 pb-2">
              <label className="text-gray-200 font-Roboto ">
                Minimum Amount<span className="text-red-400 text-lg">* </span>
                <span>:</span>
              </label>
              <input
                type="number"
                name="minAmount"
                value={minAmount}
                required
                onChange={(e) => setMinAmount(e.target.value)}
                onWheel={(e) => e.target.blur()}
                placeholder="Enter the minimum amount"
                className=" ml-1 mt-2 appearance-none w-[97%] border h-[35px] border-gray-300 rounded-sm px-3 text-sm placeholder-gray-400 focus:outline-none block focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-center items-center py-2 rounded shadow-sm mx-5  mt-3 bg-blue-700 hover:bg-blue-800">
              <button className=" text-white font-medium font-Roboto  ">
                Create Coupon
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className=" rounded-md     mt-[6rem]  flex  flex-col px-2 pt-1    justify-start  bg-[#1c3134] ">
          <div className="flex justify-center text-gray-200 h-10 text-2xl mb-2  font-Roboto font-bold items-center">
            Listed Coupon Codes
          </div>
          <DataGrid
            rows={row}
            columns={updatedColumns}
            pageSize={10}
            disableRowSelectionOnClick
            disableSelectionOnClick
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

export default CouponManagement;
