import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { Toaster } from 'sonner'

function CreateStudentGroupModal({ onClose }) {
    const [group, setGroup] = useState({
        lecturer: ""
    })
    console.log(group.lecturer)
    const [lecturers, setLecturers] = useState([])
    useEffect(() => {

        axios.get("/lecturer/getAll")
            .then((res) => {
                console.log(res.data)
                setLecturers(res.data)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`/groups/createGroup/${group.lecturer}`)
            .then((res => {
                onClose()
                window.location.reload()
                console.log(res)
            }))
            .catch((error) => {
                console.error(error)
            })


    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGroup((prevGroup) => ({
            ...prevGroup,
            [name]: value,
        }));
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full max-w-lg mx-auto p-6">
                <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Öğrenci Grubu Oluştur
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <MdOutlineClose className='text-2xl' />
                    </button>
                </div>
                <div className="py-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="max-w-sm">
                            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                İzleyici Akademisyen Seçiniz.
                            </label>
                            <select
                                value={group.lecturer}
                                name="lecturer"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Lütfen Seçiniz</option>
                                {lecturers.map((lecturer) => (
                                    <option key={lecturer.izleyiciId} value={lecturer.izleyiciId}>
                                        {lecturer.izleyiciAd} {lecturer.izleyiciSoyad}
                                    </option>
                                ))}
                            </select>

                        </div>



                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Oluştur
                        </button>
                    </form>
                </div>
            </div>
            <Toaster richColors position="top-center" />

        </div>
    )
}

export default CreateStudentGroupModal