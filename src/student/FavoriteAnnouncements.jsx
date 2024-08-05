import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { FaBookmark } from "react-icons/fa";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function FavoriteAnnouncements() {
  const [pendingApiCall, setPendingApiCall] = useState(true)
  const { user } = useSelector(state => state.auth)
  const [favorites, setFavorites] = useState([])
  const navigate = useNavigate()




  useEffect(() => {
    if (user) { // Eğer user tanımlı ise API isteği yap

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

  function handleFavorite(favorite) {
    axios.delete(`/favorites/${user.ogrenciNo}/${favorite.ilan.ilanId}`)
      .then(response => {
        console.log("Favori ilan başarıyla kaldırıldı:", response.data);
        toast.success("Ilan favorilerinizden kaldirildi")
        window.location.reload()
      })
      .catch(error => {
        console.error("Favori ilan kaldırılırken hata oluştu:", error);
      });
  }



  return (


    <div  className='container mx-auto my-12  pt-5 z-40 grid-cols-1 w-1/4 text-xl  grid'>
      <div>
        <h1  className='font-extrabold text-3xl '>Kaydettiğim ilanlar</h1>
        {favorites.length === 0 ? <h1  className='mt-6 text-slate-400'>Henüz favorilerinize eklediğiniz ilan bulunmamakta ...</h1> : null}
      </div>
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
      {favorites.map((favorite) => (
        <div key={favorite.ilan.ilanId}  className='px-3 py-2  mt-6  shadow-lg rounded-md '>
          <div  className='flex my-2 gap-3'>
            <img src={favorite.ilan.firma.firmaLogo}  alt=""  className='h-12 w-12 rounded-full' />
            <div>
              <p>{favorite.ilan.firma.firmaAd}</p>
              <p  className='text-sm text-slate-700'>{calculateTimeDifference(favorite.ilan.baslangic_tarihi)} </p>
            </div>
          </div>

          <hr />
          <h1  className='pt-3 text-md text-slate-800'>{favorite.ilan.baslik}</h1>
          <hr />
          <div>
            <img src={favorite.ilan.firma.firmaLogo} alt=""  className='rounded-lg mt-2 h-full w-full' />
          </div>
          <div  className='flex justify-between items-center'>
          <div  className='flex gap-2 items-center'>
            <FaBookmark onClick={() => handleFavorite(favorite)}  className='mt-4 text-2xl text-slate-800 cursor-pointer' />
            <h1  className='mt-4 text-sm cursor-pointer'>Favorilerinden kaldir</h1>
          </div>
          <button onClick={()=>navigate(`/announcement-details/${favorite.ilan.ilanId}`)}  className='bg-dark-blue text-white mt-2 px-2 py-1  text-sm rounded-xl'>Detayları görüntüle</button>
        </div>
        </div>
      ))}

    </div>

  )
}

export default FavoriteAnnouncements