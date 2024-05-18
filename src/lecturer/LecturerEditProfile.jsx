import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { setUser } from '../store/auth';

function LecturerEditProfile() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const [changedUser, setChangedUser] = useState({ ...user })

    // Update the state when an input value changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChangedUser({ ...user, [name]: value })
        console.log("changedUser 1 " ,changedUser)
    };
  
    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault();
   
        axios.put(`/lecturer/update/${user.izleyiciId}`, changedUser)
             .then(response => {
                 // Başarılı bir şekilde güncellendiğinde yapılacak işlemler
                 if (response.status==200) {
                    console.log('Bilgiler güncellendi:', response.data);
                 toast.success('Bilgileriniz Güncellendi');
                 try {
                    const res =  axios.get(`/lecturer/${user.izleyiciId}`);
                    if (res.status === 200) {
                      console.log("res" + res)
                      toast.success("Giriş başarılı ")
              
                      localStorage.setItem('userData', JSON.stringify(res.data));
              
                      dispatch(setUser(res.data)); 
                      navigate("/lecturer-profile")
                    }
                  } catch (error) {
                 
                    console.log(error)
                  }
                 }
             })
             .catch(error => {
                 // Hata durumunda yapılacak işlemler
                 console.error('Hata:', error);
             });
             
    };
  return (
    <form  className="container mx-auto my-5 pl-24 pt-5 z-40  ">
            <div  className="space-y-12">
                <div  className="border-b border-gray-900/10 pb-12">
                    <h2  className="text-base font-semibold leading-7 text-gray-900">
                        Profile
                    </h2>
                    <p  className="mt-1 text-md leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you
                        share.
                    </p>

                    <div  className="mt-10 grid grid-cols-1  gap-y-8 ">
                        <div  className="grid grid-cols-3 w-full gap-12">
                            <div  className="flex items-center gap-2">
                                <h1
                                    htmlFor="izleyiciAd"
                                     className="block text-md font-medium leading-6 text-gray-900"
                                >
                                    Adı :
                                </h1>
                                <p  className="text-md  text-slate-600">{user.izleyiciAd}</p>
                            </div>
                            <div  className="flex items-center gap-2">
                                <h1
                                    htmlFor="izleyiciSoyad"
                                     className="block text-md font-medium leading-6 text-gray-900"
                                >
                                    Soyadı : 
                                </h1>
                                <p  className="text-md  text-slate-600">{user.izleyiciSoyad }</p>

                            </div>
                           
                            <div  className="flex items-center gap-2">
                                <label
                                    htmlFor="firmaEposta"
                                     className="block text-md font-medium leading-6 text-gray-900"
                                >
                                    E-mail
                                </label>
                                <input defaultValue={user.izleyiciEposta} name="izleyiciEposta" onChange={handleInputChange}  className="text-md  border-2 rounded-md p-1 text-slate-600" />
                            </div>
                            
                            

                        </div>

                        <div  className="col-span-full">
                            <label
                                htmlFor="about"
                                 className="block text-md font-medium leading-6 text-gray-900"
                            >
                                About
                            </label>
                            <div  className="mt-2">
                                <textarea
                                    id="izleyiciHakkinda"
                                    name="izleyiciHakkinda"
                                    rows={8}
                                    defaultValue={user.izleyiciHakkinda}
                                    maxLength={1000}
                                     className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <p  className="mt-3 text-md leading-6 text-gray-600">
                            Bu bölümde kendinizi açıklamanızı istiyoruz.

                            </p>
                        </div> 
                        <div  className="flex justify-between items-center ">


                            <div  className="col-span-full ">
                                <label
                                    htmlFor="photo"
                                     className="block text-md font-medium leading-6 text-gray-900"
                                >
                                    Photo
                                </label>
                                <div  className="mt-2 flex items-center gap-x-3">
                                    <img
                                         className="h-12 w-12 rounded-full"
                                        alt=""
                                        src={user?.logo}
                                    ></img>
                                    <button
                                        type="button"
                                         className="rounded-md bg-white px-2.5 py-1.5 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div  className="mx-auto pl-12 border-l-2">
                                <label
                                    htmlFor="password"
                                     className="block text-md font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                                <button onClick={()=>navigate('/change-password')}  className="border-l-2 bg-gray-200  py-1 px-2 rounded-md">
                                    Change Password
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

              

                {/* <div  className="border-b border-gray-900/10 pb-12">
                   

                    <div  className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div  className="sm:col-span-3">
                            <label
                                htmlFor="first-name"
                                 className="block text-md font-medium leading-6 text-gray-900"
                            >
                                Istenen Nitelikler 
                            </label>
                            <div  className="mt-2 flex gap-4">
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    
                                    autoComplete="given-name"
                                     className=" p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                // onChange={handleInputChange}
                                />
                                 <button   className="bg-slate-300 w-24 rounded-md">ekle</button>
                            </div>
                        </div>
                    </div>
                </div> */}


            </div>

            <div  className="mt-6 flex items-center justify-end gap-x-6">
                <button
                onClick={()=>navigate(`/company-profile`)}
                    type="button"
                     className="text-md font-semibold leading-6 text-gray-900"
                >
                    Cancel
                </button>
                <button
                    onClick={handleFormSubmit}
                    type="submit"
                     className="rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >

                    Save
                </button>
            </div>
            <Toaster richColors position="top-right" />

        </form>
  )
}

export default LecturerEditProfile