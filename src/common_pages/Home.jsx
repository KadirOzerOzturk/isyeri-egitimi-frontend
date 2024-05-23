import axios from 'axios';
import React, { useEffect, useState } from 'react'
import mainLogo from '../icons/gazi_university_logo.png';
import rektorluk from "../icons/gazi_rektorluk.jpg"
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [announcements, setAnnouncements] = useState([])
  const { user } = useSelector(state => state.auth)
  const { userRole } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const [favorites, setFavorites] = useState([])
  const [pendingApiCall, setPendingApiCall] = useState(true)

  useEffect(() => {
    if(userRole=="COMPANY"){
      navigate("/access-denied")
    }
    if (user) { // Eğer user tanımlı ise API isteği yap
    
      axios.get(`/announcements`)
        .then(res => {
          loadFavorites()
          console.log(res.data);
          setAnnouncements(res.data);
        })
        .catch(error => {
          console.error("Error fetching announcements:", error);
          // announcements isteği hata aldığında pendingApiCall false yapılır
          setPendingApiCall(false);
        });
    }
  }, [user]);

  const calculateTimeDifference = (announcementDate) => {
    const now = new Date();
    const announcementTime = new Date(announcementDate);
    const difference = now.getTime() - announcementTime.getTime();

    // Milisaniyeleri saniyeye dönüştür
    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) {
      return `${seconds} saniye önce`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} dakika önce`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} saat önce`;
    } else if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return `${days} gün önce`;
    } else {
      const weeks = Math.floor(seconds / 604800);
      return `${weeks} hafta önce`;
    }
  }

  function handleFavorite(announcement) {
    const favoriteAnnouncementDto = {
      ogrenci: user,
      ilan: announcement // İlan bilgilerini announcement nesnesinden alınacak
    };

    // İlgili ilanın favori listesinde olup olmadığını kontrol et
    const isAlreadyFavorited = favorites.some(favorite => favorite.ilan.ilanId === announcement.ilanId && favorite.ogrenci.ogrenciNo === user.ogrenciNo);

    // Favori zaten varsa, favoriyi kaldır
    if (isAlreadyFavorited) {
      axios.delete(`/favorites/${user.ogrenciNo}/${announcement.ilanId}`)
        .then(response => {
          console.log("Favori ilan başarıyla kaldırıldı:", response.data);
          // Favori ilan başarıyla kaldırıldıktan sonra gerekli işlemleri yapabilirsiniz
          // Örneğin, favorileri güncelleyebilirsiniz
          const updatedFavorites = favorites.filter(favorite => !(favorite.ilan.ilanId === announcement.ilanId && favorite.ogrenci.ogrenciNo === user.ogrenciNo));
          setFavorites(updatedFavorites);
        })
        .catch(error => {
          console.error("Favori ilan kaldırılırken hata oluştu:", error);
          // Favori ilan kaldırılırken bir hata oluşursa gerekli işlemleri yapabilirsiniz
        });
    } else { // Favori yoksa, favoriyi ekle
      axios.post('/favorites/setFavorite', favoriteAnnouncementDto)
        .then(response => {
          console.log("Favori ilan başarıyla eklendi:", response.data);
          // Favori ilan başarıyla eklendikten sonra gerekli işlemleri yapabilirsiniz
          // Örneğin, favorileri güncelleyebilirsiniz
          loadFavorites()
        })
        .catch(error => {
          console.error("Favori ilan eklenirken hata oluştu:", error);
          // Favori ilan eklenirken bir hata oluşursa gerekli işlemleri yapabilirsiniz
        });
    }
  }
  function loadFavorites() {
    if (userRole === "STUDENT") {
      axios.get(`/favorites/${user.ogrenciNo}`)
        .then(res => {
          console.log("Favorites loaded successfully:", res.data);
          setFavorites(res.data);
          setPendingApiCall(false)
        })
        .catch(error => {
          console.error("Error fetching favorites:", error);
          // Favoriler yüklenirken bir hata oluşursa gerekli işlemleri yapabilirsiniz
        });
    }
    setPendingApiCall(false)

  }

  return (
    <div  className='container mx-auto w-1/4 my-12  pt-5 z-40 grid-cols-1 text-xl  grid'>

      {
        pendingApiCall ?
          <div  className="border border-slate-200  shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div  className="animate-pulse flex space-x-4">
              <div  className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div  className="flex-1 space-y-6 py-1">
                <div  className="h-2 bg-slate-700 rounded"></div>
                <div  className="space-y-3">
                  <div  className="grid grid-cols-3 gap-4">
                    <div  className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div  className="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div  className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
          :
          null
      }
      {announcements.map((announcement) => (
        <div key={announcement.ilanId}  className='px-3 py-2  mt-6 w-full bg-slate-50 shadow-lg rounded-md '>
          <a  className='flex my-2 gap-3 cursor-pointer' onClick={()=>navigate(`/company-profile/${announcement.firma.firmaId}`)}>
            <img src={announcement.firma.firmaLogo} alt=""  className='h-12 w-12 items-stretch rounded-full' />
            <div>
              <p  className='font-semibold'>{announcement.firma.firmaAd}</p>
              <p  className='text-sm text-slate-700'>{calculateTimeDifference(announcement.baslangic_tarihi)} </p>
            </div>
          </a>

          <hr />
          <div  className='pt-3 text-md text-slate-800 shadow-sm border p-2 border-spacing-2 border-transparent rounded-md   ' >
             <h1 >{announcement.postBaslik}</h1>
          </div>
         
          <hr />
          <div  className='h-64'>
            <img src={announcement.firma.firmaLogo} alt=""  className='rounded-lg  mt-2 h-full w-full' />
          </div>

          {userRole === "STUDENT" && (
            favorites.some(
              (favorite) =>
                favorite.ilan.ilanId === announcement.ilanId &&
                favorite.ogrenci.ogrenciNo === user.ogrenciNo
            ) ? (
              <div  className='flex justify-between items-center'>
                <div onClick={() => handleFavorite(announcement)}  className="flex gap-2 items-center">
                  <FaBookmark  className="mt-4 text-2xl text-slate-800 cursor-pointer" />
                  <h1  className="mt-4 text-sm cursor-pointer">Favorilerinden kaldır</h1>
                </div>
                <button onClick={()=>navigate(`/announcement-details/${announcement.ilanId}`)}  className='bg-dark-blue text-white mt-2 px-2 py-1  text-sm rounded-xl'>Detayları görüntüle</button>
              </div>
            ) : (
              <div  className='flex justify-between items-center'>
                <div onClick={() => handleFavorite(announcement)}  className="flex gap-2 items-center">
                  <FaRegBookmark  className="mt-4 text-2xl cursor-pointer" />
                  <h1  className="mt-4 text-sm cursor-pointer">Favorilerine ekle</h1>

                </div>
                <button onClick={()=>navigate(`/announcement-details/${announcement.ilanId}`)}  className='bg-dark-blue text-white mt-2 px-2 py-1  text-sm rounded-xl'>Detayları görüntüle</button>
              </div>
            )
          )}

        </div>

      ))}

    </div>
  )
}

export default Home
