import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const CV = () => {
  const location = useLocation();
  const { pathname } = location;
  const parts = pathname.split("/")
  const studentNo = parts[parts.length - 1]


  const navigate=useNavigate()
  const {userRole} =useSelector(state=>state.auth)
  const [student, setStudent] = useState({});
  const [skills, setSkills] = useState([])

useEffect(()=>{
 
  axios.get(`/students/${studentNo}`)
  .then(res => {
      setStudent(res.data);


  })
  .catch(error => {
      console.error("Error fetching comp:", error);
  });
axios.get(`/skills/getSkills/${studentNo}`)
  .then((res) => {
      if (res.status === 200) {
          setSkills(res.data)
        
      }
  })
  .catch(error => {
      console.error("Haftalik rapor yuklenirken hata oluştu:", error);
  });
  downloadPDF()
  navigate(`/${userRole.toLoverCase}-profile`)
},[])  
const downloadPDF = () =>{
  const capture = document.querySelector('.cv-container');
  html2canvas(capture).then((canvas)=>{
    const imgData = canvas.toDataURL('img/png');
    const doc = new jsPDF('p', 'mm', 'a4');
    const componentWidth = doc.internal.pageSize.getWidth();
    const componentHeight = doc.internal.pageSize.getHeight();
    doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);

    doc.save('cv.pdf');
  })
}
  // State to hold CV data
  

  // CSS stil tanımlamaları
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      background: '#fff',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center',
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      borderBottom: '2px solid #333',
      paddingBottom: '5px',
      marginBottom: '10px',
    },
    contactInfo: {
      textAlign: 'center',
    },
    contactInfoItem: {
      margin: '5px 0',
    },
  };

  return (
 
    <div className="cv-container">
      <h2>Özgeçmiş</h2>

      <div className="personal-info">
        <h3>Kişisel Bilgiler</h3>
        <p>Adı Soyadı: {student.ogrenciAd} {student.ogrenciSoyad}</p>
        <p>E-posta: {student.ogrenciEposta}</p>
        <p>Telefon: {student.ogrenciTelNo}</p>
        <p>Adres: {student.ogrenciAdres}</p>
      </div>

      <div className="education-info">
        <h3>Eğitim Bilgileri</h3>
        <p>Üniversite/Fakülte: {student.ogrenciFakulte}</p>
        <p>Öğrenci No: {student.ogrenciNo}</p>
        <p>Sınıf: {student.ogrenciSinif}. Sınıf</p>
        <p>Not Ortalaması: {student.ogrenciAgno}</p>
      </div>

      <div className="skills-info">
        <h3>Yetenekler ve Beceriler</h3>
        {skills.map((skill, index) => (
          <p key={index}>{skill.aciklama}: {skill.seviye}</p>
        ))}
      </div>

      <div className="about-info">
        <h3>Hakkında</h3>
        <p>{student.ogrenciHakkinda}</p>
      </div>

     

      <div className="references">
        <h3>Referanslar</h3>
        <p>İsim: [Referansın İsmi]</p>
        <p>İletişim: [Referansın İletişim Bilgisi]</p>
      </div>
    </div>
  );
}



export default CV;
