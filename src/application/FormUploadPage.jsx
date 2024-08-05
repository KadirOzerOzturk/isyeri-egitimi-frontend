import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../components/Loading';

const FileUploadPage = () => {
  const [form1, setForm1] = useState(null);
  const [form8, setForm8] = useState(null);
  const [form2, setForm2] = useState(null);
  const [idCopy, setIdCopy] = useState(null);
  const [eligibility, setEligibility] = useState(null);
  const [reportForm, setReportForm] = useState(null);
  const [studentNo, setStudentNo] = useState("");
  const [fullname, setFullname] = useState("");
  const [pendingApiCall, setPendingApiCall] = useState(false);
  const [eroorMessage,setErrorMessage]=useState("");

  const handleFileChange = (setter) => (event) => {
    setter(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPendingApiCall(true);
    const formData = new FormData();
    formData.append('form1', form1);
    formData.append('form8', form8);
    formData.append('form2', form2);
    formData.append('idCopy', idCopy);
    formData.append('eligibility', eligibility);
    formData.append('reportForm', reportForm);
    
    axios.post(`s3-bucket/upload/forms/${studentNo}/${fullname}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log("Files uploaded successfully");
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || error.message)
        console.log(error.response?.data?.message || error.message);
      })
      .finally(() => {
        setPendingApiCall(false);
      });
  };


 

  const handleStudentNumberChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue);
    if (!isNaN(numericValue) || inputValue === '') {
      setStudentNo(inputValue);
    }
  };


  return (
    <>
      {pendingApiCall && <Loading />}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">İşyeri Eğitimi İçin İstenilen Belgeler</h2>
          <label className="block mb-2">
            <span>Öğrenci Numarası  </span> <span className='text-red-600 text-xl'>*</span>
            <input
              type='text'
              onChange={handleStudentNumberChange}
              name='studentNo'
              id='studentNo'
              
              autoComplete="off"
              required
              className='mt-3 py-1 px-3 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-text bg-gray-50 ' />
          </label>
          <label className="block mb-2">
            <span>İsim - Soyisim </span>  <span className='text-red-600 text-xl'>*</span>
            <input type='text' onChange={(e) => setFullname(e.target.value)} name='fullname' className='mt-3 py-1 px-3 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-text bg-gray-50 capitalize' autocomplete="off" />
          </label>
          <hr className='mt-3' />
          <div className="mb-3 w-3/4">
            <span>
              <label
                htmlFor="form1"
                className="mb-3 mt-4 text-nowrap  inline-block font-semibold dark:text-neutral-200"
              >
                İşyeri Uygulaması Kabul Formu (FORM 1) <span className='text-red-600 text-xl'>*</span> 
              </label>
              <input
                type="file" onChange={handleFileChange(setForm1)}
                className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                name='form1'
                id="form1"
              />
            </span>
            <span>
              <label
                htmlFor="form1"
                className="mb-3 mt-4 text-nowrap  inline-block font-semibold dark:text-neutral-200"
              >
                Taahhütname (FORM 2) <span className='text-red-600 text-xl'>*</span> 
              </label>
              <input
                type="file" onChange={handleFileChange(setForm2)}
                className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                name='form2'
                id="form2"
              />
            </span>
            <span>
              <label
                htmlFor="form8"
                className="mb-3 mt-4 text-nowrap  inline-block font-semibold dark:text-neutral-200"
              >
                Sözleşme (FORM 8) <span className='text-red-600 text-xl'>*</span> 
              </label>
              <input
                type="file" onChange={handleFileChange(setForm8)}
                className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                name='form8'
                id="form8"
              />
            </span>
            <span>
              <label
                htmlFor="idCopy"
                className="mb-3 mt-4 text-nowrap  inline-block font-semibold dark:text-neutral-200"
              >
                Nüfus Cüzdanı Fotokopisi <span className='text-red-600 text-xl'>*</span> 
              </label>
              <input
                type="file" onChange={handleFileChange(setIdCopy)}
                className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                name='form1'
                id="form1"
              />
            </span>
            <span>
              <label
                htmlFor="eligibility"
                className="mb-3 mt-4 text-nowrap  inline-block font-semibold dark:text-neutral-200"
              >
                Müstehaklık Belgesi (e-devletten veya SGK bürolarından alınabilir) <span className='text-red-600 text-xl'>*</span>  
              </label>
              <input
                type="file" onChange={handleFileChange(setEligibility)}
                className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                name='eligibility'
                id="eligibility"
              />
            </span>
            <span>
              <label
                htmlFor="reportForm"
                className="mb-3 mt-4 text-nowrap  inline-block font-semibold dark:text-neutral-200"
              >
                İstirahat Raporu Beyanı Formu (FORM 9) <span className='text-red-600 text-xl'>*</span>
              </label>
              
              <input
                type="file" onChange={handleFileChange(setReportForm)}
                className="cursor-pointer relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                name='reportForm'
                id="reportForm"
              />
            </span>

          </div>

          {eroorMessage && (
            <h1 className='text-red-500'>Tüm alanları doldurduğunuzdan emin olunuz !! </h1>
          )}
          <button type="submit"   className={`mt-4 w-full  bg-blue-500 text-white py-2 rounded`}>
            Upload Files
          </button>

        </form>

      </div>
    </>
  );
};

export default FileUploadPage;
