import React from 'react'
import mainLogo from '../icons/gazi_university_logo.png';
import rektorluk from '../icons/gazi_rektorluk.jpg';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

function LoginOptions() {
    const navigate = useNavigate()

    const navigateToLogin = (name) => {
        navigate(`/${name}-login`)
    }

    return (
        <div  className='relative h-screen flex justify-center items-center '>
        <img src={rektorluk}  className='absolute z-0 w-full h-full object-cover opacity-60 before:bg-dark-blue' alt="Rectorate Background" />
        <div  className="relative h-3/5 w-1/5 flex flex-col items-center bg-white bg-opacity-60 p-8 rounded-xl shadow-md z-10">
            <img src={mainLogo}  className='h-52' alt="Gazi University Logo" />
            <div  className="max-w-xs  rounded-lg text-center shadow-sm mt-12 ">
                <button type="button" onClick={() => navigateToLogin("student")}  className="w-full my-1 text-center justify-center  py-3 px-6 inline-flex items-center gap-x-2 rounded-md text-md font-medium focus:z-10 border bg-dark-blue shadow-sm text-white hover:bg-light-blue hover:text-dark-blue">
                    Öğrenci Girişi
                </button>
                <button type="button" onClick={() => navigateToLogin("lecturer")}  className="w-full my-1 text-center justify-center py-3 px-6 inline-flex items-center gap-x-2 rounded-md text-md font-medium focus:z-10 border bg-dark-blue shadow-sm text-white hover:bg-light-blue hover:text-dark-blue">
                    İzleyici Girişi
                </button>
                <button type="button" onClick={() => navigateToLogin("commission")}  className="w-full my-1  text-center justify-center py-3 px-6 inline-flex items-center gap-x-2 rounded-md text-md font-medium focus:z-10 border bg-dark-blue shadow-sm text-white hover:bg-light-blue hover:text-dark-blue">
                    Komisyon Girişi
                </button>
                <button type="button" onClick={() => navigateToLogin("company")}  className="w-full my-1  text-center justify-center py-3 px-6 inline-flex items-center gap-x-2 rounded-md text-md font-medium focus:z-10 border bg-dark-blue shadow-sm text-white hover:bg-light-blue hover:text-dark-blue">
                    Firma Girişi
                </button>
            </div>
        </div>
    </div>
    )
}

export default LoginOptions