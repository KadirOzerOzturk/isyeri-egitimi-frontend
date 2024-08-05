import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import moment from 'moment';

function ListStudentGroups() {
    const { user } = useSelector(state => state.auth)

    const [groups, setGroups] = useState([]);
    const [studentsInGroup, setStudentsInGroup] = useState([]);
    const [studentsInSelectedGroup, setStudentsInSelectedGroup] = useState([]);
    const [selectedStudentNo, setSelectedStudentNo] = useState("")
    const [showTasks, setShowTasks] = useState()
    const [reports, setReports] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        console.log(user)
        if (user) {
            axios.get(`/groups/${user?.izleyiciId}`)
                .then(res => {
                    console.log(res.data);
                    setGroups(res.data);
                    axios.get(`/studentsInGroup/getAllStudents/`)
                        .then(res => {
                            console.log(res.data);
                            setStudentsInGroup(res.data);

                        })
                })
                .catch(error => {
                    console.error("Error fetching comp:", error);
                });
        }

    }, [user]);


    const showStudents = (e, groupId) => {
        e.preventDefault();
        axios.get(`/studentsInGroup/getStudents/${groupId}`)
            .then(res => {
                console.log(res.data);
                setStudentsInSelectedGroup(res.data);
            })
            .catch(error => {
                console.error("Error fetching students:", error);
            });
    }


    const handleShowTaskBtn = (e, studentNo) => {
        e.preventDefault();
        axios.get(`/report/${studentNo}`)
            .then((res) => {
                if (res.status === 200) {
                    setReports(res.data)

                }
            })
            .catch(error => {
                console.error("Haftalik rapor yuklenirken hata oluştu:", error);
            });
        console.log(studentNo)
        setSelectedStudentNo(studentNo)
        setShowTasks(!showTasks);
    };

    const filterStudentsByGroupId = (groupId) => {
        return studentsInGroup.filter(student => student.studentGroup.grupId === groupId);
    };

    const handleDownloadReport = (e,report) => {
        e.preventDefault()
        // Rapor indirme işlemini gerçekleştir
        console.log("Rapor indirme işlemi gerçekleştirildi." + report);
    };


    return (
        <div  className='container grid grid-cols-2  mx-auto my-5 pl-24 pt-5 z-40 '>
            <div  className='flex justify-between '>
                <div  className="border-slate-200 border-2 p-3 text-sm font-medium text-gray-900 bg-white rounded-lg">
                    <h1  className='py-2 text-center text-lg'> Öğrenci Grupları</h1>
                    <table  className="mx-auto text-sm text-left rtl:text-right text-gray-500">
                        <thead  className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col"  className="px-6 py-3">
                                    Grup numarası
                                </th>
                                <th scope="col"  className="px-6 py-3">
                                    İzleyici Adı
                                </th>
                                <th scope="col"  className="px-6 py-3">
                                    Öğrenci Sayısı
                                </th>
                                <th scope="col"  className="px-6 py-3 text-center">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => (

                                <tr key={group.grupId}  className="odd:bg-white  even:bg-gray-50 border-b">
                                    <th scope="row"  className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {group.grupId}
                                    </th>
                                    <td  className="px-6 py-4 text-nowrap">
                                        {group.izleyici.izleyiciAd} {group.izleyici.izleyiciSoyad}
                                    </td>
                                    <td  className="px-6 py-4">
                                        {filterStudentsByGroupId(group.grupId).length}
                                    </td>

                                    <td  className="px-6 py-4 flex items-center border-r-2 ">
                                        <div onClick={(e) => showStudents(e, group.grupId)}  className='flex w-full gap-1 items-center cursor-pointer text-nowrap hover:underline rounded-lg p-2    ' >
                                            <FaUser  className='text-xl ' />
                                            <p>Öğrencileri Görüntüle</p>
                                        </div>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div  className='border-slate-200  border-2 p-3 text-sm font-medium text-gray-900 bg-white top-0 rounded-lg  '>
                    <h1  className='py-2 text-center text-lg'>Öğrenci Bilgileri</h1>
                    <table  className="mx-auto text-sm text-left rtl:text-right text-gray-500">
                        <thead  className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr  className='rounded-md'>
                                <th scope="col"  className="px-6 py-3 mx-auto text-nowrap">
                                    Ad-Soyad
                                </th>
                                <th scope="col"  className="px-6 py-3 mx-auto text-nowrap">
                                    E-posta
                                </th>
                                <th scope="col"  className="px-6 py-3 mx-auto text-nowrap">
                                    Çalıştığı Firma
                                </th>
                                <th scope="col"  className="px-6 py-3 mx-auto text-nowrap">
                                    Raporu indir
                                </th>
                                <th scope="col"  className="px-6 py-3 mx-auto text-nowrap text-center">


                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsInSelectedGroup ? (
                                studentsInSelectedGroup.map((student) => (
                                    <React.Fragment key={student.student?.ogrenciId}>
                                        <tr key={student.student?.ogrenciNo}   className={`odd:bg-white ${showTasks && selectedStudentNo === student.student.ogrenciNo ? 'bg-gray-200' : 'bg-gray-50'} border-b`}>
                                            <th scope="row" onClick={()=>navigate(`/student-profile/${student.student.ogrenciNo}`)} className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                {student.student?.ogrenciAd} {student.student?.ogrenciSoyad}
                                            </th>
                                            <td  className="px-6 py-4">
                                                {student.student?.ogrenciEposta}
                                            </td>
                                            <td  className="px-6 py-4 text-nowrap">
                                                {student.student?.firma.firmaAd}
                                            </td>
                                            <td onClick={(e) => handleDownloadReport(e, reports)}>

                                                <button  className='bg-green-400  ml-4 py-0.5 px-1 rounded-md text-white '   >Raporu indir</button>
 
                                            </td>
                                            <td  className="px-6 py-4">
                                                <div  className={`flex items-center border-b-4 cursor-pointer px-2 py-1 rounded-md ${showTasks && selectedStudentNo === student.student.ogrenciNo ? "bg-slate-100" : "bg-white" } `} onClick={(e) => handleShowTaskBtn(e, student.student?.ogrenciNo)}>
                                                    <h1  className='text-md'>Görevler</h1>
                                                    {showTasks && selectedStudentNo === student.student.ogrenciNo ? <MdArrowDropUp  className='text-2xl' /> : <MdArrowDropDown  className='text-2xl' />}
                                                </div>
                                            </td>
                                        </tr>

                                        {showTasks && selectedStudentNo === student.student.ogrenciNo ? (
                                          
                                            
                                            <tr>
                                                <td colSpan="5"  className="p-4">
                                                    {reports.length === 0 ? "Rapor bulunmamakta !" : reports.map((report, index) => (
                                                        <div key={index}  className="mb-4">
                                                            <div  className="px-4 py-2 bg-white rounded-lg shadow-md">
                                                                <div  className="flex justify-between items-center">
                                                                    <span  className="font-light text-gray-600">{moment(report.tarih).format("MM/DD/YYYY")}</span>
                                                                </div>
                                                                <div  className="mt-2">
                                                                    <p  className="mt-2 text-gray-600">{report.raporIcerigi}</p>
                                                                </div>
                                                                <div  className="flex justify-between items-center mt-4">
                                                                    <div>
                                                                        <div  className="flex items-center">
                                                                            <h1  className="text-gray-700 font-bold">{report.ogrenci.ogrenciAd} {report.ogrenci.ogrenciSoyad}</h1>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </td>

                                            </tr>
                                           
                                            
                                          
                                        ) : null}
                                    </React.Fragment>

                                ))

                            ) : (
                                <tr>
                                    <td  className='p-2' colSpan="3">Henüz seçim yapılmadı</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListStudentGroups;
