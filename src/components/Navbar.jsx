import React, { useEffect, useState } from "react";
import { FaMicroblog } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { SlNote } from "react-icons/sl";
import { IoMdMenu } from "react-icons/io";


function Navbar({ setIsSidebarOpen, isSidebarOpen }) {
  const navigate = useNavigate();
  const [searchUserByUsername, setSearchUserByUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    setIsLoggedIn(window.localStorage.getItem("isLoggedIn"))
  }, []);
  function handleSearchClick(e) {
    e.preventDefault();
    window.localStorage.setItem("searchUserByUsername", searchUserByUsername)
    navigate("/viewProfile")
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div  className="bg-dark-blue flex justify-between p-3 items-center fixed top-0 left-0 right-0 z-50">
            <div  className="pl-5 flex justify-between items-center gap-5 ">
        
      </div>

      <div  className="w-2/5 text-slate-200 font-bold  p-2 rounded-md h-full">
        <form >
          <label
            htmlFor="default-search"
             className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div  className="relative">
            <div  className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <IoSearchSharp />
            </div>
            <input
              type="search"
              id="default-search"
               className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              onChange={(e) => setSearchUserByUsername(e.target.value)}
              required
            />
            <button
              onClick={handleSearchClick}
              type="submit"
               className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      <div  className="flex justify-between items-center gap-5 pr-8">
        {isLoggedIn ? (
          <div  className='flex justify-between gap-4 items-center pr-6 '>
            <SlNote onClick={() => navigate('/share')}  className="cursor-pointer text-3xl text-slate-200" />
            <RxAvatar onClick={() => navigate('/profile')}  className="cursor-pointer text-4xl text-slate-200" />
          </div>
        ) : (
          <div  className='flex justify-between gap-2 items-center font-body'>          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;
