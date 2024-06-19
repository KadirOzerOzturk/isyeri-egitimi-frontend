import axios from 'axios';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { GoTrash } from 'react-icons/go';
import { TfiAnnouncement } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import AreYouSureModal from '../components/AreYouSureModal';

function ViewCompanyProfile() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { userRole } = useSelector(state => state.auth);

    const location = useLocation();
    const navigate = useNavigate();
    const companyId = location.pathname.split("/").pop();

    const [company, setCompany] = useState({});
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        if (companyId) {
            axios.get(`/announcements/all/${companyId}`)
                .then(res => setAnnouncements(res.data))
                .catch(error => console.error("Error fetching announcements:", error));

            axios.get(`/company/${companyId}`)
                .then(res => setCompany(res.data))
                .catch(error => console.error("Error fetching company:", error));
        }
    }, [companyId]);

    const handleDeleteCompany = () => {
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = () => {
        if (companyId) {
            axios.delete(`/company/delete/${companyId}`)
                .then(res => {
                    console.log('Company deleted:', res.data);
                    navigate('/companies'); // Redirect to companies list after deletion
                })
                .catch(error => console.error("Error deleting company:", error));
        }
        setShowDeleteModal(false);
    };

    const handleCancel = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="container mx-auto my-5 pl-24 pt-5 z-40">
            <div className="md:flex no-wrap md:-mx-2">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-dark-blue">
                        <div className="image h-24 w-24 overflow-hidden">
                            <img className="h-auto w-full mx-auto rounded-full" src={company?.firmaLogo} alt="" />
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{company?.firmaAd}</h1>
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">Owner at Her Company Inc.</h3>
                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{company?.firmaHakkinda}</p>
                        <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span className="bg-dark-blue py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Tahmini Mezuniyet Tarihi</span>
                                <span className="ml-auto">Temmuz 2025</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full md:w-9/12 mx-2 h-64">
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className='flex justify-between'>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <FaUser />
                                <span className="tracking-wide">Hakkında</span>
                            </div>
                            <div className='flex justify-between items-center gap-2'>
                                {userRole === "COMMISSION" &&
                                    <div onClick={handleDeleteCompany} className='cursor-pointer bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-lg flex justify-between items-center gap-2'>
                                        <span>Firmayı Sil</span>
                                        <GoTrash className='text-2xl' />
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Şirket Adı</div>
                                    <div className="px-4 py-2">{company?.firmaAd}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Sektör</div>
                                    <div className="px-4 py-2">{company?.firmaSektor}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Adres</div>
                                    <div className="px-4 py-2">{company?.firmaAdres}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">İletisim</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href={"mailto:" + company.firmaEposta}>{company?.firmaEposta}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-3 my-4 shadow-sm rounded-sm">
                        <div className="grid grid-cols-2">
                            <div>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <span className="text-dark-blue">Ortalama</span>
                                </div>
                                <ul className="list-inside space-y-2">
                                    <li>
                                        <div className="text-dark-blue">Ortalama</div>
                                        <div className="text-gray-500 text-xs">3.00 ve üzeri</div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                    <TfiAnnouncement className='text-xl' />
                                    <span className="tracking-wide">Açılan ilanlar</span>
                                </div>
                                <ul className="list-inside space-y-2">
                                    {announcements.map((announcement) => (
                                        <li key={announcement.ilanId} className='border flex justify-between items-center border-black p-2 rounded-md border-opacity-50'>
                                            <div>
                                                <div className="text-dark-blue">{announcement.baslik}</div>
                                                <div className="text-gray-500 text-xs">
                                                    {moment(announcement.baslangic_tarihi).format("MM/DD/YYYY")} - {moment(announcement.bitis_tarihi).format("MM/DD/YYYY")}
                                                </div>
                                            </div>
                                            <button onClick={() => navigate(`/announcement-details/${announcement.ilanId}`)} className='rounded-md p-1 bg-gray-200 px-2 cursor-pointer'>İlanı görüntüle</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteModal && (
                <AreYouSureModal
                    title="Emin Misin?"
                    text="Firma sistemden silinecektir."
                    purpose="cancel"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancel}
                />
            )}
        </div>
    );
}

export default ViewCompanyProfile;
