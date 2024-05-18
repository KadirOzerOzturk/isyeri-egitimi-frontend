import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { CiSquarePlus } from 'react-icons/ci';
import { MdOutlineFileUpload } from 'react-icons/md';
import Datetime from 'react-datetime';
import { Toaster, toast } from 'sonner';
import { FaTrash } from 'react-icons/fa6';

function EditAnnouncementDetails() {
    const location = useLocation();
    const { pathname } = location;
    const parts = pathname.split("/");
    const announcementId = parts[parts.length - 1];
    const [announcement, setAnnouncement] = useState({});
    const [criteriaList, setCriteriaList] = useState([]);
    const [criteria, setCriteria] = useState("");
    const [postContent, setPostContent] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isChecked, setIsChecked] = useState(false);

    const [changedAnnouncement, setChangedAnnouncement] = useState({});
    const [pendingApiCall, setPendingApiCall] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChangedAnnouncement({ ...changedAnnouncement, [name]: value });
    };

    function addCriteria(criteriaDescription) {
        const newCriteria = { kriterAciklama: criteriaDescription }; // Creating an object with the description
        setCriteriaList((prevCriteriaList) => [...prevCriteriaList, newCriteria]);
        setCriteria(""); // Reset criteria input field
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const announcementResponse = await axios.get(`/announcements/${announcementId}`);
                if (announcementResponse.status === 200) {
                    setAnnouncement(announcementResponse.data);
                    setChangedAnnouncement(announcementResponse.data);
                }
                getCriterias()
            } catch (error) {
                navigate("/not-found");
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [announcementId]);

    const getCriterias = async ()=>{
        const criteriaResponse = await axios.get(`/announcementCriteria/${announcementId}`);
                setCriteriaList(criteriaResponse.data);
    }

    const updatePost = () => {
        setPendingApiCall(true);
        axios.put(`/announcements/update/${announcementId}`, changedAnnouncement)
            .then(response => {
                if (response.status === 200) {
                    navigate("/company-profile");
                }
            })
            .catch(error => {
                console.error("Request error: ", error);
            })
            .finally(() => {
                setPendingApiCall(false);
            });
    };

    const handleUpdateClick = (e) => {
        e.preventDefault();
        updatePost();
    };


    const handleDeleteCriteria = (e, criteriaId) => {
        axios.delete(`/announcementCriteria/delete/${announcementId}/${criteriaId}`)
            .then(response => {

                if (response.status===200) {
                    console.log('Kriter  silindi:', response.data);
                    toast.info('Kriter silindi');

                    getCriterias()
                }
            })
            .catch(error => {
                // Hata durumunda yapılacak işlemler
                console.error('Hata:', error);
            });

    }
    
    return (
        <>
            {pendingApiCall && <Loading text="Paylaşılıyor ..." />}

            <div className="container mx-auto my-5 pl-32 pt-5 z-40">
                <div className="border-b border-gray-900/10 pb-12 pr-24 pl-24 pt-16">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        İlan Detayları
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="announcementTitle" className="block text-sm font-medium leading-6 text-gray-900">
                                İlan başlığı
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        onChange={handleInputChange}
                                        type="text"
                                        name="baslik"
                                        id="title"
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Başlık"
                                        value={changedAnnouncement.baslik || ''}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="postContent" className="block text-sm font-medium leading-6 text-gray-900">
                                İlan içeriği
                            </label>
                            <div className="mt-2">
                                <p className='flex justify-end text-slate-400'> {`Char Count: ${postContent.length}`}/1000 </p>

                                <textarea
                                    onChange={handleInputChange}
                                    id="aciklama"
                                    name="aciklama"
                                    rows={8}
                                    maxLength={3000}
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={changedAnnouncement.aciklama || ''}
                                    required
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                İlanınız hakkında belirtmek istediklerinizi belirtiniz
                            </p>
                            <hr className='my-4' />
                            <div className="mt-2 lg:flex items-center rounded-md">
                                <h1 className='lg:mr-6 text-nowrap'>Başvuruların başlangıç ve bitiş aralığını seçiniz. (calismiyor simdilik bugun baslayip 30 gun sonra bitiyor)</h1>
                                <Datetime onChange={setStartDate} dateFormat={true} value={startDate} locale='tr' placeholder='N/A' className='appearance-none shadow border focus:border-none cursor-pointer h-8 text-center px-3' />
                                <p className='mx-4'>-</p>
                                <Datetime onChange={setEndDate} dateFormat={true} value={endDate} locale='tr' placeholder='N/A' className='appearance-none shadow border focus:border-none cursor-pointer h-8 text-center px-3' />
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <div>
                                <div className="sm:col-span-4">
                                    <label htmlFor="criteria" className="block text-md font-medium leading-6 text-gray-900 mb-2">
                                        Kriterler
                                    </label>
                                    {criteriaList.length === 0 ? "Henüz girilmedi." : 
                                    <ul className='p-2 px-8 font-light mt-2'>
                                        {criteriaList.map((criteria, index) => (
                                            <div className='flex gap-6 items-center '>
                                                 <li key={index} className='list-disc'>{criteria.kriterAciklama} </li>
                                                 <FaTrash onClick={(e)=>handleDeleteCriteria(e,criteria.kriterId)} className='cursor-pointer text-gray-700 hover:text-gray-400'/>
                                            </div>
                                           
                                        ))}
                                    </ul>}
                                </div>
                            </div>
                            <div className="sm:col-span-4 mt-3">
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md">
                                        <input
                                            onChange={(e) => setCriteria(e.target.value)}
                                            value={criteria}
                                            type="text"
                                            name="criteria"
                                            id="criteria"
                                            autoComplete="criteria"
                                            className="block p-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                            placeholder="Kriter giriniz."
                                            required
                                        />
                                        <CiSquarePlus onClick={() => addCriteria(criteria)} className='text-4xl hover:opacity-70 cursor-pointer' />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="mt-8 space-y-3 col-span-2" action="#" method="POST">
                            <div className="grid grid-cols-1 space-y-2">
                                <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                                <div className="flex items-center justify-center w-full">
                                    <label className="flex flex-col rounded-lg border-4 cursor-pointer border-dashed w-full h-60 p-10 group text-center">
                                        <div className="h-full w-full text-center flex flex-col items-center justify-center">
                                            <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                                <MdOutlineFileUpload className='has-mask h-36 object-center text-9xl text-slate-400' />
                                            </div>
                                            <p className="pointer-none text-gray-500"> Select a file from your computer</p>
                                        </div>
                                        <input type="file" className="hidden" accept='.jpeg, .jpg, .png' />
                                    </label>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400">
                                <span>.jpeg, .jpg, .png</span>
                            </p>
                        </form>

                        <div className='col-span-full'>
                            <div className="flex items-center my-6">
                                <input onChange={() => setIsChecked(!isChecked)} id="green-checkbox" type="checkbox" value="" className="cursor-pointer w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="terms-and-privacy" className="ml-2 cursor-text block text-lg text-gray-900">
                                    İlanınızı aynı zamanda ana sayfada paylaşmak isterseniz bu seçeneği işaretleyiniz.
                                </label>
                            </div>
                            {isChecked &&
                                <div>
                                    <div className="sm:col-span-4">
                                        <label
                                            htmlFor="postTitle"
                                            className="block text-md font-medium leading-6 text-gray-900"
                                        >
                                            Post başlığı
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 text-md focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    onChange={handleInputChange}
                                                    type="text"
                                                    name="postBaslik"
                                                    id="postTitle"
                                                    autoComplete="postTitle"
                                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Ana sayfada listelenen ilanda gösterilecek kısımdır."
                                                    value={changedAnnouncement.postBaslik || ''}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>

                        <button
                            onClick={handleUpdateClick}
                            type="button"
                            className="rounded-md duration-300 px-8 py-1.5 text-lg font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-light-blue hover:text-black bg-dark-blue"
                        >
                            Güncelle
                        </button>
                    </div>
                </div>
            </div>
            <Toaster richColors position="top-center" />

        </>
    );
}

export default EditAnnouncementDetails;
