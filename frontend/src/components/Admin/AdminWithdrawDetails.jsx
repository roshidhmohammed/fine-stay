import axios from "axios";
import React, { useState } from "react";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { server } from "../../server";
import { toast } from "react-toastify";

const AdminWithdrawDetails = ({
  setWithdrawDetailsShow,
  withdrawId,
  withdrawData,
}) => {
  const [changeStatus, setChangeStatus] = useState("processing...");

  const filterWithdrawById = withdrawData?.filter(
    (item) => item._id === withdrawId
  );

  const handleUpdateWithdraw = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw-status/${withdrawId}`,
        { partnerId: filterWithdrawById[0].partner._id },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Successfully forwarded Withdraw Request!");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <>
      <div className=" bg-[#090909]  w-full ">
        <div className=" flex justify-between px-10 pt-5  items-center border-b  pb-5">
          <div>
            <IoIosArrowDropleftCircle
              size={34}
              color="white"
              className=" hover:cursor-pointer"
              onClick={() => setWithdrawDetailsShow(false)}
            />
          </div>
          <div className=" font-Roboto text-[24px] font-medium text-white tracking-wide">
            Withdraw Request
          </div>
          <div></div>
        </div>
        <div className=" flex justify-center flex-wrap gap-5 text-white font-Roboto pt-5 px-10">
          <div className="border p-5 flex flex-col bg-[#20203b] overflow-x-scroll ">
            <div className=" flex  text-lg pb-1">
              <h1 className=" font-medium  mr-2">Name:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner?.personName}
              </span>
            </div>
            <div className=" flex  text-lg pb-1">
              <h1 className=" font-medium  mr-2">Email:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner?.email}
              </span>
            </div>
            <div className=" flex  text-lg pb-1">
              <h1 className=" font-medium  mr-2">Mob:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner?.mobileNumber}
              </span>
            </div>
            <div className=" flex  text-lg pb-1">
              <h1 className=" font-medium  mr-2">Amount:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].amount}
              </span>
            </div>
            <div className=" flex  text-lg pb-1">
              <h1 className=" font-medium  mr-2">Status:</h1>

              <select
                className=" bg-black p-1 hover:cursor-pointer "
                onChange={(e) => setChangeStatus(e.target.value)}
              >
                <option value={filterWithdrawById[0].status}>
                  {filterWithdrawById[0].status}
                </option>
                <option value="succeed">Succeed</option>
              </select>
            </div>
            <div className=" flex  text-lg pb-1">
              <h1 className=" font-medium  mr-2">Requested On:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].createdAt.slice(0, 10)}
              </span>
            </div>
            {changeStatus === "succeed" && (
              <div className=" flex justify-end mt-3  ">
                <button
                  className=" border font-Roboto font-medium p-1 tracking-wide  px-2  bg-red-900 hover:bg-red-950 rounded-md shadow-md"
                  onClick={handleUpdateWithdraw}
                >
                  Update
                </button>
              </div>
            )}
          </div>
          <div className="border font-Roboto  flex flex-col bg-[#20203b] overflow-x-scroll">
            <div className=" font-Roboto text-lg py-3  bg-[#0f0f74]  flex justify-center items-center  ">
              Bank Details
            </div>

            <div className=" flex  text-lg border-t px-5 pt-2 pb-1">
              <h1 className=" font-medium  mr-2">Bank Name:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner.withdrawMethod.bankName}
              </span>
            </div>
            <div className=" flex  text-lg  px-5 pb-1">
              <h1 className=" font-medium  mr-2">Account Number:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner.withdrawMethod.accountNumb}
              </span>
            </div>
            <div className=" flex  text-lg  px-5 pb-1">
              <h1 className=" font-medium  mr-2">Holder Name:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner.withdrawMethod.holderName}
              </span>
            </div>
            <div className=" flex  text-lg  px-5 pb-1">
              <h1 className=" font-medium  mr-2">Ifsc Code:</h1>
              <span className="text-gray-100">
                {filterWithdrawById[0].partner.withdrawMethod.ifscCode}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminWithdrawDetails;
