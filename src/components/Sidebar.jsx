import React, { useEffect, useState } from 'react';
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
import { BsFillQuestionOctagonFill } from 'react-icons/bs';
import FeedbackModal from './FeedbackModal';
import Loading from './Loading';
import { IoHome } from 'react-icons/io5';

function Sidebar() {

    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const { user, userRole } = useSelector(state => state.auth);
    const [pendingApiCall, setPendingApiCall] = useState(true);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            const userData = JSON.parse(localStorage.getItem("userData"));
            const role = localStorage.getItem("userRole");
            console.log("userData : ", userData)
            console.log("userRole : ", role)
            if (userData && role) {
                let endpoint = '';
                if (role === "STUDENT") endpoint = `/students/${userData?.ogrenciNo}`;
                else if (role === "COMPANY") endpoint = `/company/${userData?.firmaId}`;
                else if (role === "LECTURER") endpoint = `/lecturer/${userData?.izleyiciId}`;
                else if (role === "COMMISSION") endpoint = `/commission/${userData?.komisyonId}`;

                if (endpoint) {
                    try {
                        const res = await axios.get(endpoint);
                        if (res.status === 200) {
                            dispatch(setUser(res.data));
                            setPendingApiCall(false);
                            console.log('User data fetched and set:', res.data);
                        }
                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }
            }
        };

        fetchData();
    }, [dispatch, pendingApiCall]);

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


    if (!user) {
        return null; // Kullanıcı giriş yapmamışsa, sidebar'ı gösterme
    }

    const handleNavigate = () => {
        if (userRole === "STUDENT") navigate(`/student-profile`);
        else if (userRole === "COMPANY") navigate(`/company-profile`);
        else if (userRole === "LECTURER") navigate(`/lecturer-profile`);
        else if (userRole === "COMMISSION") navigate(`/commission-profile`);
    };

    const handleShowFeedback = () => {
        setShowFeedbackModal(!showFeedbackModal);
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/login");

    };

    return (
        <>
            {pendingApiCall && <Loading />}
            <div>
                {isSidebarOpen ? (
                    <div className='mr-3'>
                        <IoMdMenu className='text-3xl ml-6 mt-3 cursor:pointer' onClick={toggleSidebar} />
                    </div>
                ) : (
                    <aside id="logo-sidebar" className={`bg-dark-blue fixed top-0 left-0  ${isSidebarOpen ? 'w-48' : 'w-32 xl:w-48 2xl:w-64 '} h-screen transition-transform md-translate-x-full sm:translate-x-0`} aria-label="Sidebar">
                        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto">
                            <div className='bg-dark-blue mb-3 w-[30px]  ml-auto rounded-full'>
                                <IoMdMenu onClick={toggleSidebar} className='cursor:pointer text-3xl font-bold text-slate-400 bg-dark-blue' />
                            </div>
                            

                            <hr className='text-white pb-3' />
                            <div className="flex-grow">
                                <ul className="space-y-2 font-medium">
                                    <li className='hover:bg-light-blue duration-200' onClick={handleNavigate}>
                                        <a href="#" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue dark:hover:bg-light-blue group">
                                            <FaUser className='text-xl' />
                                            {pendingApiCall ? <span className="ms-3">Yukleniyor</span> : (
                                                <span className="ms-3">
                                                    {userRole === "STUDENT" && user?.ogrenciAd && user?.ogrenciSoyad && `${user.ogrenciAd} ${user.ogrenciSoyad}`}
                                                    {userRole === "COMPANY" && `${user?.firmaAd}`}
                                                    {userRole === "LECTURER" && `${user?.izleyiciAd} ${user?.izleyiciSoyad}`}
                                                    {userRole === "COMMISSION" && `${user?.komisyonAd} ${user?.komisyonSoyad}`}
                                                </span>
                                            )}
                                        </a>
                                    </li>
                                    {userRole === 'STUDENT' && (
                                        <>
                                        <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                                <a href="/" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                    <IoHome className='text-2xl' />
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Ana Sayfa</span>
                                                </a>
                                            </li>
                                            <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                                <a href="/applications" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                    <MdOutlineAppRegistration className='text-2xl' />
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Başvurularım</span>
                                                </a>
                                            </li>
                                            <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                                <a href="/weekly-report" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                    <MdEdit className='text-2xl' />
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Haftalık Rapor</span>
                                                </a>
                                            </li>
                                            <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                                <a href="/favorite-announcements" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                    <FaRegBookmark className='text-2xl' />
                                                    <span className="flex-1 ms-3 whitespace-nowrap">Favori ilanlar</span>
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    {userRole !== 'COMPANY' && (
                                        <li className='hover:bg-light-blue duration-200'>
                                            <a href="/companies" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                <FaBuilding className='text-xl' />
                                                <span className="ms-3">Firmalar</span>
                                            </a>
                                        </li>
                                    )}

                                    { userRole === "COMMISSION" && (
                                        <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                            <a href="/edit-student-groups" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                <MdGroups className='text-2xl' />
                                                <span className="flex-1 ms-3 whitespace-nowrap">
                                                    Öğrenci Grupları
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                    {userRole === 'LECTURER' && (
                                        <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                            <a href= "/student-group"  className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                <MdGroups className='text-2xl' />
                                                <span className="flex-1 ms-3 whitespace-nowrap">
                                                    Öğrenci Grupları
                                                </span>
                                            </a>
                                        </li>
                                    )}
                                    {userRole === 'COMPANY' && (
                                        <>
                                            <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                                <a href="/share-announcement" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue group">
                                                    <TfiAnnouncement className='text-xl' />
                                                    <span className="flex-1 ms-3 whitespace-nowrap">İlan ver</span>
                                                </a>
                                            </li>
                                        </>
                                    )}
                                    
                                    <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                        <a href="#" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue">
                                            <IoIosMail className='text-2xl' />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Gelen Kutusu</span>
                                            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-white">3</span>
                                        </a>
                                    </li>
                                    <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                        <a href="/forms" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue">
                                            <FaWpforms className='text-2xl' />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Formlar</span>
                                        </a>
                                    </li>
                                    <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                        <a href="#" className="flex items-center p-2 rounded-lg text-white hover:text-dark-blue">
                                            <RiSurveyFill className='text-2xl' />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Anketler</span>
                                        </a>
                                    </li>
                                    <li className='hover:bg-light-blue duration-200 hover:text-dark-blue'>
                                        <a onClick={(e) => {
                                            handleLogout(e)
                                        }} className="flex items-center p-2 cursor-pointer rounded-lg text-white hover:text-dark-blue hover:bg-light-blue">
                                            <CiLogout className='text-2xl' />
                                            <span className="flex-1 ms-3 whitespace-nowrap">Çıkış Yap</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className='mt-auto'>
                                <div className='hover:bg-light-blue duration-200 hover:text-dark-blue' onClick={handleShowFeedback}>
                                    <span onClick={() => setShowFeedbackModal(!showFeedbackModal)} className="flex items-center p-2 rounded-lg duration-200 text-white cursor-pointer hover:text-dark-blue">
                                        <BsFillQuestionOctagonFill className='text-2xl' />
                                        <span className="flex-1 ms-3 whitespace-nowrap items-stretch">Feedback</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}

                {showFeedbackModal && <FeedbackModal onClose={handleShowFeedback} />}
            </div>
        </>
    );
}

export default Sidebar;
