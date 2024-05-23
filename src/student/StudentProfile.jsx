import React, { useEffect, useState } from 'react'
import { CiEdit } from "react-icons/ci";
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { logout, setUser } from '../store/auth';
import axios from 'axios';
import moment from 'moment';
import { MdOutlineAppRegistration } from 'react-icons/md';
import Loading from '../components/Loading';


function StudentProfile() {

    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth);
    const { userRole } = useSelector(state => state.auth);
    const [cv, setCv] = useState()
    const [skills, setSkills] = useState([])
    const [applications, setApplications] = useState([]);
    console.log(applications)
    const dispatch = useDispatch();
    const [lecturer, setLecturer] = useState({})
    const [pendingApiCall, setPendingApiCall] = useState(true)


    useEffect(() => {
        if (user) {
            
            axios.get(`/skills/getSkills/${user.ogrenciNo}`)
                .then((res) => {
                    if (res.status === 200) {
                        setSkills(res.data)
                        axios.get(`/applications/student/${user.ogrenciNo}`)
                            .then((res) => {
                                setApplications(res.data)
                            })
                    }
                    axios.get(`/lecturer/getLecturerOfStudent/${user.ogrenciNo}`)
                    .then(res => {
                        setLecturer(res.data);
                        setPendingApiCall(false)
                    })
                    .catch(error => {
                        console.error("Error fetching comp:", error);
                    });
                })
                .catch(error => {
                    console.error("Haftalik rapor yuklenirken hata oluştu:", error);
                });

        }

    }, [user, dispatch])


    return (
        <>
        {pendingApiCall ? <Loading/> :
        <div className="container   mx-auto pl-32 pt-4 z-40  ">
            
            <div className="  no-wrap md:-mx-2 ">

                <div className="w-full ">

                    <div className="bg-white p-3 border-t-4 border-dark-blue">
                        <div className="image my-4 h-36 w-36 overflow-hidden">
                            <img className="h-auto w-full rounded-full mx-auto object-center "
                                src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
                                alt="" />
                        </div>
                        <div className='flex justify-between'>
                            <h1 className="text-gray-900 font-bold text-2xl leading-8 my-1">{user.ogrenciAd + " " + user.ogrenciSoyad} </h1>
                            <div className='flex justify-between gap-2'>
                                <div onClick={() => navigate('/student-edit-profile')} className='cursor-pointer bg-gray-100 py-1 px-2 rounded-lg flex justify-between items-center gap-2'>
                                    <span>Profili Düzenle</span>
                                    <CiEdit className='text-2xl' />
                                </div>
                            </div>
                        </div>
                        <hr className='my-4' />
                        <p className="text-md whitespace-pre-line bg-slate-100 rounded-lg p-3 text-gray-700 hover:text-gray-600 leading-6">{user.ogrenciHakkinda}</p>
                        
                    </div>

                    <div className="my-4"></div>


                </div>
                {/* hakkinda kismi */}
                <div className="w-full md:w-10/12 mx-2 h-64">
                <div className='md:flex'>
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className='flex  justify-between'>


                            <div className="flex items-center  space-x-2 font-semibold text-gray-900 leading-8">
                                <span clas="text-dark-blue ">
                                    <FaUser />

                                </span>
                                <span className="tracking-wide">Hakkında</span>

                            </div>



                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-lg">
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">İsim :</p>
                                    <p className="px-4 py-2">{user.ogrenciAd}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">Soyisim :</p>
                                    <p className="px-4 py-2">{user.ogrenciSoyad}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">Sınıf :</p>
                                    <p className="px-4 py-2">{user.ogrenciSinif}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">Telefon No :</p>
                                    <p className="px-4 py-2">{user.ogrenciTelNo}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">Adres :</p>
                                    <p className="px-4 py-2">{user.ogrenciAdres}</p>
                                </div>
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">AGNO :</p>
                                    <p className="px-4 py-2">{user.ogrenciAgno} / 4.00</p>
                                </div>
                                
                                <div className="grid grid-cols-2">
                                    <p className="px-4 py-2 font-semibold">Email :</p>
                                    <p className="px-4 py-2">
                                        <a href={"mailto:" + user.ogrenciEposta} >{user.ogrenciEposta}</a>
                                    </p>
                                </div>
                                
                                
                            </div>

                            </div>
                        </div>
                        <ul
                                className=" text-gray-600 w-1/3 hover:text-gray-700  py-2 px-3 mt-3 divide-y  border-l-2 border-black ml-4">
                                <li className="flex items-center py-3">
                                    <span className='text-black font-semibold'>Takip Eden Akademisyen</span>
                                </li>
                                <li className="flex justify-between items-center py-3">
                                    <p onClick={() => navigate(`/lecturer-profile/${lecturer.izleyiciId}`)} className='text-blue-800 hover:text-blue-400 cursor-pointer'>{lecturer.izleyiciAd}  {lecturer.izleyiciSoyad}</p>

                                    <a href={"mailto:" + lecturer.izleyiciEposta} className='text-blue-800 hover:text-blue-400 cursor-pointer text-center '>{lecturer.izleyiciEposta}</a>

                                </li>
                            </ul>
                    </div>


                    <div className="my-4"></div>


                    <div className="bg-white p-3 shadow-sm rounded-sm">

                        <div className="grid md:grid-cols-2 mb-12">
                            <div className='text-lg'>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span clas="text-dark-blue">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Yetenekler </span>

                                </div>
                                {skills.length !== 0 ? <table>
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Adı</th>
                                            <th className="px-4 py-2">Seviye</th>
                                            <th className="px-4 py-2"></th>

                                        </tr>
                                    </thead>
                                    <tbody className=''>
                                        {skills.map((skill) => (
                                            <tr key={skill.id}>
                                                <td className="px-4 py-2">{skill.aciklama}</td>
                                                <td className="px-4 py-2">{skill.seviye}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                    :
                                    <p>Henuz bir yetenek girmediniz ... </p>}

                                <p className="text-slate-500 text-md pt-4"> *Seviye (Temel-Orta-Ileri)</p>
                                {/* <p  className="text-slate-500  pt-4">
                                    CV yeri
                                </p>
                                <img src={cv?.url} alt="asd" />
                                <input type='file' name="cv" accept='.pdf' onChange={onChangeFunc} />
                                <button onClick={downloadCv}>Download Pdf</button> */}
                            </div>
                            <div >
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span clas="text-dark-blue">
                                        <MdOutlineAppRegistration className='text-2xl' />
                                    </span>
                                    <span className="tracking-wide">Başvurularım </span>

                                </div>
                                <div className="flex items-center w-full space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <ul className="list-inside space-y-2 w-full"> {/* Liste genişliğini ayarla */}
                                        {applications.map((application) => (
                                            <li className='border flex justify-between items-center border-black p-2 rounded-md border-opacity-50 mb-2'> {/* Li öğesinin altındaki boşlukları ayarla */}
                                                <div className='w-2/3'>
                                                    <div className="text-dark-blue">{application.ilan.baslik}</div>
                                                    <div className='md:flex justify-between '>
                                                        <p className="text-gray-500 text-xs">{moment(application.ilan.baslangic_tarihi).format("MM/DD/YYYY")} - {moment(application.ilan.bitis_tarihi).format("MM/DD/YYYY")}</p>
                                                        <p className="text-gray-500 text-xs">{application.basvuruDurum}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => navigate(`/announcement-details/${application.ilan.ilanId}`)} className='rounded-md p-1 bg-gray-200 px-2 cursor-pointer'>İlanı görüntüle</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>


                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        }
        </>
    )
}

export default StudentProfile