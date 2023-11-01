import React, { useState } from "react";
import Header from "../../components/Admin/Layout/Header";
import SideNavbar from "../../components/Admin/Layout/SideNavbar";
import AdminWithdrawMoney from "../../components/Admin/AdminWithdrawMoney";
import AdminWithdrawDetails from "../../components/Admin/AdminWithdrawDetails";

const AdminWithdrawMoneyPage = () => {
  const [withdrawDetailsShow, setWithdrawDetailsShow] = useState(false);
  const [withdrawId, setWithdrawId] = useState();
  const [withdrawData, setWithdrawData] = useState([]);
  return (
    <div className="bg-[#222020] ">
      <Header />
      <div className="flex mt-[5rem]   justify-between w-full">
        <div className=" w-20  sm:w-[350px]">
          <SideNavbar active={10} />
        </div>
        {withdrawDetailsShow ? (
          <div className=" flex justify-center min-h-[90vh]  overflow-y-scroll bg-[#09091c]  w-full">
            <AdminWithdrawDetails
              withdrawData={withdrawData}
              withdrawId={withdrawId}
              setWithdrawDetailsShow={setWithdrawDetailsShow}
            />
          </div>
        ) : (
          <div className=" flex justify-center  min-h-[90vh]  overflow-y-scroll bg-[#09091c] w-full">
            <AdminWithdrawMoney
              withdrawData={withdrawData}
              setWithdrawData={setWithdrawData}
              setWithdrawDetailsShow={setWithdrawDetailsShow}
              setWithdrawId={setWithdrawId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminWithdrawMoneyPage;
