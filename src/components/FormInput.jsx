import React, { useState } from 'react'

function FormInput({ Label, inputText,isDisable }) {
    // const [form,setForm]=useState()
    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm({ ...form, [name]: value })   
    // };
    return (
        <form  className="w-full max-w-xl text-md ">
            <div  className="md:flex md:items-center mb-6">
                <div  className="md:w-3/4">
                    <label  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" for="inline-full-name">
                        {Label}
                    </label>
                </div>
                <div  className="md:w-8/12">
                    <input  className=" appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-dark-blue" id="inline-full-name" type="text" defaultValue={inputText} value={inputText} disabled={isDisable} />
                </div>
            </div>
        </form>
    )
}

export default FormInput