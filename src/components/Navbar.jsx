import React, { useEffect, useState } from "react";
import { FaMicroblog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { SlNote } from "react-icons/sl";
import { IoMdMenu } from "react-icons/io";
import { useSelector } from "react-redux";
import mainLogo from "../icons/gazi_university_logo.png"
function Navbar({ setIsSidebarOpen, isSidebarOpen }) {
  const navigate = useNavigate();
  const [searchUserByUsername, setSearchUserByUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState();
  const { user,userRole } = useSelector(state => state.auth);
  
  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("isLoggedIn"));
  }, []);
  
  function handleSearchClick(e) {
    e.preventDefault();
    window.localStorage.setItem("searchUserByUsername", searchUserByUsername);
    navigate("/viewProfile");
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  if (!user) {
    return null 
  }
  
  return (
    <div className="bg-dark-blue  flex items-center text-center justify-between p-3   top-0 w-full ">
      
      <div className="w-full justify-center flex items-center h-16 text-slate-200 font-bold p-2 rounded-md ">
      <a href={userRole === "COMPANY" ? "/company-profile" : "/"} >
                                <img src={mainLogo} className="h-16 me-3" alt="Gazi Logo" />
                            </a>
      <span className="self-center text-xl md:text-lg sm:text-xs font-semibold text-white">İş Yeri Eğitimi Platformu</span>

      </div>
      <div className="flex justify-between items-center gap-5 pr-8">
        {isLoggedIn ? (
          <div className='flex justify-between gap-4 items-center pr-6 '>
            <SlNote onClick={() => navigate('/share')} className="cursor-pointer text-3xl text-slate-200" />
            <RxAvatar onClick={() => navigate('/profile')} className="cursor-pointer text-4xl text-slate-200" />
          </div>
        ) : (
          <div className='flex justify-between gap-2 items-center font-body'></div>
        )}
      </div>
    </div>
  );
}

export default Navbar;