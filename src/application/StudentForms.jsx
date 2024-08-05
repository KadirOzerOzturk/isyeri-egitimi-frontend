import React, { useEffect, useState } from 'react';
import {  FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

function StudentForms() {
    const { user } = useSelector(state => state.auth)


    const [students, setStudents] = useState([]);
    const [selectedStudent,setSelectedStudent]= useState({});
    const [folders, setFolders] = useState([]);
    const [loading,setLoading]=useState(false)
    const [files,setFiles]=useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const fetchFoldersAndStudents = async () => {
          try {
            const foldersResponse = await axios.get('/s3-bucket/list-all-folders');
            const folders = foldersResponse.data.map(folder => folder.replace(/\/$/, '')); // Remove trailing slashes
            
            console.log(folders)
           
            const studentsResponse = await axios.get('/students/getAll');
            const students = studentsResponse.data;
            
            console.log("students 1"+students)
            const filteredStudents = students.filter(student => folders.includes(student.ogrenciNo.toString()));
            
            setFolders(folders);
            console.log("folders "+folders);
            setStudents(filteredStudents);
            console.log(filteredStudents);
          } catch (error) {
            console.error("There was an error fetching data:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchFoldersAndStudents();
      }, []);


      const showStudent=(e,ogrenciNo)=>{
        console.log(ogrenciNo);
        setSelectedStudent(students.find(student => student.ogrenciNo === ogrenciNo));     
    
          getStudentsFiles(ogrenciNo)
      }




      const getStudentsFiles = async (ogrenciNo) => {
        setLoading(true);
        try {
            const filesResponse = await axios.get(`/s3-bucket/list-files/${ogrenciNo}`);
            setFiles(filesResponse.data);
            console.log(files);
        } catch (error) {
            console.error("Error fetching student files:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadFile = async (fileKey) => {
        try {
            const response = await axios.get(`/s3-bucket/download/${selectedStudent.ogrenciNo + "/" + fileKey}`, { responseType: 'blob' });
            
            // Blob nesnesi oluşturuluyor, content-type header'ı kullanılıyor
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileKey); // Dosya adı ayarlanıyor
            document.body.appendChild(link);
            link.click();
            
            // Temizleme işlemi
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url); // URL'yi serbest bırak
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };
    



    return (
        <div  className='container flex  justify-center  mx-auto my-5  pt-5  '>
            <div  className='flex justify-between '>
                <div  className="border-slate-200 border-2 p-3 text-sm font-medium text-gray-900 bg-white rounded-lg">
                    <h1  className='py-2 text-center text-lg'> Öğrenciler</h1>
                    <table  className="mx-auto text-sm text-left rtl:text-right text-gray-500">
                        <thead  className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col"  className="px-6 py-3 text-nowrap">
                                    Öğrenci Numarası
                                </th>
                                <th scope="col"  className="px-6 py-3 text-nowrap">
                                    Öğrenci Adı
                                </th>
                                
                                <th scope="col"  className="px-6 py-3 text-center">

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (

                                <tr key={student.ogrenciNo}  className={`rounded-lg border-b ${selectedStudent.ogrenciNo === student.ogrenciNo && "bg-slate-300 text-black"}`} >
                                    <th scope="row"  className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {student.ogrenciNo}
                                    </th>
                                    <td  className="px-6 py-4 text-nowrap">
                                        {student.ogrenciAd} {student.ogrenciSoyad}
                                    </td>
                                    

                                    <td  className="px-6 py-4 flex items-center border-r-2 ">
                                        <div onClick={(e) => showStudent(e, student.ogrenciNo)}  className='flex w-full gap-1 items-center cursor-pointer text-nowrap hover:underline rounded-lg p-2    ' >
                                            <FaUser  className='text-xl ' />
                                            <p>Belgeleri Görüntüle</p>
                                        </div>


                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div  className='border-slate-200 ml-3 border-2 p-3 min-w-96 text-sm font-medium text-gray-900 bg-white w-full flex flex-col  rounded-lg  '>
                    <h1  className='py-2 text-center text-xl  '>Öğrenci Belgeleri</h1>
                    <table  className="mx-auto text-md text-left rtl:text-right text-gray-500">
                        <thead  className="text-sm flex min-w-96 text-gray-700 uppercase bg-gray-50 ">
                            <tr  className='rounded-md '>
                                <th scope="col"  className="px-6 py-3 w-full text-nowrap">
                                    Belge Adı
                                </th>        
                            </tr>
                        </thead>
                        <tbody>
                       
                        <div className='mt-3' >
                            
                            <ul >
                                {files.map((file, index) => (
                                    <li key={index} className="py-1 flex justify-between ">
                                        <p>{file}</p>
                                        <button onClick={() => downloadFile(file)} className="bg-dark-blue hover:bg-blue-600 duration-200 shadow-lg text-white w-1/4 py-2 px-2 rounded ">
                                            İndir
                                        </button>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    
                                    

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default StudentForms   