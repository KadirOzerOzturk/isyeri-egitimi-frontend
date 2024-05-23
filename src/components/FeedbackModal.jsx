import React, { useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import emailjs from 'emailjs-com';
import { Toaster, toast } from 'sonner';
import { useSelector } from 'react-redux';

const FeedbackModal = ({ onClose }) => {
    const {user} =useSelector(state=>state.auth)
    const {userRole} = useSelector(state=>state.auth)
    const [feedback, setFeedback] = useState({
        subject: '',
        name: userRole === "STUDENT" ? user?.ogrenciAd 
             : userRole === "LECTURER" ? user?.izleyiciAd 
             : userRole === "COMPANY" ? user?.firmaAd 
             : userRole === "COMMISSION" ? user?.komisyonAd 
             : "",
        surname: userRole === "STUDENT" ? user?.ogrenciSoyad
        : userRole === "LECTURER" ? user?.izleyiciSoyad  
        : userRole === "COMMISSION" ? user?.komisyonSoyad
        : "",
        email: userRole === "STUDENT" ? user?.ogrenciEposta 
        : userRole === "LECTURER" ? user?.izleyiciEposta
        : userRole === "COMPANY" ? user?.firmaEposta
        : userRole === "COMMISSION" ? user?.komisyonEposta 
        : "",
        content: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            subject: feedback.subject,
            name: feedback.name,
            surname: feedback.surname,
            email: feedback.email,
            content: feedback.content,
        };

        emailjs.send("service_5idapbh", 'template_8wb715r', templateParams, 'LvSsbsQVFXEjC3V7h')
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                toast.info('Feedback sent successfully!');
                
                setTimeout(() => {
                    onClose()
                }, 100);
            }, (error) => {
                console.log('FAILED...', error);
                toast.error('Failed to send feedback. Please try again.');
            });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full max-w-lg mx-auto p-6">
                <div className="flex items-center justify-between border-b pb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Geri bildiriminizi buradan gönderebilirsiniz.
                    </h3>
                    <button
                        onClick={onClose}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <MdOutlineClose className='text-2xl'/> 
                    </button>
                </div>
                <p className="text-gray-500 py-3">Geri bildirimleriniz bizim için önemlidir.</p>
                <div className="py-4">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="max-w-sm">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Geribildirim konusu
                            </label>
                            <select
                                value={feedback.subject}
                                name="subject"
                                onChange={handleInputChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option value="">Konu seçiniz</option>
                                <option value="suggestions-and-complaints">Öneri ve Şikayetler</option>
                                <option value="bug-report">Hata Raporu</option>
                                <option value="other">Diğer</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    İsim
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={feedback.name}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="İsminizi giriniz."
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="surname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Soyisim
                                </label>
                                <input
                                    onChange={handleInputChange}
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    value={feedback.surname}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Soyisminizi giriniz."
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                E-posta Adresiniz
                            </label>
                            <input
                                onChange={handleInputChange}
                                type="email"
                                name="email"
                                id="email"
                                value={feedback.email}
                                placeholder="E-posta Adresinizi Giriniz"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Açıklama
                            </label>
                            <textarea
                                onChange={handleInputChange}
                                name="content"
                                id="content"
                                value={feedback.content}
                                placeholder="Sorununuzu buraya yazabilirsiniz."
                                rows={4}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Gönder
                        </button>
                    </form>
                </div>
            </div>
            <Toaster richColors position="top-center" />

        </div>
    );
};

export default FeedbackModal;
