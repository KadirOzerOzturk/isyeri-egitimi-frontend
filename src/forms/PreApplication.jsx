import axios from 'axios';
import React, { useState } from 'react';

function PreApplication() {
    const [formData, setFormData] = useState({
        ogrenciNo: '',
        adSoyad: '',
        tckNumarasi: '',
        eposta: '',
        telefon: '',
        genelNotOrtalamasi: '',
        tercihEdilenDonem: '',
        basarisizDersler: '',
        sirketBilgisi: '',
        protokolDurumu: '',
        zorunluStajGunSayisi: '',
        firmadaStajYapmaIstegi: '',
        ozelDurumlar: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/pre-application", formData)
        .then(response => {
            console.log("Form data submitted successfully:", response.data);
            setFormData({
                ogrenciNo: '',
                adSoyad: '',
                tckNumarasi: '',
                eposta: '',
                telefon: '',
                genelNotOrtalamasi: '',
                tercihEdilenDonem: '',
                basarisizDersler: '',
                sirketBilgisi: '',
                protokolDurumu: '',
                zorunluStajGunSayisi: '',
                firmadaStajYapmaIstegi: '',
                ozelDurumlar: ''
            });
        })
        .catch(error => {
            console.error("There was an error submitting the form data:", error);
        });
    };



    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
            <div className="max-w-xl mx-auto mt-10 ">
                <div className='my-6 cursor-default'>
                    <h1 className='text-2xl font-bold'>2024-2025 Eğitim Öğretim Dönemi İşyeri Eğitimi Ön Başvuru Anketi</h1>
                    <p className='text-md px-2 pt-2'>Değerli Öğrenciler,
                        Bu Formun 2024-2025 Eğitim Öğretim Yılında  GÜZ veya BAHAR döneminde İşyeri Eğitimine gidecek tüm öğrenciler tarafından doldurulması
                        zorunludur.
                    </p>
                    <p className='text-md px-2 '>Lütfen Formu 24 Temmuz 2024 tarihine kadar eksiksiz ve hatasız bir şekilde doldurunuz.</p>
                    <p className='text-md px-2 '>Detaylı Bilgilendirme için Lütfen <a href="https://tf-bm.gazi.edu.tr/" className='text-blue-600 hover:text-blue-400 hover:underline' target='_blank' rel='noopener noreferrer'>Bölüm web sayfasındaki</a> gelişmeleri takip ediniz.</p>
                </div>
                <form className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    {[
                        { label: "Öğrenci Numaranız", name: "ogrenciNo", type: "text" },
                        { label: "Adınız Soyadınız", name: "adSoyad", type: "text" },
                        { label: "TCK numaranız", name: "tckNumarasi", type: "text" },
                        { label: "E-posta adresiniz", name: "eposta", type: "eposta" },
                        { label: "Cep telefonu numaranız", name: "telefon", type: "text" },
                        { label: "Genel Not ortalamanız", name: "genelNotOrtalamasi", type: "text" }
                    ].map((input, index) => (
                        <div className="mb-4" key={index}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={input.name}>
                                {input.label}
                            </label>
                            <input
                                type={input.type}
                                name={input.name}
                                value={formData[input.name]}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                required
                            />
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">İşyeri Eğitimine gitmek için tercih ettiğiniz dönem</label>
                        <select
                            name="tercihEdilenDonem"
                            value={formData.tercihEdilenDonem}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="Güz Yarıyılı">Güz Yarıyılı</option>
                            <option value="Bahar Yarıyılı">Bahar Yarıyılı</option>
                            <option value="Her iki dönem benim için uygundur">Her iki dönem benim için uygundur</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="basarisizDersler">
                            Alt dönemlerden başarısız olduğunuz dersler (Dönem, Kodu, Kredisi)
                        </label>
                        <textarea
                            name="basarisizDersler"
                            value={formData.basarisizDersler}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sirketBilgisi">
                            Anlaştığınız şirketin adı ve açık adresi
                        </label>
                        <textarea
                            name="sirketBilgisi"
                            value={formData.sirketBilgisi}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Protokol durumu</label>
                        <select
                            name="protokolDurumu"
                            value={formData.protokolDurumu}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="Protokol Var">Protokol Var</option>
                            <option value="Protokol Yok">Protokol Yok</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zorunluStajGunSayisi">
                            Zorunlu Yaz Stajı gün sayısı
                        </label>
                        <input
                            type="text"
                            name="zorunluStajGunSayisi"
                            value={formData.zorunluStajGunSayisi}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Yaz stajımı İşyeri Eğitimi yapacağım firmada yapmak istiyorum</label>
                        <select
                            name="firmadaStajYapmaIstegi"
                            value={formData.firmadaStajYapmaIstegi}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Seçiniz</option>
                            <option value="Evet">Evet</option>
                            <option value="Hayır">Hayır</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ozelDurumlar">
                            Özel durumunuz (Çalışmak istediğiniz konular vs.)
                        </label>
                        <textarea
                            name="ozelDurumlar"
                            value={formData.ozelDurumlar}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Gönder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PreApplication;
