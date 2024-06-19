import React, { useEffect, useState } from 'react';
import { BsBuildings } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { LuCalendarClock } from "react-icons/lu";
import { FaUserGroup } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import AreYouSureModal from '../components/AreYouSureModal';
import { Toaster, toast } from 'sonner';
import Loading from '../components/Loading';

function ShowAnnouncementDetails() {
    const { userRole } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;
    const parts = pathname.split("/");
    const announcementId = parts[parts.length - 1];
    const [announcement, setAnnouncement] = useState({});
    const [applications, setApplications] = useState([]);
    const [criterias, setCriterias] = useState([]);
    const [showModalForApplication, setShowModalForApplication] = useState(false);
    const [showModalForCancelation, setShowModalForCancelation] = useState(false);
    const [pendingApiCall, setPendingApiCall] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const announcementResponse = await axios.get(`/announcements/${announcementId}`);
                console.log("res.data", announcementResponse.data);
                if (announcementResponse.status === 200) {
                    setAnnouncement(announcementResponse.data);
                }

                const criteriaResponse = await axios.get(`/announcementCriteria/${announcementId}`);
                console.log(criteriaResponse.data);
                setCriterias(criteriaResponse.data);

                const applicationsResponse = await axios.get(`/applications/${announcementId}`);
                console.log(applicationsResponse.data);
                setApplications(applicationsResponse.data);
            } catch (error) {
                navigate("/not-found");
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [announcementId]);

    const applyToAnnouncement = (e) => {
        e.preventDefault();
        setShowModalForApplication(true);
    };

    const handleConfirmApplication = () => {
        setPendingApiCall(true);
        axios.post(`/applications/apply/${user.ogrenciNo}/${announcementId}`)
            .then(response => {
                toast.success('Başvurunuz başarıyla tamamlandı.');
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            })
            .catch(error => {
                console.error("Error applying to announcement:", error);
            })
            .finally(() => {
                setPendingApiCall(false);
                setShowModalForApplication(false);
            });
    };

    const handleCancelApplication = () => {
        setShowModalForApplication(false);
    };

    const cancelApplication = (e) => {
        e.preventDefault();
        setShowModalForCancelation(true);
    };

    const handleConfirmCancelation = () => {
        setPendingApiCall(true);
        axios.delete(`/applications/delete/${user.ogrenciNo}/${announcementId}`)
            .then(response => {
                toast.success('Başvurunuz başarıyla kaldırıldı.');
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            })
            .catch(error => {
                console.error("Error canceling application:", error);
            })
            .finally(() => {
                setPendingApiCall(false);
                setShowModalForCancelation(false);
            });
    };

    const handleCancelCancelation = () => {
        setShowModalForCancelation(false);
    };

    const deleteAnnouncement = (e, announcementId) => {
        if (applications.length !== 0) {
            toast.error('İlana ait başvuru olduğu için ilan kaldırılamadı.');
        } else {
            setPendingApiCall(true);
            axios.delete(`/announcements/delete/${announcementId}`)
                .then(res => {
                    toast.success('İlan başarıyla kaldırıldı.');
                    setTimeout(() => {
                        navigate("/company-profile");
                    }, 700);
                })
                .catch(error => {
                    console.error("Error deleting announcement: ", error);
                })
                .finally(() => {
                    setPendingApiCall(false);
                });
        }
    };

    if (announcement.firma?.firmaId !== user?.firmaId && userRole === "COMPANY") {
        navigate("/not-found");
        return (
            <div>
                <p>Yetkisiz erişim! Yönlendiriliyorsunuz...</p>
            </div>
        );
    }
    return (
        <div className="container mx-auto my-5 pl-24 pt-5 z-40">
            {pendingApiCall ? < Loading text="Paylaşılıyor ..." /> : null}
            <div>
                <div className='flex gap-8'>
                    <img className='h-36 w-52 shadow-lg rounded-md border-b-4 border-dark-blue cursor-pointer' onClick={() => navigate(`/company-profile/${announcement.firma.firmaId}`)} src={announcement.firma?.firmaLogo} alt="" />
                    <ul className='items-center p-3'>
                        <li className='text-xl font-bold'>{announcement.baslik}</li>
                        <li className='flex gap-2 mt-1 text-lg items-center'><BsBuildings />{announcement.firma?.firmaAd}</li>
                        <li className='flex gap-2 mt-1 text-lg items-center'><CiLocationOn className='text-xl' />{announcement.firma?.firmaAdres}</li>
                        <li className='flex gap-2 mt-1 text-lg items-center'><LuCalendarClock />{moment(announcement.baslangic_tarihi).format("DD/MM/YYYY")} - {moment(announcement.bitis_tarihi).format("DD/MM/YYYY")}</li>
                    </ul>
                </div>
                <div>
                </div>
            </div>
            <hr className='my-6' />
            <div className='flex items-center gap-8'>
                <div className='w-3/4 mx-8 border-r-2 font-bold h-screen'>
                    <h1 className='text-2xl text-center mt-2 mb-12'>{announcement.baslik}</h1>
                    <h2 className='text-lg'>İŞYERİ EĞİTİMİ BAŞVURU TARİHLERİ</h2>
                    <p className='list-disc font-normal p-2'>İşyeri Eğitimi başvuruları {moment(announcement.baslangic_tarihi).format("DD/MM/YYYY")} - {moment(announcement.bitis_tarihi).format("DD/MM/YYYY")} tarihleri arasında alınacaktır.</p>
                    <h2 className='text-lg mt-2'>İLAN HAKKINDA</h2>
                    <p className='p-2 px-8 font-normal mt-2 whitespace-pre-line'>
                        {announcement.aciklama}
                    </p>
                    {criterias.length !== 0 &&
                        <>
                            <h2 className='text-lg mt-2'>KRİTERLERİMİZ</h2>
                            <ul className='p-2 px-8 font-normal mt-2'>
                                {criterias.map((criteria, index) => (
                                    <li key={index} className='list-disc'>{criteria.kriterAciklama}</li>
                                ))}
                            </ul>
                        </>
                    }
                </div>
                <div className='w-1/4 text-center h-screen'>
                    {userRole === "COMPANY" && announcement.firma?.firmaId === user?.firmaId && (
                        <div className='flex justify-center items-center gap-3'>
                            <button className='text-xl bg-dark-blue rounded-3xl py-2 text-white px-6 text-center' onClick={() => navigate(`/edit-announcement/${announcementId}`)}>İlanı düzenle</button>
                            <button className='text-xl bg-red-500 rounded-3xl py-2 text-white px-6 text-center' onClick={(e) => deleteAnnouncement(e, announcementId)}>İlanı Sil</button>
                        </div>
                    )}
                    {userRole === "STUDENT" && applications.filter(application => application.ogrenci.ogrenciNo === user.ogrenciNo).length === 0 ?
                        <button className='text-xl bg-dark-blue rounded-3xl py-2 text-white px-6 text-center hover:bg-light-blue hover:text-black duration-200' onClick={(e) => applyToAnnouncement(e)}>Başvur</button>
                        :
                        userRole !== "STUDENT" ?
                            null
                            :
                            <p className='text-xl bg-dark-blue rounded-md  py-2 text-white  text-center   '>Başvurunuz alınmıştır.</p>
                    }
                    <div className='mt-3 bg-gray-100 text-center rounded-xl'>
                        <h1 className='bg-gray-300 w-full p-3 rounded-xl'>İlan Bilgileri</h1>
                        <ul className='items-center p-3'>
                            <li className='flex p-2 items-center gap-2 mt-1 text-lg'><CiLocationOn className='text-2xl' />İlan no : {announcement.ilanId}</li>
                            <li className='flex p-2 items-center gap-2 mt-1 text-lg'><BsBuildings className='text-2xl' />...</li>
                            <li className='flex p-2 items-center gap-2 mt-1 text-lg'><FaUserGroup className='text-2xl' />Başvuru Sayısı : {applications.length}</li>
                            {userRole === "COMPANY" && announcement.firma?.firmaId === user?.firmaId ?
                                <li>
                                    <button className='py-2 px-4 text-white bg-dark-blue rounded-lg' onClick={() => navigate(`/apply-list/${announcement.ilanId}`)}>Başvuruları Görüntüle</button>
                                </li>
                                : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {showModalForApplication ? <AreYouSureModal
                title="Emin Misin?"
                text="Başvurun firmaya ileticek."
                purpose="confirm"
                onConfirm={handleConfirmApplication}
                onCancel={handleCancelApplication}
            /> : null}
            {showModalForCancelation ? <AreYouSureModal
                title="Emin Misin?"
                text="Başvurunu geri çekmek istediğine emin misin?"
                purpose="cancel"
                onConfirm={handleConfirmCancelation}
                onCancel={handleCancelCancelation}
            /> : null}
            <Toaster richColors position="top-center" />
        </div>
    );
}

export default ShowAnnouncementDetails;
