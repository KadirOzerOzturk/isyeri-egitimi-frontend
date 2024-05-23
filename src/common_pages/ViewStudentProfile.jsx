import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import rektorluk from '../icons/gazi_rektorluk.jpg';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import AreYouSureModal from '../components/AreYouSureModal';
import Loading from '../components/Loading';


function ViewStudentProfile() {

    const [applications, setApplications] = useState([]);
    console.log("applications", applications)

    const location = useLocation();
    const { pathname } = location;
    const parts = pathname.split("/")
    const studentNo = parts[parts.length - 1]
    
    const [student, setStudent] = useState();
    const [skills, setSkills] = useState([])
    const [showModalForApprove, setShowModalForApprove] = useState(false)
    const [showModalForRefuse, setShowModalForRefuse] = useState(false)
    const [pendingApiCall, setPendingApiCall] = useState(true)
    const { userRole } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.auth)
    const [lecturer, setLecturer] = useState({})
    const [handledApplicationId, setHandledApplicationId] = useState("")
    const navigate = useNavigate()


    useEffect(() => {
        axios.get(`/students/${studentNo}`)
            .then(res => {
                setStudent(res.data);
                setPendingApiCall(false)

            })
            .catch(error => {
                console.error("Error fetching comp:", error);
            });
        axios.get(`/skills/getSkills/${studentNo}`)
            .then((res) => {
                if (res.status === 200) {
                    setSkills(res.data)
                    setPendingApiCall(false)
                }
            })
            .catch(error => {
                console.error("Haftalik rapor yuklenirken hata oluştu:", error);
            });

        axios.get(`/applications/student/${studentNo}/${user?.firmaId}`)
            .then(res => {
                setApplications(res.data);
                setPendingApiCall(false)
            })
            .catch(error => {
                console.error("Error fetching comp:", error);
            });
        axios.get(`/lecturer/getLecturerOfStudent/${studentNo}`)
            .then(res => {
                setLecturer(res.data);
                setPendingApiCall(false)
            })
            .catch(error => {
                console.error("Error fetching comp:", error);
            });
    }, [studentNo, user]);




    // modal will be shown when the company wants to approve the application 
    const approveThepplication = (e) => {
        e && e.preventDefault();
        setShowModalForApprove(true);
    }

    const handleApproveApplication = () => {

        axios.put(`/applications/update/${handledApplicationId}/Komisyon onayı bekleniyor`)
            .then(res => {
                window.location.reload()


            })
            .catch(error => {
                console.error("Error fetching comp:", error);
            }).finally(() => {
                // Burası hem başarılı hem de hata durumunda çalışır
                setShowModalForApprove(false);
            });
    };

    const handleCancelApplication = () => {
        // Logic to handle cancellation
        console.log('Cancelled!');
        // Close the modal
        setShowModalForApprove(false);
        setShowModalForRefuse(false);
    };
    // modal will be shown when the company wants to refuse the application 
    const refuseThepplication = (e) => {
        e && e.preventDefault();     
           setShowModalForRefuse(true)
        setPendingApiCall(false)
    }

    const handleRefuseApplication = () => {

        axios.put(`/applications/update/${handledApplicationId}/Başvuru firma tarafından reddedildi.`)
            .then(res => {
                window.location.reload()
                setPendingApiCall(false)
            })
            .catch(error => {
                console.error("Error fetching comp:", error);
            }).finally(() => {
                // Burası hem başarılı hem de hata durumunda çalışır
                setShowModalForRefuse(false);
            });
    };
    return (
        <div className="container mx-auto my-5 pl-24 pt-5 z-40 font-roboto">
            {pendingApiCall &&
                <Loading />
            }
            {student && (
                <div className=" no-wrap md:-mx-2 ">
                    <div className="w-full ">
                        <div className="bg-white p-3 border-t-4 border-dark-blue">
                            <div className="image h-24 w-24 overflow-hidden">
                                <img className="h-full w-full rounded-full mx-auto "
                                    src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
                                    alt="" />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{student.ogrenciAd + " " + student.ogrenciSoyad}</h1>
                            <div>
                                <p className="text-md bg-slate-100 rounded-lg p-3 text-gray-700 hover:text-gray-600 leading-6 whitespace-pre-line">{student.ogrenciHakkinda}</p>

                            </div>

                            {/* <ul
                                className="bg-gray-100 text-gray-600 w-1/3 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span className='text-slate-800 font-semibold'>Takip Eden Akademisyen</span>
                                </li>
                                <li className="flex justify-between items-center py-3">
                                    <p onClick={() => navigate(`/lecturer-profile/${lecturer.izleyiciId}`)} className='text-blue-800 hover:text-blue-400 cursor-pointer'>{lecturer.izleyiciAd}  {lecturer.izleyiciSoyad}</p>

                                    <a href={"mailto:" + lecturer.izleyiciEposta} className='text-blue-800 hover:text-blue-400 cursor-pointer text-center '>{lecturer.izleyiciEposta}</a>

                                </li>
                            </ul> */}
                        </div>

                        <div className="my-4"></div>


                    </div>
                    <div className="w-full md:w-10/12 mx-2 h-64 mb-12">
                        <div className='flex'>
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
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">İsim</p>
                                            <p className="px-4 py-2">{student?.ogrenciAd}</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Soyisim</p>
                                            <p className="px-4 py-2">{student?.ogrenciSoyad}</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Sınıf</p>
                                            <p className="px-4 py-2">{student.ogrenciSinif}</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Telefon No:</p>
                                            <p className="px-4 py-2">{student?.ogrenciTelNo}</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Adres</p>
                                            <p className="px-4 py-2">{student.ogrenciAdres} </p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">AGNO</p>
                                            <p className="px-4 py-2">{student.ogrenciAgno} / 4.00</p>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <p className="px-4 py-2 font-semibold">Email</p>
                                            <div className="px-4 py-2">
                                                <a className="text-blue-800" href={"mailto:" + student.ogrenciEposta}>{student.ogrenciEposta}</a>
                                            </div>
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
                            <div className="grid grid-cols-2">
                                <div>
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
                                        <p>Henuz bir yetenek girilmemiş ... </p>}
                                    <p className="text-slate-500 text-sm pt-4"> *Seviye (Temel-Orta-İleri)</p>
                                    <p className="text-slate-500  pt-4">
                                        CV yeri
                                    </p>
                                </div>
                                <div>
                                    {
                                        applications.length !== 0 && userRole === "COMPANY" && (
                                            <>
                                                <div className='flex  justify-between px-4 py-2 '>
                                                    <div className="flex items-center  space-x-2 font-semibold text-gray-900 leading-8">
                                                        <span clas="text-dark-blue ">
                                                            <FaUser />
                                                        </span>
                                                        <span className="tracking-wide">Başvurular</span>
                                                    </div>
                                                </div>
                                                {applications.length !== 0 && applications.map(application => (
                                                    <div className='col-span-full'>
                                                        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm ">
                                                            <li className="flex items-center py-3">
                                                                <span>İlan Adı</span>
                                                                <span className="ml-auto">
                                                                    <span className="ml-auto">{application.ilan.baslik}</span>
                                                                </span>
                                                            </li>
                                                            <div className='flex justify-between mt-2 py-2'>
                                                                <li className="flex items-center py-3 gap-5 ">
                                                                    <span>Başvuru durumu</span>
                                                                    <span className="bg-dark-blue py-1 px-2 rounded text-white text-sm">{application.basvuruDurum}</span>
                                                                </li>
                                                                {application.basvuruDurum === "Firma onayı bekleniyor." && (
                                                                    <div className='flex justify-between mt-2 py-2 gap-3'>
                                                                        <button className='px-1 w-16 text-white bg-green-500 rounded-md' onClick={() => { setHandledApplicationId(application.basvuruId); approveThepplication(); }}>Onayla</button>
                                                                        <button className='px-1 w-16  text-white  bg-red-500 rounded-md ' onClick={() => { setHandledApplicationId(application.basvuruId); refuseThepplication(); }}>Reddet</button>
                                                                    </div>
                                                                )}

                                                            </div>

                                                        </ul>

                                                        <hr />
                                                    </div>
                                                ))}
                                            </>
                                        )
                                    }


                                </div>
                            </div>
                        </div>

                    </div>
                    {showModalForApprove ? <AreYouSureModal
                        title="Emin Misin?"
                        text="Başvuru kabul edilecek."
                        purpose="confirm"
                        onConfirm={handleApproveApplication} // Pass handleConfirm function as prop
                        onCancel={handleCancelApplication} // Pass handleCancel function as prop
                    /> : null}
                    {showModalForRefuse ? <AreYouSureModal
                        title="Emin Misin?"
                        text="Başvuru reddedilecek."
                        purpose="cancel"
                        onConfirm={handleRefuseApplication} // Pass handleConfirm function as prop
                        onCancel={handleCancelApplication} // Pass handleCancel function as prop
                    /> : null}
                </div>
            )}

        </div>
    )
}

export default ViewStudentProfile;
