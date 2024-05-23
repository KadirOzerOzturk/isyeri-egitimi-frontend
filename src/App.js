import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import LoginOptions from "./common_pages/LoginOptions";
import NoPage from "./common_pages/NoPage";
import ListForms from "./forms/ListForms";
import ListCompanies from "./common_pages/ListCompanies";
import StudentLogin from "./auth/StudentLogin";
import StudentProfile from "./student/StudentProfile";
import LecturerLogin from "./auth/LecturerLogin";
import CompanyLogin from "./auth/CompanyLogin";
import KabulFormu from "./forms/KabulFormu";
import CompanyProfile from "./company/CompanyProfile";
import Applications from "./student/Applications";
import ChangePassword from "./common_pages/ChangePassword";
import ListStudentGroups from "./lecturer/ListStudentGroups";
import ViewStudentProfile from "./common_pages/ViewStudentProfile";
import ViewCompanyProfile from "./common_pages/ViewCompanyProfile";
import StudentEditProfile from "./student/StudentEditProfile";
import CompanyEditProfile from "./company/CompanyEditProfile";
import Home from "./common_pages/Home";
import WeeklyReport from "./student/WeeklyReport";
import FavoriteAnnouncements from "./student/FavoriteAnnouncements";
import CommissionLogin from "./auth/CommissionLogin";
import ShowAnnouncementDetails from "./common_pages/ShowAnnouncementDetails";
import UploadImage from "./common_pages/UploadImage";
import ShareAnnouncement from "./company/ShareAnnouncement";
import ApplyList from "./company/ApplyList";
import AccessDenied from "./common_pages/AccessDenied";
import LecturerProfile from "./lecturer/LecturerProfile";
import WeeklyReportPdf from "./forms/WeeklyReportPdf";
import LecturerEditProfile from "./lecturer/LecturerEditProfile";
import EditAnnouncementDetails from "./company/EditAnnouncementDetails";
import ViewLecturerProfile from "./common_pages/ViewLecturerProfile";
import CommissionProfile from "./commission/CommissionProfile";
import CommissionEditProfile from "./commission/CommissionEditProfile";
import EditStudentGroups from "./commission/EditStudentGroups";

function App() {
  const { user } = useSelector(state => state.auth);
  console.log(user)
  return (
    <>
    
    <div  className="grid-cols-2">

      <div>
      <Navbar/>
      <Sidebar />
      </div>
      


      <div> 

        <Routes>
          <Route path="/upload-image" element={user != null ? <UploadImage /> : null} />

          <Route path="/login" element={user===null ? <LoginOptions /> : null} />
          <Route path="/student-login" element={user===null ? <StudentLogin /> : null} />
          <Route path="/company-login" element={user===null ? <CompanyLogin /> : null} />
          <Route path="/lecturer-login" element={user===null ? <LecturerLogin /> : null} />
          <Route path="/commission-login" element={user===null ? <CommissionLogin /> : null} />


          <Route path="/access-denied" element={<AccessDenied />} />

          <Route path="*" element={<NoPage />} />
          <Route path="/change-password" element={user !== null ? <ChangePassword /> : (<Navigate to="/login" replace />)} />
          <Route path="/" element={user !== null ? <Home /> : (<Navigate to="/login" replace />)} />
          <Route path="/announcement-details/:id" element={user !== null ? <ShowAnnouncementDetails /> : (<Navigate to="/login" replace />)} />

          {/* students */}
          <Route path="/student-profile" element={user !== null ? <StudentProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/weekly-report" element={user !== null ? <WeeklyReport /> : (<Navigate to="/login" replace />)} />
          <Route path="/favorite-announcements" element={user !== null ? <FavoriteAnnouncements /> : (<Navigate to="/login" replace />)} />
          <Route path="/student-profile/:id" element={user !== null ? <ViewStudentProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/applications" element={user !== null ? <Applications /> : (<Navigate to="/login" replace />)} />
          <Route path="/student-edit-profile" element={user !== null ? <StudentEditProfile /> : (<Navigate to="/login" replace />)} />

          {/* companies */}
          <Route path="/companies" element={user !== null ? <ListCompanies /> : (<Navigate to="/login" replace />)} />
          <Route path="/company-profile/:id" element={user !== null ? <ViewCompanyProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/company-profile" element={user !== null ? <CompanyProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/company-edit-profile" element={user !== null ? <CompanyEditProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/share-announcement" element={user !== null ? <ShareAnnouncement /> : (<Navigate to="/login" replace />)} />
         <Route path="/edit-announcement/:id" element={user !== null ? <EditAnnouncementDetails /> : (<Navigate to="/login" replace />)} />
          <Route path="/apply-list/:id" element={user !== null ? <ApplyList /> : (<Navigate to="/login" replace />)} />

          {/* lecturer */}
          <Route path="/student-group" element={user !== null ? <ListStudentGroups /> : (<Navigate to="/login" replace />)} />
          <Route path="/lecturer-profile" element={user !== null ? <LecturerProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/lecturer-profile/:id" element={user !== null ? <ViewLecturerProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/lecturer-edit-profile" element={user !== null ? <LecturerEditProfile /> : (<Navigate to="/login" replace />)} />

          {/* comission */}
          
          <Route path="/commission-profile" element={user !== null ? <CommissionProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/commission-edit-profile" element={user !== null ? <CommissionEditProfile /> : (<Navigate to="/login" replace />)} />
          <Route path="/edit-student-groups" element={user !== null ? <EditStudentGroups /> : (<Navigate to="/login" replace />)} />


          {/* Forms */}
          <Route path="/kabul-formu" element={user !== null ? <KabulFormu /> : (<Navigate to="/login" replace />)} />
          <Route path="/forms" element={user !== null ? <ListForms /> : (<Navigate to="/login" replace />)} />
          <Route path="/weekly-report-pdf" element={user !== null ? <WeeklyReportPdf /> : (<Navigate to="/login" replace />)} />


        </Routes>
        
      </div>
      
    </div>
    </>
  );
}

export default App;
