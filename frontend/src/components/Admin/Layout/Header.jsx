import React, { useState } from 'react'
import { BiMessageSquareDetail } from 'react-icons/bi';
import {IoMdCloseCircle} from "react-icons/io"
import { FiPackage } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../server';
import { toast } from 'react-toastify';
import logo from "../../../Assests/logo/logo3.png"

const Header = () => {
    const {user} = useSelector((state) => state.user);
    const [adminProfileShow, setAdminProfileShow] =  useState(false)
    const navigate = useNavigate()

    const handleAdminLogout = () => {
      axios.get(`${server}/user/logout`, {withCredentials: true})
      .then((res) => {
        toast.success(res.data.message);
        navigate("/admin")
      })
      .catch((error) =>{
        console.log(error.response.data.message)
      })
    }
  return (
    <>
        <div className="flex items-center justify-between w-full px-4 bg-[#090320]   fixed top-0 left-0 right-0    shadow-current shadow h-[80px] ">
          <div >
            <Link to="/admin-dashboard">
              <img
                src={logo}
                alt=""
                className="h-[50px] w-[150px]"
              />
            </Link>
          </div>
          <div className='sm:block hidden'>
            <h1 className=' text-3xl font-Roboto font-medium text-[#aea2a5]'>Admin Page</h1>
          </div>
          <div className=" flex items-center">
            <div className=" flex items-center sm:mr-8">
              
              
              <div onClick={() => setAdminProfileShow(!adminProfileShow)}>

                <img
                  src={`${user?.avatar.url}`}
                  alt=""
                  className="h-[50px] w-[50px] rounded-full shadow border-[1px]  border-gray-800 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        {adminProfileShow && (

          <div className=' absolute top-36  z-50 rounded-md md:left-[40%] left-[20%] right-[20%] md:right-[30%]  bg-[#0a225f]  shadow-lg ' >
            <div className=' flex justify-between px-3 pt-2'>
              <IoMdCloseCircle size={28} color='#D8D8D8' onClick={() => setAdminProfileShow(!adminProfileShow)}/>
              <button className=' font-Roboto font-bold border border-solid rounded-md px-2 shadow-md tracking-wide bg-[#f8f8f4] hover:bg-[#e3e3db]'
              onClick={() => handleAdminLogout()}
              >
                Log out
              </button>

            </div>
            <div className='flex justify-center pt-5'>
              <img src={`${user.avatar.url}`} alt=""  className='h-[100px] w-[100px] rounded-full border-[1px] shadow-md border-gray-00 object-cover'/>
            </div>
            <div className='flex justify-center pt-1  font-Roboto text-lg  font-medium mb-3'>
              <p className=' text-[#f8f8f4] font-Roboto tracking-wide'>
                {user.name}
              </p>

            </div>
            <div className=' flex justify-start items-center px-5 font-Roboto mb-4 '>
              <label className=' font-bold pr-3 text-[#f8f8f4]  tracking-wide' >
                Name:
              </label>
              <input type='text' value={user.name} readOnly className='  w-[80%]   font-medium px-2'/>

            </div>
            <div className=' flex justify-start items-center px-5 font-Roboto mb-4  '>
              <label className=' font-bold pr-3 text-[#f8f8f4]  tracking-wide' >
                Email:
              </label>
              <input type='email' value={user.email} readOnly className=' w-[80%]   font-medium px-2'/>

            </div>

            
          </div> 
        )}
          </>

      );
}

export default Header;