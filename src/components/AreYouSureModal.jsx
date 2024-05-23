import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaCircleCheck } from 'react-icons/fa6';

function AreYouSureModal(props) {
    const handleConfirm = () => {
        // Call the confirm callback function passed from the parent
        props.onConfirm();
    };

    const handleCancel = () => {
        // Call the cancel callback function passed from the parent
        props.onCancel();
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur confirm-dialog ">
            <div className="relative px-4 min-h-screen md:flex md:items-center md:justify-center">
                <div className=" opacity-25 w-full h-full absolute z-10 inset-0"></div>
                <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative shadow-lg">
                    <div className="md:flex items-center">
                        <div className="rounded-full   flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                            {props.purpose === "confirm" && <FaCircleCheck className='w-full h-full text-green-500' />}
                            {props.purpose === "cancel" && <AiOutlineCloseCircle className='w-full h-full text-red-500' />}

                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                            <p className="font-bold text-xl">{props.title}</p>
                            <p className={`text-md text-gray-700 mt-1 ${props.text.length <= 45 ? 'text-nowrap' : ''}`}>
                                {props.text}
                            </p>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                        <button id="confirm-delete-btn"
                            className={`block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 rounded-lg font-semibold text-sm md:ml-2 md:order-2 
                    ${props.purpose === "confirm" ? "bg-green-200 text-green-600" : "bg-red-200 text-red-700"}`}
                            onClick={handleConfirm}>
                            Onayla
                        </button>
                        <button id="confirm-cancel-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1" onClick={handleCancel}>
                            Vazgeç
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AreYouSureModal