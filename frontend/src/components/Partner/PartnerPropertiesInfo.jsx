import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const PartnerPropertiesInfo = ({
  isOwner,
  setEditPartnerDetails,
  editPartnerDetails,
}) => {
  const [active, setActive] = useState(1);
  const { partner } = useSelector((state) => state.partner);
  const [newPassword, setNewpassword] = useState("");
  const [partnerName, setPartnername] = useState(partner?.personName);
  const [mobNumb, setMobNumb] = useState(partner?.mobileNumber);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [image, setImage] = useState(partner?.avatar.url);
  const [partnerEmail, setPartnerEmail] = useState(partner?.email);
  console.log(newPassword);

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleEditProfile = async () => {
    if (
      newPassword === "" &&
      partnerName === partner?.personName &&
      mobNumb === partner?.mobileNumber &&
      currentPassword === "" &&
      confirmNewPassword === "" &&
      image === partner?.avatar.url &&
      partnerEmail === partner?.email
    ) {
      toast.error("Sorry, You didn't update any details");
    } else if (newPassword !== confirmNewPassword) {
      toast.error(
        "New password doesn't match. Please enter the correct password"
      );
    } else {
      await axios
        .put(
          `${server}/partner/update-partner-info`,
          {
            partnerName,
            mobNumb,
            currentPassword,
            image,
            prevAvatarId: partner.avatar.public_id,
            newPassword,
            oldEmail: partner.email,
          },
          { withCredentials: true }
        )
        .then((res) => {
          toast.success(res.data.message);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-end  w-full">
        {isOwner && (
          <div>
            <Link to="/dashboard">
              <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                <span className="text-[#fff]">Go to dashboard</span>
              </div>
            </Link>
          </div>
        )}
        <div></div>
      </div>
      {editPartnerDetails && (
        <div className=" bg-white mt-3  py-3">
          <div className=" flex justify-center font-Roboto font-medium  text-[20px] ">
            Edit Profile Details
          </div>
          <div className=" flex justify-center mt-3">
            <div className=" relative">
              <img
                src={image}
                alt=""
                className="h-[150px] w-[150px] border-blue-600 border  rounded-full "
              />
              <div>
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  accept=""
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <FiCamera
                    color="black"
                    size={20}
                    className=" bg-white absolute right-1  bottom-[20%]   "
                  />
                </label>
              </div>
            </div>
          </div>
          <div className=" flex flex-col sm:px-20 px-1 mt-5 gap-3 ">
            <div className=" flex flex-col">
              <label className=" font-Roboto font-medium text-[18px]">
                Name
              </label>
              <input
                type="text"
                value={partnerName}
                className=" border "
                onChange={(e) => setPartnername(e.target.value)}
              />
            </div>

            <div className=" flex flex-col">
              <label className=" font-Roboto font-medium text-[18px]">
                Mobile Number
              </label>
              <input
                type="number"
                value={mobNumb}
                className=" border "
                onChange={(e) => setMobNumb(e.target.value)}
              />
            </div>
            <div className=" flex flex-col">
              <label className=" font-Roboto font-medium text-[18px]">
                Enter Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                className=" border "
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className=" flex flex-col">
              <label className=" font-Roboto font-medium text-[18px]">
                Enter New Password
              </label>
              <input
                type="password"
                value={newPassword}
                className=" border "
                onChange={(e) => setNewpassword(e.target.value)}
              />
            </div>
            <div className=" flex flex-col">
              <label className=" font-Roboto font-medium text-[18px]">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmNewPassword}
                className=" border "
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex justify-center mt-5">
            <button
              className=" font-Roboto font-medium p-2 px-10 bg-blue-700 hover:bg-blue-800 text-gray-100  rounded-lg tracking-wide"
              onClick={() => handleEditProfile()}
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerPropertiesInfo;
