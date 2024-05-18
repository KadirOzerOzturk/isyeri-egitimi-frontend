import React from 'react'
import { FaWpforms } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function ListForms() {

    const navigate=useNavigate()
    return (
        <div  className='container mx-auto my-5 pl-24 pt-5 z-40 grid-cols-4 grid font-roboto'>

            <div
                className="block rounded-lg  mx-auto bg-light-blue  ">
                <div  className='flex justify-center items-center pt-10'>


                    <FaWpforms  className='text-5xl' />

                </div>
                <div className="p-6">
                    <h5
                        className="mb-2 text-xl font-medium leading-tight text-neutral-800 ">
                        Kabul Formu
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 ">
                        Form Aciklamasi
                    </p>

                    <div  className='flex justify-between gap-2'>
                        <button
                            type="button"
                             className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-dark-blue text-white "
                        >
                            Indir
                        </button>

                        <button
                            type="button"
                            onClick={()=>navigate('/kabul-formu')}
                             className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-green-500 text-white"
                        >
                            Duzenle
                        </button>
                        <button
                            type="button"
                             className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-red-500 text-white "
                        >
                            Sil
                        </button>
                    </div>

                </div>
            </div>

           


        
        </div>
    )
}

export default ListForms