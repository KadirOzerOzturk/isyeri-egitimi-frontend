import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompaniesAsync } from '../store/companies';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Applications() {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [applications, setApplications] = useState([]);
    console.log(user)
    useEffect(() => {
        if (user.ogrenciNo) {
            axios.get(`/applications/student/${user.ogrenciNo}`)
                .then((res) => {
                    setApplications(res.data)
                })
        }

    }, [user]);
    console.log(applications)


    // const handleAddClick = (e, company) => {
    //     e.preventDefault();
    //     // Seçilen şirketin daha önce seçilip seçilmediğini kontrol et
    //     if (!selectedCompanies.some(selectedCompany => selectedCompany.id === company.firmaId)) {
    //         setSelectedCompanies([...selectedCompanies, company]);
    //     }
    //     localStorage.setItem("selectedCompanies",selectedCompanies)

    // };

    // const handleRemoveClick = (companyId) => {
    //     setSelectedCompanies(selectedCompanies.filter(company => company.firmaId !== companyId));
    // };


    return (
        <div>
            <div className="container   mx-auto  my-5 pl-24 pt-5 z-40">


                <div className=" border-slate-200 border-2 p-3 text-sm font-medium text-gray-900 bg-white w-full rounded-lg ">
                    <h1 className='py-2 text-center text-lg shadow-dark-blue rounded-lg shadow '> Başvuruda Bulunduğunuz İlanlar</h1>
                    <div className=" p-4 overflow-y-auto">
                        {applications.length === 0 ? (
                            <p>Başvurunuz bulunmamakta!</p>
                        ) : (
                            applications.map((application, index) => (
                                <div key={index} className='mb-4'>
                                <div className="w-full px-4 py-2 bg-white rounded-lg shadow-md cursor-pointer" >
                                    <div onClick={() => navigate(`/announcement-details/${application.ilan.ilanId}`)}>
                                        <div className="flex justify-between  items-center">
                                            <span className="mb-2 text-gray-600">
                                                Başvuru Tarihi: {moment(application.basvuruTarihi).format("MM/DD/YYYY")}
                                            </span>
                                            <div className='flex justify-between items-center gap-4'>
                                            <h1 className='  text-gray-600'>Başvuru Durumu : </h1>
                                            <h1 className='text-sm  text-gray-600'>{application.basvuruDurum}</h1>
                                            </div>
                                            
                                        </div>
                                        <div className='flex justify-between'>
                                            <h1 className='text-xl font-bold'>{application.ilan.baslik}</h1>
                                            
                                        </div>
                                        
                                        <div className="mt-2">
                                            <p className="mt-2 text-gray-600 pr-8" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                                {application.ilan.aciklama}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            ))
                        )}
                    </div>
                </div>


            </div>

        </div>



    );
}

export default Applications;
