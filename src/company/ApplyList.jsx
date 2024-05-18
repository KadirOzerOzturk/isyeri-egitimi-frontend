import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaUser } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import { BsBuildings } from 'react-icons/bs';
import { CiLocationOn } from 'react-icons/ci';
import { LuCalendarClock } from 'react-icons/lu';
import moment from 'moment';


function ApplyList() {

    const location = useLocation();
    const { pathname } = location;
    const parts = pathname.split("/")
    const announcementId = parts[parts.length - 1]


    const { companies } = useSelector(state => state.companies)

    const company = useSelector(state => state.auth.user)
    const [applications, setApplications] = useState([])
    const [announcement, setAnnouncement] = useState({})

    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showTasks, setShowTasks] = useState()
    const navigate = useNavigate()


    useEffect(() => { 
        console.log(company)
        if (company.firmaId) {
            axios.get(`/applications/${announcementId}`)
                .then(res => {
                    console.log(res.data);
                    setApplications(res.data);
                })
                .catch(error => {
                    console.error("Error fetching comp:", error);
                });
                axios.get(`/announcements/${announcementId}`)
                .then(res => {
                    console.log(res.data);
                    setAnnouncement(res.data);
                })
                .catch(error => {
                    console.error("Error fetching comp:", error);
                });
        }
        
    }, []);

    

    return (
        <div  className='my-12  pt-5 z-40 justify-center text-xl  grid'>
            <div  className='mb-6'>
                <div  className='flex gap-8'>
                    <img  className=' h-48 w-48 place-items-center shadow-lg rounded-md' src={announcement.firma?.firmaLogo} alt="" />
                    <ul  className='items-center p-3'>
                        <li  className='text-xl font-bold'>{announcement.baslik}</li>
                        <li  className='flex gap-2 mt-1 text-lg items-center'> <BsBuildings />  {announcement.firma?.firmaAd}</li>
                        <li  className='flex gap-2 mt-1 text-lg items-center'> <CiLocationOn  className='text-xl' /> {announcement.firma?.firmaAdres}</li>
                        <li  className='flex gap-2 mt-1 text-lg items-center'> <LuCalendarClock/> {moment(announcement.baslangic_tarihi).format("DD/MM/YYYY")} - {moment(announcement.bitis_tarihi).format("DD/MM/YYYY")}</li>
                    </ul>
                </div>
                <div>

                </div>
            </div>
            <div  className='flex justify-between '>
                
                <div  className="border-slate-200 border-2 p-3 text-sm font-medium text-gray-900 bg-white rounded-lg">
                    <h1  className='py-2 text-center text-lg'> Başvurular</h1>
                    <table  className="mx-auto text-sm text-left rtl:text-right text-gray-500">
                        <thead  className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col"  className="px-6 py-3">
                                    Öğrenci Ad
                                </th>
                                <th scope="col"  className="px-6 py-3">
                                    Öğrenci Soyad
                                </th>
                                <th scope="col"  className="px-6 py-3">
                                    Öğrenci Eposta
                                </th>
                                <th scope="col"  className="px-6 py-3">
                                    İlan Durumu
                                </th>
                                <th scope="col"  className="px-6 py-3 text-center">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>{applications.length==0 ? <h1  className='mt-6 text-md'>Başvuru bulunmamaktadır.</h1>:null}
                            {applications.map((application) => (
                                <tr key={application.basvuruId}  className="odd:bg-white  even:bg-gray-50 border-b">
                                    <th onClick={()=> navigate(`/student-profile/${application.ogrenci.ogrenciNo}`)} scope="row"  className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {application.ogrenci.ogrenciAd}
                                    </th>
                                    <td   className="px-6 py-4">
                                        {application.ogrenci.ogrenciSoyad}
                                    </td>
                                    <td   className="px-6 py-4">
                                    {application.ogrenci.ogrenciEposta}
                                    </td>
                                    <td   className="px-6 py-4">
                                    {application.basvuruDurum}
                                    </td>
                                    <td  className="px-6 py-4 flex items-center border-r-2 ">
                                        
                                    <a href="#" onClick={() => navigate(`/student-profile/${application.ogrenci.ogrenciNo}`)}  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Görüntüle</a> 


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>




    )
}

export default ApplyList