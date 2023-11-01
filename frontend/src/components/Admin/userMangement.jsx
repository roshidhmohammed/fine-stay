import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { blockUser, unblockUser } from "../../redux/actions/user";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";

const UserMangement = () => {
  const { allUsers, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleBlockUser = (id) => {
    dispatch(blockUser(id));

    setTimeout(() => {
      window.location.reload();
    }, 3000);
    if (success) {
      toast.success(`${id} is blocked`);
    }
  };

  const handleUnblockUser = (id) => {
    dispatch(unblockUser(id));
    setTimeout(() => {
      window.location.reload();
    }, 3000);

    if (success) {
      toast.success(`${id} is unblocked`);
    }
  };

  const columns = [
    {
      field: "no",
      headerName: "Sl-No",
      minWidth: 150,
      flex: 0.9,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "id",
      headerName: "ID",
      minWidth: 200,
      flex: 0.9,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "email",
      headerName: "email",
      minWidth: 240,
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
            {params.value === 0 ? (
              <Button
                color="error"
                variant="contained"
                onClick={() => handleBlockUser(params.id)}
              >
                block
              </Button>
            ) : (
              <Button
                color="success"
                variant="contained"
                onClick={() => handleUnblockUser(params.id)}
              >
                UnBlock
              </Button>
            )}
          </>
        );
      },
    },
  ];
  const row = [];
  allUsers &&
    allUsers.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.name,
        email: item.email,
        Delete: item.isAvailable ? 1 : 0,
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
    if (column.headerName === "Name") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "email") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "ID") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });
  return (
    <>
      <div className="w-full  px-1 pt-1  rounded-md    bg-[#100a35fd]  ">
        <div className="flex justify-center h-10 text-2xl text-gray-400 mb-1   font-Roboto font-bold items-center">
          All Users
        </div>
        <DataGrid
          rows={row}
          columns={updatedColumns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
          rowSelection={false}
        />
        <style>
          {`
          .custom-header {
            color: ${headerCellStyle.color};
          }
          
          
        `}
        </style>
      </div>
    </>
  );
};

export default UserMangement;
