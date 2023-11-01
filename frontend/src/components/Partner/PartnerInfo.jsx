import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios"
import { server } from "../../server";
import { toast } from "react-toastify";

const PartnerInfo = ({ isOwner, setEditPartnerDetails }) => {
  const { partner } = useSelector((state) => state.partner);

  const LogOutHandler =async () =>{
    axios.get(`${server}/partner/logOut`, {withCredentials:true})
    .then((res) => {
      toast.success(res.data.message);
      window.location.reload();
    })
    .catch((error) =>{
      console.log(error.response.data.message)
    })
    
  }
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex  items-center justify-center">
          <img
            src={partner.avatar.url}
            alt=""
            className="w-[150px] h-[150px] object-cover rounded-full "
          />
        </div>
        <h3 className=" text-center py-2 text-[20px] ">{partner.personName}</h3>
      </div>
      <div className="p-3 flex">
        <h5 className=" font-[600]">Property Name:</h5>
        <h4 className="text-[#0e0d0def] pl-1  font-normal">
          {partner.propertyName}
        </h4>
      </div>
      <div className="p-3 flex">
        <h5 className=" font-[600]">Phone Number:</h5>
        <h4 className="text-[#0e0d0def] pl-1  font-normal">
          {partner.mobileNumber}
        </h4>
      </div>
      <div className="p-3 flex">
        <h5 className=" font-[600]">Email:</h5>
        <h4 className="text-[#0e0d0def] pl-1  font-normal">{partner.email}</h4>
      </div>
      <div className="p-3 flex">
        <h5 className=" font-[600]">Total Listed Properties:</h5>
        <h4 className="text-[#0e0d0def] pl-1  font-normal">10</h4>
      </div>
      <div className="p-3 flex">
        <h5 className=" font-[600]">Joined On:</h5>
        <h4 className="text-[#0e0d0def] pl-1  font-normal">
          {partner.createdAt.slice(0, 10)}
        </h4>
      </div>

      {isOwner && (
        <div className="py-3 px-4 ">
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[50x] hover:bg-slate-900`}
          onClick={() => setEditPartnerDetails(true)}
          >
            <span className="text-white">Edit Partner Details</span>
          </div>
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[50x] hover:bg-slate-900`} 
          onClick={LogOutHandler}>
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerInfo;
