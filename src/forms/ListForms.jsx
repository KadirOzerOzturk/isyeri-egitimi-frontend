import axios from 'axios';
import React from 'react';
import { FaWpforms } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function ListForms() {

    const handleDownload = () => {
        axios.get('/pre-application/download-excel', { responseType: 'blob' })
        .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/octet-stream' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'applications.xlsx'); // Dosya adını .xlsx olarak ayarlayın
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
            console.error("Excel dosyasını indirirken bir hata oluştu:", error);
        });
    };
    

    const navigate = useNavigate();

    return (
        <div className='container mx-auto my-5 px-4 md:px-24 pt-5'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='rounded-lg bg-light-blue'>
                <div className='p-6'>
                    <div className='flex justify-center items-center pt-10'>
                        <FaWpforms className='text-5xl' />
                    </div>
                    <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800'>
                        Kabul Formu
                    </h5>
                    <p className='mb-4 text-base text-neutral-600'>
                        Form Açıklaması
                    </p>
                    <div className='flex justify-between gap-2'>
                        <button
                            type='button'
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-dark-blue text-white'
                            onClick={() => navigate('/kabul-formu')}
                        >
                            İndir
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/kabul-formu')}
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-green-500 text-white'
                        >
                            Düzenle
                        </button>
                        <button
                            type='button'
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-red-500 text-white'
                        >
                            Sil
                        </button>
                    </div>
                </div>
            </div>
            <div className='rounded-lg bg-light-blue'>
                <div className='p-6'>
                    <h5 className='mb-2 text-xl font-medium leading-tight text-neutral-800'>
                        Ön başvuru formu
                    </h5>
                    <p className='mb-4 text-base text-neutral-600'>
                        Form Açıklaması
                    </p>
                    <div className='flex justify-between gap-2'>
                        <button
                            type='button'
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-dark-blue text-white'
                            onClick={handleDownload}
                        >
                            İndir
                        </button>
                        <button
                            type='button'
                            onClick={() => navigate('/kabul-formu')}
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-green-500 text-white'
                        >
                            Düzenle
                        </button>
                        <button
                            type='button'
                            className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal bg-red-500 text-white'
                        >
                            Sil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    );
}

export default ListForms;
