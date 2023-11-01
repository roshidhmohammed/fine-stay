import axios from "axios";
import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const PartnerWithdrawals = () => {
  const [selectOption, setSelectOption] = useState("1");
  const [withdrawOption, setWithdrawOption] = useState(false);
  const { partner } = useSelector((state) => state.partner);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    accntNo: null,
    holderName: "",
    ifscCode: "",
  });
  const [withdrawAmount, setWithdrawAmount] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      accountNumb: bankInfo.accntNo,
      holderName: bankInfo.holderName,
      ifscCode: bankInfo.ifscCode,
    };
    if (bankInfo.accntNo && bankInfo.accntNo.length === 13) {
      axios
        .put(
          `${server}/partner/create-withdraw-method`,
          { withdrawMethod },
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
    } else {
      toast.error("Please enter the valid account Number");
    }
  };

  const handleDelete = async () => {
    axios
      .delete(`${server}/partner/delete-withdraw-method`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Withdraw method deleted successfully");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
  };

  const withdrawHandler = async () => {
    if (withdrawAmount < 100 || withdrawAmount > partner?.availableBalance) {
      toast.error("you can't withdraw this amount");
    } else {
      axios
        .post(
          `${server}/withdraw/create-withdraw-request`,
          { withdrawAmount },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success("Withdrawal money request is successfull!");
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Transaction Id",
      headerClassName: "super-app-theme--header",
      minWidth: 150,
      flex: 0.7,
    },
    {
      field: "amount",
      headerName: "Amount",
      headerClassName: "super-app-theme--header",
      type: "number",
      minWidth: 100,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      minWidth: 100,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <>
            <Button color="success" variant="contained">
              Successfull
            </Button>
          </>
        );
      },
    },
    {
      field: "RequestedDate",
      headerName: "Requested Date",
      headerClassName: "super-app-theme--header",
      type: "number",
      minWidth: 110,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ApprovedOn",
      headerName: "Approved Date",
      headerClassName: "super-app-theme--header",
      type: "number",
      minWidth: 110,
      flex: 0.6,
      align: "center",
      headerAlign: "center",
    },
  ];

  const row = [];
  partner?.transaction.forEach((item) => {
    row.push({
      id: item._id,
      name: item.propertyName,
      amount: "₹" + item.amount,
      status: item.status,
      RequestedDate: item.createdAt.slice(0, 10),
      ApprovedOn: item.updatedAt.slice(0, 10),
    });
  });

  return (
    <div className="   ">
      {withdrawOption === true && (
        <div className=" z-[999999] absolute top-[28%] left-[30%]    right-[30%]">
          <div className=" bg-white py-3 px-5 shadow-lg border rounded-md">
            <div className=" flex justify-end mb-4">
              <GrClose size={20} onClick={() => setWithdrawOption(false)} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className=" flex flex-col ">
                <label className=" font-Roboto font-medium text-[17px] tracking-wide">
                  Bank Name
                </label>
                <input
                  type="text"
                  required
                  className="border uppercase bg-gray-50 focus:ring-1 focus:border-pink-500 focus:ring-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) => setBankInfo({ bankName: e.target.value })}
                />
              </div>
              <div className=" flex flex-col  mt-2 ">
                <label className=" font-Roboto font-medium text-[17px] tracking-wide">
                  Account Number
                </label>
                <input
                  type="number"
                  required
                  className="border  bg-gray-50 focus:ring-1 focus:border-pink-500 focus:ring-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) =>
                    setBankInfo({ ...bankInfo, accntNo: e.target.value })
                  }
                />
                <p className="text-red-900 font-medium">
                  {bankInfo.accntNo &&
                    bankInfo.accntNo.length > 13 &&
                    "please enter the valid number"}
                </p>
              </div>
              <div className=" flex flex-col  mt-2">
                <label className=" font-Roboto font-medium text-[17px] tracking-wide">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  required
                  className="border uppercase bg-gray-50 focus:ring-1 focus:border-pink-500 focus:ring-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) =>
                    setBankInfo({ ...bankInfo, holderName: e.target.value })
                  }
                />
              </div>
              <div className=" flex flex-col  mt-2">
                <label className=" font-Roboto font-medium text-[17px] tracking-wide">
                  IFSC Code
                </label>
                <input
                  type="text"
                  required
                  className="border uppercase bg-gray-50 focus:ring-1 focus:border-pink-500 focus:ring-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  onChange={(e) =>
                    setBankInfo({ ...bankInfo, ifscCode: e.target.value })
                  }
                />
              </div>
              <div className=" flex justify-center mt-3">
                <button
                  type="submit"
                  className=" border   rounded-lg shadow-md p-2 w-[10rem]   px-5 font-Poppins font-medium tracking-wider bg-blue-700 hover:bg-blue-800 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className=" flex  gap-3 absolute top-10 left-[30%] right-[30%]">
        <div
          className={`${
            selectOption === "1"
              ? "bg-red-700 text-black "
              : "bg-black text-white"
          } border font-Roboto font-medium rounded-md shadow-md p-2  tracking-wide text-lg`}
          onClick={() => setSelectOption("1")}
        >
          Withdraw Money
        </div>
        <div
          className={`${
            selectOption === "1"
              ? " bg-black text-white  "
              : "bg-red-700 text-black"
          } border font-Roboto font-medium rounded-md shadow-md p-2  tracking-wide text-lg`}
          onClick={() => setSelectOption("2")}
        >
          Previous Withdrawals
        </div>
      </div>
      {selectOption === "1" ? (
        <div className=" absolute flex flex-col top-[8rem] left-[3rem] right-[3rem]">
          {!partner.withdrawMethod && (
            <div className=" flex justify-center pt-5  ">
              <p
                className=" border font-Roboto font-medium text-lg p-2 rounded-md  bg-blue-800 text-white hover:bg-blue-950"
                onClick={() => setWithdrawOption(true)}
              >
                Add Withdraw Method
              </p>
            </div>
          )}
          {partner.withdrawMethod && (
            <div className=" flex flex-wrap justify-center pt-10 gap-5 sm:ml-0 ml-">
              <div className="border bg-white  flex flex-col ">
                <div className=" flex  justify-end pr-2 pt-2">
                  <RiDeleteBin6Line
                    size={24}
                    color="#bd251a"
                    className=" hover:cursor-pointer"
                    onClick={() => handleDelete()}
                  />
                </div>
                <div className=" flex flex-col pt-5 px-16  sm:px-5 ">
                  <label className=" font-Roboto   text-md font-medium ">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    required
                    value={partner.withdrawMethod.bankName}
                    className="border bg-gray-50 sm:w-[20rem] pl-2"
                    readOnly
                  />
                </div>
                <div className=" flex flex-col  pt-1 px-16 sm:px-5">
                  <label className=" font-Roboto  text-md font-medium ">
                    Account Number
                  </label>
                  <input
                    type="number"
                    required
                    value={partner.withdrawMethod.accountNumb}
                    className="border bg-gray-50 sm:w-[20rem] pl-2"
                    readOnly
                  />
                </div>
                <div className=" flex flex-col pt-1 px-16 sm:px-5">
                  <label className=" font-Roboto  text-md font-medium ">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={partner.withdrawMethod.holderName}
                    className="border bg-gray-50 sm:w-[20rem] pl-2"
                    readOnly
                  />
                </div>
                <div className=" flex flex-col pt-1 pb-5 px-16   sm:px-5">
                  <label className=" font-Roboto  text-md font-medium ">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    required
                    value={partner.withdrawMethod.ifscCode}
                    className="border bg-gray-50 sm:w-[20rem] pl-2"
                    readOnly
                  />
                </div>
              </div>
              <div className="border bg-white py-[4.5rem] flex flex-col ">
                <div className="  flex pt-5 px-10  ">
                  <h1 className=" font-Roboto font-bold text-red-700  text-lg ">
                    Available Balance:
                  </h1>
                  <span className=" font-Roboto ml-2 text-lg font-medium p-1 bg-red-700 text-gray-100">
                    ₹ {partner && partner.availableBalance}
                  </span>
                </div>
                <div className="  px-10 pt-2 flex flex-col">
                  <div className=" ">
                    <label className=" font-Roboto  font-medium">
                      Withdraw Money
                    </label>
                    <input
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      required
                      className="border w-20 ml-2"
                    />
                    <p className=" text-red-900">
                      {withdrawAmount < 100 &&
                        withdrawAmount > partner?.availableBalance &&
                        "You can't withdraw this amount"}
                    </p>
                  </div>
                  <div className=" flex justify-center mt-5">
                    <button
                      className=" font-Roboto font-medium border p-2 rounded-md  shadow-md bg-blue-800 text-white  hover:bg-blue-950 tracking-wide"
                      onClick={withdrawHandler}
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className=" absolute flex flex-col top-[8rem] left-[3rem] right-[3rem]">
          <Box
            sx={{
              height: 300,
              width: "100%",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              "& .super-app-theme--header": {
                backgroundColor: "#756b6b",
                color: "black",
              },
            }}
          >
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              rowSelection={false}
              autoHeight
            />
          </Box>
        </div>
      )}
    </div>
  );
};

export default PartnerWithdrawals;
