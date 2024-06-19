import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaUser } from "react-icons/fa";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { CiEdit, CiTrash } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateStudentGroupModal from '../components/CreateStudentGroupModal';
import AddStudentToGroupModal from '../components/AddStudentToGroupModal';
import AreYouSureModal from '../components/AreYouSureModal';
import Loading from '../components/Loading';

function EditStudentGroups() {
  const { user } = useSelector(state => state.auth);

  const [groups, setGroups] = useState([]);
  const [studentsInGroup, setStudentsInGroup] = useState([]);
  const [studentsInSelectedGroup, setStudentsInSelectedGroup] = useState([]);
  const [selectedStudentNo, setSelectedStudentNo] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const [reports, setReports] = useState([]);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAreYouSureModal, setShowAreYouSureModal] = useState(false);
  const [showAreYouSureModalDiscardFromStudent,setShowAreYouSureModalDiscardFromStudent]= useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [highlightedGroupId, setHighlightedGroupId] = useState(""); // New state variable
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`/groups`)
        .then(res => {

            setGroups(res.data);
          return axios.get(`/studentsInGroup/getAllStudents/`);
        })
        .then(res => {
          setStudentsInGroup(res.data);
        })
        .catch(error => {
          setGroups(null);
          console.error("Error fetching data:", error);
        });
    }
  }, [user]);

  const handleShowStudents = (e, groupId) => {
    e.preventDefault();
    setSelectedGroupId(groupId);
    setHighlightedGroupId(groupId); // Update the highlighted group ID
    setShowStudents(true);
    axios.get(`/studentsInGroup/getStudents/${groupId}`)
      .then(res => {
        setStudentsInSelectedGroup(res.data);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      });
  };

  const handleShowTaskBtn = (e, studentNo) => {
    e.preventDefault();
    axios.get(`/report/${studentNo}`)
      .then(res => {
        if (res.status === 200) {
          setReports(res.data);
        }
      })
      .catch(error => {
        console.error("Error fetching report:", error);
      });
    setSelectedStudentNo(studentNo);
    setShowTasks(!showTasks);
  };

  const filterStudentsByGroupId = (groupId) => {
    return studentsInGroup.filter(student => student.studentGroup.grupId === groupId);
  };

  const handleDownloadReport = (e, report) => {
    e.preventDefault();
    console.log("Downloading report:", report);
  };

  const handleDeleteStudentFromGroup = (e, studentNo) => {
    e.preventDefault();
    setSelectedStudentNo(studentNo);
    setShowAreYouSureModalDiscardFromStudent(true);
  };
 

  const handleCreateGroup = (e) => {
    e.preventDefault();
    setShowCreateGroupModal(true);
  };
  
  const handleShowAddStudentModal = () => {
    setShowAddStudentModal(!showAddStudentModal);
  };
  
  const handleCreateGroupModal = () => {
    setShowCreateGroupModal(!showCreateGroupModal);
  };
  
  const handleConfirmApplication = () => {
    setPendingApiCall(true);
    axios.delete(`/studentsInGroup/deleteStudent/${selectedStudentNo}`)
      .then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
        console.log(res.data);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      })
      .finally(() => {
        setPendingApiCall(false);
        setShowAreYouSureModal(false);
      });
  };

  const handleCancelApplication = () => {
    setShowAreYouSureModal(false);
  };

  // delete group
 const handleDeleteGroup = (e) => {
    e.preventDefault();
    setShowAreYouSureModal(true);
  };
  const handleConfirmDeleteGroup = () => {
    setPendingApiCall(true);
    axios.delete(`/groups/deleteGroup/${selectedGroupId}`)
      .then(res => {
        if (res.status === 200) {
          window.location.reload();
        }
        console.log(res.data);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
      })
      .finally(() => {
        setPendingApiCall(false);
        setShowAreYouSureModal(false);
      });
  };
  return (
    <div className='container grid grid-cols-2 mx-auto my-5 pl-24 pt-5 z-40'>
      {pendingApiCall ? <Loading /> : null}

      <div className='flex justify-between'>
        <div className="border-slate-200 border-2 p-3 text-sm font-medium text-gray-900 bg-white rounded-lg">
          <span className='flex justify-between px-6 items-center'>
            <h1 className='py-2 text-center text-lg'>Öğrenci Grupları</h1>
            <IoIosAddCircleOutline onClick={handleCreateGroup} className='text-2xl cursor-pointer hover:text-white hover:bg-slate-500 rounded-full' />
          </span>
          <table className="mx-auto text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Grup numarası</th>
                <th scope="col" className="px-6 py-3">İzleyici Adı</th>
                <th scope="col" className="px-6 py-3">Öğrenci Sayısı</th>
                <th scope="col" className="px-6 py-3 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => (
                <tr 
                  key={group.grupId} 
                  className={`odd:bg-white even:bg-gray-50 border-b ${highlightedGroupId === group.grupId ? 'bg-gray-600' : ''}`}
                >
                  <th scope="row" className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{group.grupId}</th>
                  <td className="px-6 py-4 text-nowrap">{group.izleyici.izleyiciAd} {group.izleyici.izleyiciSoyad}</td>
                  <td className="px-6 py-4">{filterStudentsByGroupId(group.grupId).length}</td>
                  <td className="px-6 py-4 flex items-center border-r-2">
                    <div onClick={(e) => handleShowStudents(e, group.grupId)} className='flex w-full gap-1 items-center cursor-pointer text-nowrap hover:underline rounded-lg p-2'>
                      <FaUser className='text-xl' />
                      <p>Öğrencileri Görüntüle</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='border-slate-200 border-2 p-3 text-sm font-medium text-gray-900 bg-white rounded-lg'>
          <div className='flex justify-between px-5 items-center'>
            <h1 className='py-2 text-center text-lg'>Grup Bilgileri</h1>
            {showStudents && <div className='flex items-center justify-between gap-4 '>
              <CiEdit onClick={() => setIsEditing(!isEditing)} className='text-3xl cursor-pointer' />
              <FaTrash onClick={(e) => handleDeleteGroup(e)} className='text-2xl text-red-500 hover:text-red-400 cursor-pointer' />
            </div>} 
          </div>
          <table className="mx-auto text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr className='rounded-md'>
                <th scope="col" className="px-6 py-3 mx-auto text-nowrap">Grup No</th>
                <th scope="col" className="px-6 py-3 mx-auto text-nowrap">Öğrenci </th>
                <th scope="col" className="px-6 py-3 mx-auto text-nowrap">E-posta</th>
                <th scope="col" className="px-6 py-3 mx-auto text-nowrap">Çalıştığı Firma</th>
                <th scope="col" className="px-6 py-3 mx-auto text-nowrap text-center"></th>
              </tr>
            </thead>
            <tbody>
              {studentsInSelectedGroup.length > 0 ? (
                studentsInSelectedGroup.map(student => (
                  <tr key={student.student?.ogrenciId} className={`odd:bg-white ${showTasks && selectedStudentNo === student.student.ogrenciNo ? 'bg-gray-200' : 'bg-gray-50'} border-b`}>
                    <td className="px-6 py-4">{selectedGroupId}</td>
                    <th scope="row" onClick={() => navigate(`/student-profile/${student.student.ogrenciNo}`)} className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {student.student?.ogrenciAd} {student.student?.ogrenciSoyad}
                    </th>
                    <td className="px-6 py-4">{student.student?.ogrenciEposta}</td>
                    <td className="px-6 py-4 text-nowrap">{student.student?.firma.firmaAd}</td>
                    {isEditing && (
                      <td className="px-6 py-4 text-nowrap">
                        <button onClick={(e)=>handleDeleteStudentFromGroup(e,student.student.ogrenciNo)} className='bg-red-400 ml-4 py-0.5 px-1 rounded-md text-white'>Gruptan Çıkar</button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='p-2' colSpan="3">Henüz seçim yapılmadı</td>
                </tr>
              )}
              {isEditing && (
                <tr>
                  <td colSpan="4" className="p-4">
                    <button onClick={() => setShowAddStudentModal(true)} className='mt-3 bg-green-400 px-3 py-2 text-white rounded-md'>Öğrenci Ekle</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showAddStudentModal && <AddStudentToGroupModal onClose={handleShowAddStudentModal} selectedGroupId={selectedGroupId} />}
      {showCreateGroupModal && <CreateStudentGroupModal onClose={handleCreateGroupModal} />}
      {showAreYouSureModalDiscardFromStudent ? (
        <AreYouSureModal
          title="Emin Misin?"
          text="Öğrenciyi gruptan çıkartmak istediğinize emin misiniz?"
          purpose="cancel"
          onConfirm={handleConfirmApplication}
          onCancel={handleCancelApplication}
        />
      ) : null}
      {showAreYouSureModal ? (
        <AreYouSureModal
          title="Emin Misin?"
          text="Öğrenci Grubunu silmek istediğinize emin misiniz?"
          purpose="cancel"
          onConfirm={handleConfirmDeleteGroup}
          onCancel={handleCancelApplication}
        />
      ) : null}
    </div>
  );
}

export default EditStudentGroups;
