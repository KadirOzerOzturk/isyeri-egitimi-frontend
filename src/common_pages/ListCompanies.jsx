import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import companies, { setCompanies } from '../store/companies';
import { IoIosMail } from "react-icons/io";
import { getCompaniesAsync } from '../store/companies';
import { useNavigate } from 'react-router-dom';


function ListCompanies() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { companies } = useSelector(state => state.companies)
  const {user,userRole} = useSelector(state => state.auth);

  
  useEffect(() => {
    dispatch(getCompaniesAsync());
  }, []);

  function handleNavigate(firmaId) {
    if (user.firmaId === firmaId) {
      navigate("/company-profile");
    } else {
      navigate(`/company-profile/${firmaId}`)
    }
  }

  console.log(companies + ' 111111')
  return (

    <div className='container mx-auto my-5 pl-24 pt-5 z-40  '>
      {userRole === "COMMISSION" && <div className='flex justify-end   '>
        <button onClick={()=>navigate("/save-company")} className='py-2 px-5 text-slate-50 bg-green-400 rounded-md mr-6 hover:bg-green-600 hover:shadow-lg'>Firma ekle</button>
      </div>}
      <div className='grid-cols-1 md:grid-cols-2 grid'>
        {companies.map((company) => (
          <ul key={company.firmaId} className='p-2  '>


            <li className="col-span-1 divide-y  border-2 divide-gray-200 rounded-lg bg-white shadow">
              <div onClick={() => handleNavigate(company.firmaId)} className="cursor-pointer flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">{company.firmaAd}</h3>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">{company.firmaHakkinda}</p>
                </div>
                <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={company.firmaLogo} alt="" />
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1 ">
                    <a href={"mailto:" + company.firmaEposta} className="relative text-gray-500 hover:text-blue-800 -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold ">
                      <IoIosMail className='text-2xl ' />
                      {company.firmaEposta}
                    </a>
                  </div>

                </div>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  )
}

export default ListCompanies