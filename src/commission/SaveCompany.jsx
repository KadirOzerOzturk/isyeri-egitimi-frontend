import React, { useState } from 'react';
import Loading from '../components/Loading';
import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SaveCompany() {
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [savingCompany, setSavingCompany] = useState({
        firmaAd: "",
        firmaEposta: "",
        firmaSektor: "",
        firmaParola: "",
        firmaNo: ""
    });

    function randomPassword(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    function randomNumber(length) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSavingCompany(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const companyData = {
            ...savingCompany,
            firmaParola: randomPassword(8),
            firmaNo: randomNumber(11)
        };

        const templateParams = {
            subject: "İşyeri Eğitimi Sistemi Parola Hk.",
            firmaAd: companyData.firmaAd,
            fromEmail: user.komisyonEposta,
            toEmail: companyData.firmaEposta,
            content: "İş yeri eğitimi sistemine kaydınız başarı ile oluşturulmuştur.",
            companyPassword: companyData.firmaParola,
            companyNumber: companyData.firmaNo
        };

        setPendingApiCall(true);
        try {
            const res = await axios.post(`/company/saveCompany`, companyData);
            if (res.status === 200) {
                try {
                    const emailResponse = await emailjs.send(
                        "service_5idapbh",
                        'template_r2snhvr',
                        templateParams,
                        'LvSsbsQVFXEjC3V7h'
                    );
                    console.log('SUCCESS!', emailResponse.status, emailResponse.text);
                    navigate("/companies");
                } catch (emailError) {
                    console.log('FAILED...', emailError);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setPendingApiCall(false);
        }
    };

    return (
        <>
            {pendingApiCall && <Loading text="Paylaşılıyor ..." />}

            <div className="container mx-auto my-5 pl-32 pt-5 z-40">
                <div className="border-b border-gray-900/10 pb-12 pr-24 pl-24 pt-16">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Firma Kaydet</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Girdiğiniz bilgiler firmaya ait bilgilerdir. Lütfen dikkatli olunuz.
                    </p>

                    <form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onSubmit={handleSubmit}>
                        <div className="sm:col-span-3">
                            <label htmlFor="firmaAd" className="block text-sm font-medium leading-6 text-gray-900">Firma Adı</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="firmaAd"
                                        id="firmaAd"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Firma adı"
                                        onChange={handleInputChange}
                                        value={savingCompany.firmaAd}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="firmaEposta" className="block text-sm font-medium leading-6 text-gray-900">Firma E-posta</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="email"
                                        name="firmaEposta"
                                        id="firmaEposta"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Firma e-posta"
                                        onChange={handleInputChange}
                                        value={savingCompany.firmaEposta}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="firmaSektor" className="block text-sm font-medium leading-6 text-gray-900">Firma Sektör</label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="firmaSektor"
                                        id="firmaSektor"
                                        autoComplete="off"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        placeholder="Firma sektörü"
                                        onChange={handleInputChange}
                                        value={savingCompany.firmaSektor}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="sm:col-span-4 text-slate-500">Firmanın giriş bilgileri e-posta adresine iletilecektir.</p>
                        <div className="flex justify-end col-span-5">
                            <button
                                type="submit"
                                className="rounded-md duration-300 mt-3 px-8 py-1.5 text-lg font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-light-blue hover:text-black bg-dark-blue"
                            >
                                Kaydet
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SaveCompany;
