import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci';
import { TfiAnnouncement } from 'react-icons/tfi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LecturerProfile() {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth);
    const { userRole } = useSelector(state => state.auth);
    const [cv, setCv] = useState()
    const [skills, setSkills] = useState([])

    const dispatch = useDispatch();

  return (
    <div>
        <div  className="container mx-auto my-5 pl-24 pt-5 z-40 font-roboto ">
            <div  className=" no-wrap md:-mx-2 ">

                <div  className="w-full ">

                    <div  className="bg-white p-3 border-t-4 border-dark-blue">
                        <div  className="image h-24 w-24 overflow-hidden">
                            {/* <img  className="h-auto w-full mx-auto rounded-full "
                                src={user?.izleyiciLogo}
                                alt="" /> */}
                        </div>
                        <div className='flex justify-between'>
                            <h1 className="text-gray-900 font-bold text-2xl leading-8 my-1">{user.izleyiciAd + " " + user.izleyiciSoyad} </h1>
                            <div className='flex justify-between gap-2'>
                                <div onClick={() => navigate('/lecturer-edit-profile')} className='cursor-pointer bg-gray-100 py-1 px-2 rounded-lg flex justify-between items-center gap-2'>
                                    <span>Profili Düzenle</span>
                                    <CiEdit className='text-2xl' />
                                </div>

                            </div>


                        </div>
                        <ul
                             className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li  className="flex items-center py-3">
                                <span>Status</span>
                                <span  className="ml-auto"><span
                                     className="bg-dark-blue py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li  className="flex items-center py-3">
                                <span>Tahmini Mezuniyet Tarihi</span>
                                <span  className="ml-auto">Temmuz 2025</span>
                            </li>
                        </ul>
                    </div>

                    <div  className="my-4"></div>

                   
                </div>
                {/* hakkinda kismi */}
                <div  className="w-full md:w-9/12 mx-2 h-64">

                    <div  className="bg-white p-3 shadow-sm rounded-sm">
                        <div  className='flex  justify-between'>


                            <div  className="flex items-center  space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-dark-blue ">
                                    <svg  className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                </span>
                                <span  className="tracking-wide">Hakkında</span>

                            </div>
                            

                        </div>
                        <div  className="text-gray-700">
                            <div  className="grid md:grid-cols-2 text-sm">
                                <div  className="grid grid-cols-2">
                                    <p  className="px-4 py-2 font-semibold">Adı</p>
                                    <p  className="px-4 py-2">{user.izleyiciAd}</p>
                                </div>
                                <div  className="grid grid-cols-2">
                                    <p  className="px-4 py-2 font-semibold">Soyadı</p>
                                    <p  className="px-4 py-2">{user.izleyiciSoyad}</p>
                                </div>
                                <div  className="grid grid-cols-2">
                                    <p  className="px-4 py-2 font-semibold">Fakülte</p>
                                    <p  className="px-4 py-2">{user.izleyiciFakulte} </p>
                                </div>
                                <div  className="grid grid-cols-2">
                                    <p  className="px-4 py-2 font-semibold">Fakülte</p>
                                    <p  className="px-4 py-2">{user.izleyiciFakulte} </p>
                                </div>
                               
                                <div  className="grid grid-cols-2">
                                    <p  className="px-4 py-2 font-semibold">İletisim</p>
                                    <div  className="px-4 py-2">
                                        <a  className="text-blue-800" href={"mailto:" + user.izleyiciEposta}> {user.izleyiciEposta}</a>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>


                    <div  className="my-4"></div>



                </div>
            </div>
        </div>
    </div>
)
}

export default LecturerProfile