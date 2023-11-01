import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPartners } from "../../redux/actions/partner";
import { getAdminPartnerAllProperties } from "../../redux/actions/property";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const PartnersManagement = () => {
  const { allPartners, isLoading } = useSelector((state) => state.partner);
  const { partnerProperties } = useSelector((state) => state.property);
  const [propertiesShow, setPropertiesShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPartners());
  }, [dispatch]);
  const handlePropertiesView = (id) => {
    setPropertiesShow(!propertiesShow);
    dispatch(getAdminPartnerAllProperties(id));
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
      minWidth: 210,
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "name",
      headerName: "Partner Name",
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
      flex: 1.4,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "number",
      headerName: "mobile number",
      minWidth: 100,
      flex: 1,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
    },
    {
      field: "list",
      headerName: "Properties listed",
      minWidth: 100,
      flex: 0.7,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            color="primary"
            variant="contained"
            onClick={() => handlePropertiesView(params.id)}
          >
            <FiEye size={20} />
          </Button>
        );
      },
    },
  ];
  const row = [];
  allPartners &&
    allPartners.forEach((item, index) => {
      row.push({
        no: index + 1,
        id: item._id,
        name: item.personName,
        email: item.email,
        number: item.mobileNumber,
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
    if (column.headerName === "Partner Name") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "email") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "mobile number") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    if (column.headerName === "ID") {
      return { ...column, renderCell: CustomCellRenderer };
    }
    return column;
  });

  const handlePropDelete = async (propId) => {
    await axios
      .delete(`${server}/property/admin-delete-property/${propId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : propertiesShow ? (
        <div className="bg-[#090909]  h-[86vh] rounded-md  w-full overflow-y-scroll">
          <div className="flex justify-between sm:gap-0 gap-3 items-center sm:pl-5 pt-5 pb-5 border-">
            <FiArrowLeftCircle
              size={28}
              color="white"
              onClick={() => setPropertiesShow(!propertiesShow)}
            />
            <h1 className="text-gray-100 sm:text-2xl text-lg font-medium font-Roboto">
              Properties Listed
            </h1>
            <h1></h1>
          </div>
          <div className="flex justify-end items-center text-gray-100 py-3">
            <h1 className=" font-Roboto font-medium text-md tracking-wide pr-3">
              Total properties listed :
              <span className="text-red-500 text-lg font-bold">
                {" "}
                {partnerProperties && partnerProperties.length}{" "}
              </span>
            </h1>
          </div>

          {partnerProperties &&
            propertiesShow &&
            partnerProperties.map((item, index) => {
              return (
                <div className="bg-[#101020] rounded-md my-2 py-2">
                  <div className=" flex justify-end    mr-5  items-end">
                    <button
                      className="  bg-red-800 hover:bg-red-900 px-4 p-2 rounded-lg"
                      onClick={() => handlePropDelete(item._id)}
                    >
                      <MdDelete size={25} color="white" />
                    </button>
                  </div>

                  <div className="flex    border-gray-400 shadow-sm mx-2 mb-5">
                    <div className="flex md:justify-between justify-start md:flex-nowrap flex-wrap items-center  ">
                      <div className=" ">
                        <img
                          src={item.images[0].url}
                          alt=""
                          className="md:min-h-[15rem] md:min-w-[15rem] min-w-[5rem] min-h-[5rem] max-w-[5rem] max-h-[5rem] md:max-h-[15rem] md:max-w-[15rem] rounded-md "
                        />
                      </div>
                      <div className="sm:pl-5 font-Roboto text-gray-100">
                        <div className=" flex ">
                          <h1 className="font-medium md:text-lg">
                            property Name :
                          </h1>

                          <h1 className=" font-normal text-md pl-2 pt-[2px]">
                            {item.propertyName}
                          </h1>
                        </div>
                        <div className=" flex">
                          <h1 className="font-medium md:text-lg">Category:</h1>
                          <h1 className=" font-normal text-md pl-2 pt-[2px]">
                            {item.category}
                          </h1>
                        </div>
                        <div className=" flex">
                          <h1 className="font-medium md:text-lg">Price:</h1>
                          <h1 className=" font-normal text-md pl-2 pt-[2px]">
                            {item.price}
                          </h1>
                        </div>
                        <div className=" flex ">
                          <h1 className="font-medium md:text-lg">place:</h1>
                          <h1 className=" font-normal  whitespace-nowrap md:whitespace-normal md:text-md text-sm md:pl-2 pt-[2px]">
                            {item.currentLocation.placeName.split(",")[0]}
                          </h1>
                        </div>
                        <div className=" flex ">
                          <h1 className="font-medium md:text-lg">district:</h1>
                          <h1 className=" font-normal  whitespace-nowrap md:whitespace-normal md:text-md text-sm md:pl-2 pt-[2px]">
                            {item.currentLocation.placeName.split(",")[1]}
                          </h1>
                        </div>
                        <div className=" flex ">
                          <h1 className="font-medium md:text-lg">State:</h1>
                          <h1 className=" font-normal  whitespace-nowrap md:whitespace-normal md:text-md text-sm md:pl-2 pt-[2px]">
                            {item.currentLocation.placeName.split(",")[2]}
                          </h1>
                        </div>
                        <div className=" flex">
                          <h1 className="font-medium md:text-lg">
                            Total no of rooms:
                          </h1>
                          <h1 className=" font-normal text-md pl-2 pt-[2px]">
                            {item.roomsCount}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="w-full overflow-x-scroll h-[86vh]   overflow-y-scroll  px-1 pt-1  bg-[#1f1f41] ">
          <div className="flex justify-center text-gray-400 my-2 h-10 text-2xl   font-Roboto font-bold items-center">
            All Partners
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
      )}
    </>
  );
};

export default PartnersManagement;
