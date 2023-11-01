import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { server } from "../../server";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";

const AdminWithdrawMoney = ({
  setWithdrawDetailsShow,
  setWithdrawId,
  setWithdrawData,
  withdrawData,
}) => {
  const { user } = useSelector((state) => state.user);
  const [withdrawStatusOption, setWithdrawStatusOption] = useState(1);

  useEffect(() => {
    getAllWithdrawals();
  }, []);

  const getAllWithdrawals = async () => {
    await axios
      .get(`${server}/withdraw/get-all-withdraws`, { withCredentials: true })
      .then((res) => {
        setWithdrawData(res.data.allWithdraws);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const handleWithdraws = async (id) => {
    setWithdrawDetailsShow(true);
    setWithdrawId(id);
  };
  const columnsRequests = [
    {
      field: "no",
      headerName: "Sl-no",
      minWidth: 120,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "id",
      headerName: "Withdraw id",
      minWidth: 220,
      flex: 1.9,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "partnerId",
      headerName: "Partner Id",
      minWidth: 220,
      flex: 2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Partner Name",
      minWidth: 200,
      flex: 1.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "mob",
      headerName: "Mob No",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "RequestedOn",
      headerName: "Requested On",
      minWidth: 190,
      flex: 1.3,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "preview",
      headerName: "preview",
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
            <Button
              color="warning"
              variant="contained"
              onClick={() => handleWithdraws(params.id)}
            >
              <FiEye />
            </Button>
          </>
        );
      },
    },
  ];

  const columnsAccepted = [
    {
      field: "no",
      headerName: "Sl-no",
      minWidth: 120,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "id",
      headerName: "Withdraw id",
      minWidth: 220,
      flex: 1.9,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "partnerId",
      headerName: "Partner Id",
      minWidth: 220,
      flex: 2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Partner Name",
      minWidth: 200,
      flex: 1.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      renderCell: (params) => {
        return (
          <>
            <div className="p-2 text-lg  font-Roboto font-medium text-white tracking-wide bg-green-700">
              success
            </div>
          </>
        );
      },
    },
    {
      field: "mob",
      headerName: "Mob No",
      minWidth: 200,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "RequestedOn",
      headerName: "Requested On",
      minWidth: 220,
      flex: 1.3,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },

    {
      field: "VerifiedOn",
      headerName: "Verified On",
      type: "number",
      minWidth: 220,
      flex: 1.0,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
  ];

  const rowAccepted = [];
  const filterWithdrawDataBySucceed = withdrawData?.filter(
    (item) => item.status === "succeed"
  );

  filterWithdrawDataBySucceed?.forEach((item, index) => {
    rowAccepted.push({
      no: index + 1,
      id: item._id,
      partnerId: item.partner._id,
      name: item.partner.personName,
      amount: item.amount,
      mob: item.partner.mobileNumber,
      RequestedOn: item.createdAt.slice(0, 10),
      VerifiedOn: item.updatedAt.slice(0, 10),
    });
  });

  const rowRequested = [];
  const filterWithdrawData = withdrawData?.filter(
    (item) => item.status === "processing..."
  );

  filterWithdrawData?.forEach((item, index) => {
    rowRequested.push({
      no: index + 1,
      id: item._id,
      partnerId: item.partner._id,
      name: item.partner.personName,
      amount: item.amount,
      status: item.status,
      mob: item.partner.mobileNumber,
      RequestedOn: item.createdAt.slice(0, 10),
    });
  });

  const headerCellStyle = {
    color: "white",
  };

  const CustomCellRenderer = ({ value }) => (
    <span style={{ color: "white", border: "  white" }}>{value}</span>
  );

  const updatedColumns = columnsRequests.map((column) => {
    if (column.field === "id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Sl-no") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Withdraw id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Partner Id") {
      return { ...column, renderCell: CustomCellRenderer };
    }

    if (column.headerName === "Partner Name") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Amount") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Status") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Mob No") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Requested On") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });

  const updatedColumnsAccepted = columnsAccepted.map((column) => {
    if (column.field === "id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Sl-no") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Withdraw id") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Partner Id") {
      return { ...column, renderCell: CustomCellRenderer };
    }

    if (column.headerName === "Partner Name") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Amount") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Mob No") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Requested On") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "Verified On") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });
  return (
    <>
      <div className="flex justify-start      text-lg md:px-5 px-20 font-Roboto  font-medium  gap-3 mt-5">
        <div
          className={`${
            withdrawStatusOption === 1
              ? "text-gray-800  bg-red-700"
              : "text-white"
          } border border-solid  md:h-9 h-16 px-2 rounded-md  shadow-md py-1`}
          onClick={() => setWithdrawStatusOption(1)}
        >
          Withdrawal Requests
        </div>
        <div
          className={` ${
            withdrawStatusOption === 2
              ? "text-gray-800  bg-red-700"
              : "text-white "
          }  border  md:h-9 h-16 px-2 rounded-md  shadow-md py-1`}
          onClick={() => setWithdrawStatusOption(2)}
        >
          Accepted Withdrawals
        </div>
      </div>
      {withdrawStatusOption === 1 && (
        <div className=" rounded-md w-[79%] overflow-x-scroll overflow-y-scroll h-[60vh]   mt-[6rem] absolute right-[10%] left-[20%] xl:px-5 lg:px-16 md:px-24 sm:px-[7.2rem] px-2 pt-1   bg-[#1c3134] ">
          <div className="flex justify-center  text-gray-200 py-1 text-2xl mb-5  font-Roboto font-bold items-center">
            Requested Withdrawals
          </div>
          <DataGrid
            rows={rowRequested}
            columns={updatedColumns}
            pageSize={10}
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
      {withdrawStatusOption === 2 && (
        <div className=" rounded-md w-[79%] overflow-x-scroll overflow-y-scroll h-[60vh]   mt-[6rem] absolute right-[10%] left-[20%] xl:px-5 lg:px-16 sm:px-28 px-2 pt-1   bg-[#1c3134]">
          <div className="flex justify-center text-gray-200 py-1 text-2xl mb-5  font-Roboto font-bold items-center">
            Accepted Withdrawals
          </div>
          <DataGrid
            rows={rowAccepted}
            columns={updatedColumnsAccepted}
            pageSize={10}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
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

export default AdminWithdrawMoney;
