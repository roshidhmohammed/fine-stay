import React from "react";
import { GrLogout } from "react-icons/gr";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LogOut = ({ profiles, profileShow, setProfileShow }) => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  return (
    <div>
      <button
        className=" flex border-2 tracking-wide  border-solid shadow-md px-3 py-1 rounded-md  hover:bg-black font-Roboto  font-medium "
        onClick={handleLogOut}
      >
        log out
      </button>
    </div>
  );
};

export default LogOut;
