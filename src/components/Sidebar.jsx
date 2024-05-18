import React, { useEffect, useState } from 'react'
import mainLogo from '../icons/gazi_university_logo.png';
import { FaUser, FaBuilding, FaRegBookmark, FaRegListAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { IoIosMail, IoMdMenu } from "react-icons/io";
import { FaWpforms } from "react-icons/fa6";
import { RiSurveyFill } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout, setUser } from '../store/auth';
import { CiLogout } from 'react-icons/ci';
import { TfiAnnouncement } from "react-icons/tfi";

import { MdEdit, MdGroups, MdOutlineAppRegistration } from "react-icons/md";

function Sidebar() {

    const navigate = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth);
    const { userRole } = useSelector(state => state.auth);
    const [pendingApiCall, setPendingApiCall] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {

        if (localStorage.getItem("userData") !== null && localStorage.getItem("userRole") === "STUDENT") {
            axios.get(`/students/${JSON.parse(localStorage.getItem("userData"))?.ogrenciNo}`)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setUser(res.data));
                        setPendingApiCall(false)
                    }
                })

        }
        else if (localStorage.getItem("userData") !== null && localStorage.getItem("userRole") === "COMPANY") {
            axios.get(`/company/${JSON.parse(localStorage.getItem("userData"))?.firmaId}`)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setUser(res.data));
                        setPendingApiCall(false)
                    }
                })
        } else if (localStorage.getItem("userData") !== null && localStorage.getItem("userRole") === "LECTURER") {
            axios.get(`/lecturer/${JSON.parse(localStorage.getItem("userData"))?.izleyiciId}`)
                .then((res) => {
                    if (res.status === 200) {
                        dispatch(setUser(res.data));
                        setPendingApiCall(false)
                    }
                })
        }


    }, [dispatch, pendingApiCall])

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1280) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [windowWidth]);

    console.log(user)
    if (!user) {
        return null; // Kullanıcı giriş yapmamışsa, sidebar'ı gösterme
    }

    function handleNavigate() {
        if (userRole === "STUDENT") {
            navigate(`/student-profile`)
        } else if (userRole === "COMPANY") {
            navigate(`/company-profile`)
        } else if (userRole === "LECTURER") {
            navigate(`/lecturer-profile`)
        } else if (userRole === "COMMISSION") {
            navigate(`/commission-profile`)
        }
    }


    return (

        <div  className=''>

            {isSidebarOpen ? (
                <div  className=' mr-3'>
                    <IoMdMenu  className='text-3xl ml-6 mt-3  cursor:pointer' onClick={toggleSidebar} />
                </div>) : (
                <aside id="logo-sidebar"  className="bg-dark-blue   fixed top-0 left-0 z-40 ${
                isSidebarOpen 
                    ? 'w-48' 
                    : 'w-32 xl:w-48 2xl:w-64 h-screen' 
            } h-screen transition-transform md-translate-x-full sm:translate-x-0" aria-label="Sidebar">



                    <div  className="h-full px-3 py-4 overflow-y-auto ">
                        <div  className='bg-dark-blue mb-3 w-[30px] ml-auto  rounded-full '>
                            <IoMdMenu onClick={toggleSidebar}  className={` cursor:pointer text-3xl font-bold text-slate-400  bg-dark-blue `} />
                        </div>

                        <a href={userRole === "COMPANY" ? "/company-profile" : "/"}  className="flex justify-between items-center ps-2.5 mb-5">
                            <img src={mainLogo}  className="h-16 me-3 " alt="Gazi Logo" />
                            <span  className="self-center text-xl md:text-lg sm:text-xs font-semibold   text-white">İş Yeri Eğitimi Platformu</span>
                        </a>
                        <hr  className='text-white pb-3' />
                        <ul  className="space-y-2 font-medium">
                            <li  className='hover:bg-[#BCDCF5] duration-200  ' onClick={handleNavigate}>
                                <a href=""  className="rounded-mg flex items-center p-2 rounded-lg text-white hover:text-dark-blue dark:hover:bg-light-blue group">
                                    <FaUser  className='text-xl' />
                                    {pendingApiCall ? <span  className="ms-3">
                                        Yukleniyor
                                    </span> : <span  className="ms-3">
                                        {userRole === "STUDENT" && user && user?.ogrenciAd && user?.ogrenciSoyad && `${user.ogrenciAd} ${user.ogrenciSoyad}`}
                                        {userRole === "COMPANY" && `${user?.firmaAd}`}
                                        {userRole === "LECTURER" && `${user?.izleyiciAd} ${user?.izleyiciSoyad}`}
                                    </span>}

                                </a>
                            </li>
                            {
                                userRole !== 'COMPANY' && (
                                    <li  className='hover:bg-[#BCDCF5]  duration-200  '>
                                        <a href="/companies"  className="rounded-mg flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                            <FaBuilding  className='text-xl' />
                                            <span  className="ms-3">Firmalar</span>
                                        </a>
                                    </li>
                                )
                            }
                            {
                                userRole === 'LECTURER' && (
                                    <li  className='hover:bg-[#BCDCF5]  duration-200 hover:text-dark-blue'>
                                        <a href="/student-group"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                            <MdGroups  className='text-2xl' />
                                            <span  className="flex-1 ms-3 whitespace-nowrap">Gruptaki Ogrenciler</span>
                                        </a>
                                    </li>

                                )
                            }
                            {
                                userRole === 'COMPANY' && (
                                    <>

                                        <li  className='hover:bg-[#BCDCF5]  duration-200 hover:text-dark-blue'>
                                            <a href="/share-announcement"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                                <TfiAnnouncement  className='text-xl' />
                                                <span  className="flex-1 ms-3 whitespace-nowrap">İlan ver</span>
                                            </a>
                                        </li>
                                        {/* <li  className='hover:bg-[#BCDCF5]  duration-200 hover:text-dark-blue'>
                                            <a href="/apply-list"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                                <FaRegListAlt  className='text-xl opacity-80' />
                                                <span  className="flex-1 ms-3 whitespace-nowrap">Başvuruları görüntüle</span>
                                            </a>
                                        </li> */}
                                    </>
                                )
                            }
                            {
                                userRole === 'STUDENT' && (<>

                                    <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                        <a href="/applications"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                            <MdOutlineAppRegistration  className='text-2xl' />

                                            <span  className="flex-1 ms-3 whitespace-nowrap">Başvurular</span>
                                        </a>
                                    </li>
                                    <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                        <a href="/weekly-report"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                            <MdEdit  className='text-2xl' />
                                            <span  className="flex-1 ms-3 whitespace-nowrap">Haftalık Rapor</span>
                                        </a>
                                    </li>
                                    <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                        <a href="/favorite-announcements"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue  group">
                                            <FaRegBookmark  className='text-2xl' />
                                            <span  className="flex-1 ms-3 whitespace-nowrap">Favori ilanlar</span>
                                        </a>
                                    </li>

                                </>
                                )
                            }

                            <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                <a href="#"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue ">
                                    <IoIosMail  className='text-2xl' />
                                    <span  className="flex-1 ms-3 whitespace-nowrap">Gelen Kutusu</span>
                                    <span  className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white ">3</span>
                                </a>
                            </li>
                            <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                <a href="/forms"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue ">
                                    <FaWpforms  className='text-2xl' />
                                    <span  className="flex-1 ms-3 whitespace-nowrap">Formlar</span>
                                </a>
                            </li>
                            <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                <a href="#"  className="flex items-center p-2  rounded-lg text-white hover:text-dark-blue " >

                                    <RiSurveyFill  className='text-2xl' />
                                    <span  className="flex-1 ms-3 whitespace-nowrap">Anketler</span>
                                </a>
                            </li>
                            <li  className='hover:bg-[#BCDCF5] duration-200 hover:text-dark-blue'>
                                <a onClick={() => {
                                    dispatch(logout());
                                    navigate("/login");
                                }}  className="flex items-center p-2 cursor-pointer  rounded-lg text-white hover:text-dark-blue hover:bg-light-blue ">
                                    <CiLogout  className='text-2xl' />
                                    <span  className="flex-1 ms-3 whitespace-nowrap">Çıkış Yap</span>
                                </a>
                            </li>

                        </ul>
                    </div>
                </aside>
            )}







        </div>

    )
}

export default Sidebar