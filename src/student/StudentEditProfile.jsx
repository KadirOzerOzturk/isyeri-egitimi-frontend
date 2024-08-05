import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserPhoto, setUserRole } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner'
import axios from "axios";
import {  MdAddCircleOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Loading from "../components/Loading"

export default function StudentEditProfile() {
    const { user } = useSelector(state => state.auth);
    const { userPhoto } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [changedUser, setChangedUser] = useState({ ...user })
    const [skills, setSkills] = useState([])
    const [skill, setSkill] = useState()
    const [showModal, setShowModal] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState(""); // State'i başlangıçta boş bir string olarak tanımla
    const [showSkills, setShowSkills] = useState([])
    const [pendingApiCall,setPendingApiCall]=useState(false)

    useEffect(() => {

        if (user) {
            getSkills()
        }
    }, [user, dispatch])

    function getSkills() {
        axios.get(`/skills/getSkills/${user.ogrenciNo}`)
            .then((res) => {
                if (res.status === 200) {
                    setSkills(res.data)
                    setShowSkills(res.data)
                }
            })
            .catch(error => {
                console.error("Haftalik rapor yuklenirken hata oluştu:", error);
            });
    }

    const handleSkillInput = (e) => {
        setSkill(e.target.value);
    };
    // Select box'ta seçilen değeri state'e kaydetmek için bir event handler
    const handleSelectChange = (e) => {
        setSelectedLevel(e.target.value); // Seçilen değeri state'e kaydet
    };
    // Update the state when an input value changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChangedUser({ ...user, [name]: value })

    };

    const handleSaveSkill = (e) => {

        if ((!skill && selectedLevel) || (skill && !selectedLevel)) {
            toast.error('Lütfen yetenek ve seviye bilgilerini doldurun.');
            return;
        }
        setShowModal(false)
        axios.post(`/skills/save`, {
            ogrenci: user,
            aciklama: skill.toUpperCase(),
            seviye: selectedLevel
        }

        )
            .then(response => {
                // Başarılı bir şekilde güncellendiğinde yapılacak işlemler
                if (response.status === 200) {
                    console.log('Bilgiler güncellendi:', response.data);
                    toast.info('Bilgileriniz Güncellendi');
                    getSkills()
                    setSelectedLevel("")
                }

            })
            .catch(error => {
                // Hata durumunda yapılacak işlemler
                console.error('Hata:', error);
            });

    };
    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (JSON.stringify(user) === JSON.stringify(changedUser)) {
            navigate("/student-profile");
            return;
        }
        setPendingApiCall(true)
        axios.put(`/students/update/${user.ogrenciNo}`, changedUser)
            .then(response => {
                // Başarılı bir şekilde güncellendiğinde yapılacak işlemler
                if (response.status === 200) {
                    setPendingApiCall(true)
                    toast.info('Bilgileriniz Güncellendi');
                    localStorage.setItem('userData', JSON.stringify(changedUser));
                    setUser(localStorage.getItem('userData'))
                    navigate("/student-profile")
                }

                console.log('changedUser : ' + JSON.stringify(changedUser))
            })
            .catch(error => {
                // Hata durumunda yapılacak işlemler
                console.error('Hata:', error);
                setPendingApiCall(true)
            });


    };
    const handleDeleteSkill = (e, skillId) => {
        axios.delete(`/skills/delete/${user.ogrenciNo}/${skillId}`)
            .then(response => {

                if (response.status === 200) {
                    console.log('Yetenek silindi:', response.data);
                    toast.info('Yetenek silindi');

                    getSkills()
                }
            })
            .catch(error => {
                // Hata durumunda yapılacak işlemler
                console.error('Hata:', error);
            });

    }

    const uploadPhoto = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        dispatch(setUserPhoto(file));

        const formData = new FormData();
        formData.append('file', file);

        axios.post(`s3-bucket/upload/profilePhoto/student/${user.ogrenciNo}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                toast.success("Profil fotoğrafı başarı ile kaydedildi");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || error.message);
            });
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <form className="container mx-auto  my-5 pl-24 pt-5 z-40  ">
            {pendingApiCall && <Loading/>}
            <div className="space-y-12 ">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Profil
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you
                        share.
                    </p>

                    <div className="mt-10 grid grid-cols-1  gap-y-8 ">
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full gap-12">
                            <div className="flex items-center gap-2">
                                <h1
                                    htmlFor="tcno"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    TC Kimlik No :
                                </h1>
                                <p className="text-sm  text-slate-600">{user.ogrenciKimlikNo}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <h1
                                    htmlFor="fullname"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    İsim Soyisim :
                                </h1>
                                <p className="text-sm  text-slate-600">{user.ogrenciAd + " " + user.ogrenciSoyad}</p>

                            </div>
                            <div className="flex items-center gap-2">
                                <h1
                                    htmlFor="ogrenciSinif"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Sınıf :
                                </h1>
                                <p className="text-sm  text-slate-600">{user.ogrenciSinif}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="ogrenciAgno"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    AGNO :
                                </label>
                                <p className="text-sm  text-slate-600">{user.ogrenciAgno}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="ogrenciNo"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Öğrenci Numarası :
                                </label>
                                <p className="text-sm  text-slate-600">{user.ogrenciNo}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="ogrenciEposta"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    E-mail :
                                </label>
                                <input defaultValue={user.ogrenciEposta} name="ogrenciEposta" onChange={handleInputChange} className="text-sm  border-2 rounded-md p-1 text-slate-600" />
                            </div>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Telefon No :
                                </label>
                                <input defaultValue={user.ogrenciTelNo} name="ogrenciTelNo" onChange={handleInputChange} className="text-sm  border-2 rounded-md p-1 text-slate-600" />
                            </div>
                            <div className="flex items-center gap-2">
                                <label
                                    htmlFor="ogrenciAdres"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Adres :
                                </label>
                                <input defaultValue={user.ogrenciAdres} name="ogrenciAdres" onChange={handleInputChange} className="text-sm  border-2 rounded-md p-1 text-slate-600" />
                            </div>

                        </div>

                        <div className="col-span-full">
                            <div className="flex justify-between">
                                <label
                                    htmlFor="ogrenciHakkinda"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Hakkında
                                </label>
                                <p className="text-slate-500">{`Karakter sayısı:${changedUser.ogrenciHakkinda ? changedUser.ogrenciHakkinda.length : 0}`}/1000</p>
                            </div>
                            <div className="mt-2">
                                <textarea
                                    id="ogrenciHakkinda"
                                    name="ogrenciHakkinda"
                                    rows={8}
                                    defaultValue={user.ogrenciHakkinda}
                                    maxLength={1000}
                                    className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Bu bölümde kendini açıklamanı istiyoruz.
                            </p>
                        </div>
                        <div className=" md:flex grid-cols-1  justify-between items-center ">


                            <div className="col-span-full  ">
                                <label
                                    htmlFor="ogrenciFotograf"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Fotoğraf
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <img
                                        className="h-12 w-12 rounded-full"
                                        alt=""
                                        src={userPhoto}
                                    />
                                    <div className="mt-2 flex items-center gap-x-3">
                                        <label htmlFor="ogrenciFotograf" className="mr-2">
                                            Değiştir
                                        </label>
                                        <input
                                            onChange={(e) => uploadPhoto(e)}
                                            type="file"
                                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="mx-auto md:pl-12 mt-3 md:border-l-2" onKeyPress={handleKeyPress}>
                                <label
                                    htmlFor="ogrenciParola"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Parola
                                </label>
                                <button onClick={() => navigate('/change-password')} className="border-l-2 bg-gray-200  py-1 px-2 rounded-md">
                                    Parola güncelle
                                </button>
                            </div>

                        </div>
                    </div>
                </div>



                <div className="border-b border-gray-900/10 pb-12">
                    <div className="flex gap-2 items-center">
                        <h2 className="font-semibold leading-7 text-lg text-gray-900">
                            Yetenekler
                        </h2>
                        <MdAddCircleOutline onClick={(e) => {
                            e.preventDefault(); // Prevent default behavior
                            setShowModal(true);
                        }} className="text-2xl hover:bg-slate-200 hover:text-3xl rounded-full cursor-pointer" />

                    </div>
                    {showSkills.length !== 0 ? <table>
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Adi</th>
                                <th className="px-4 py-2">Seviye</th>
                                <th className="px-4 py-2"></th>

                            </tr>
                        </thead>
                        <tbody className=''>
                            {showSkills.map((skill) => (
                                <tr key={skill.id}>
                                    <td className="px-4 py-2">{skill.aciklama}</td>
                                    <td className="px-4 py-2">{skill.seviye}</td>
                                    <FaTrash onClick={(e) => {
                                        handleDeleteSkill(e, skill.skillId);
                                    }} className="cursor-pointer mx-4 my-3" />
                                </tr>
                            ))}
                        </tbody>
                    </table> : <p>Henuz bir yetenek girmediniz ... </p>}


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                        {/* <div  className="sm:col-span-3">
                                <label
                                    htmlFor="last-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Seviye
                                </label>
                                <div  className="mt-2">

                                </div>
                            </div> */}
                        {/* 
                            <div  className="sm:col-span-4">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email address
                                </label>
                                <div  className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                                    // onChange={handleInputChange}
                                    />
                                </div>
                            </div> */}



                    </div>
                </div>


            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    onClick={() => navigate("/student-profile")}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                >
                    Geri
                </button>
                <button
    onClick={(e) => handleFormSubmit(e)} 
    type="submit"
    className="rounded-md bg-dark-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-light-blue hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
    Kaydet
</button>
            </div>
            <Toaster richColors position="top-center" />

            {/* ************************************* modal ****************************************** */}

            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Yetenek Ekle
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-4 w flex-auto">
                                    <label
                                        htmlFor="skill"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Yetenek
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="skill"
                                            name="skill"
                                            type="skill"
                                            autoComplete="skill"
                                            className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleSkillInput}
                                        />
                                    </div>

                                    <div className="mt-2">
                                        <form className="max-w-sm mx-auto ">
                                            <label htmlFor="skill" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seviyeniz</label>
                                            <select required value={selectedLevel} // Seçilen değeri belirt
                                                onChange={handleSelectChange} id="skill" className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected>Seviyenizi Seciniz</option>
                                                <option value="Temel">Temel</option>
                                                <option value="Orta">Orta</option>
                                                <option value="Ileri">İleri</option>

                                            </select>
                                        </form>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        disabled={!skill || !selectedLevel}
                                        className={`bg-emerald-500 text-white ${(!skill || !selectedLevel) ? 'opacity-50 cursor-not-allowed' : 'active:bg-emerald-600'
                                            } font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                        type="button"
                                        onClick={handleSaveSkill}

                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </form>
    );
}
