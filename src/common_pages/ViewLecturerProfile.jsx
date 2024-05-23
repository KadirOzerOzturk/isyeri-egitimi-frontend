import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';

function ViewLecturerProfile() {
    const location = useLocation();
    const { pathname } = location;
    const parts = pathname.split("/")
    const lecturerId = parts[parts.length - 1]
    const [lecturer, setLecturer] = useState();
    const [pendingApiCall, setPendingApiCall] = useState(true)

    useEffect(() => {
        axios.get(`/lecturer/${lecturerId}`)
            .then(res => {
                setLecturer(res.data);
                setPendingApiCall(false)

            })
            .catch(error => {
                console.error("Error fetching comp:", error);
            });


    }, [lecturerId]);

    return (
        <div>
            {pendingApiCall ?
                <Loading /> :

                <div className="container mx-auto my-5 pl-24 pt-5 z-40 font-roboto ">
                    <div className=" no-wrap md:-mx-2 ">

                        <div className="w-full ">

                            <div className="bg-white p-3 border-t-4 border-dark-blue">
                                <div className="image h-24 w-24 overflow-hidden">
                                    <img className="h-24 absolute w-24 mx-auto rounded-full "
                                        src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
                                        alt="" />
                                    
                                </div>
                                <div className='flex justify-between'>
                                        <h1 className=" text-gray-900 font-bold text-2xl leading-8 my-1">{lecturer.izleyiciAd + " " + lecturer?.izleyiciSoyad} </h1>

                                    </div>
                                <div>
                                    <p className="text-md mt-4 bg-slate-100 rounded-lg p-3 text-gray-700 hover:text-gray-600 leading-6 whitespace-pre-line">{lecturer?.izleyiciHakkinda}</p>

                                </div>
                                {/* <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-dark-blue py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li className="flex items-center py-3">
                                        <span>Tahmini Mezuniyet Tarihi</span>
                                        <span className="ml-auto">Temmuz 2025</span>
                                    </li>
                                </ul> */}
                            </div>

                            <div className="my-4"></div>


                        </div>
                        {/* hakkinda kismi */}
                        <div className="w-full md:w-9/12 mx-2 h-64">

                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className='flex  justify-between'>


                                    <div className="flex items-center  space-x-2 font-semibold text-gray-900 leading-8">
                                        <span clas="text-dark-blue ">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>

                                        </span>
                                        <span className="tracking-wide">Hakkında</span>

                                    </div>


                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Adı</p>
                                            <p className="px-4 py-2">{lecturer?.izleyiciAd}</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Soyadı</p>
                                            <p className="px-4 py-2">{lecturer?.izleyiciSoyad}</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Fakülte</p>
                                            <p className="px-4 py-2">{lecturer?.izleyiciFakulte} </p>
                                        </div>
                                        

                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">İletisim</p>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href={"mailto:" + lecturer?.izleyiciEposta}> {lecturer?.izleyiciEposta}</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>


                            <div className="my-4"></div>



                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default ViewLecturerProfile