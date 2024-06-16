'use client'
import React from 'react'
interface Props {
    receiptSetting: {
        title: string
        bottomText: string
        showDate: number | boolean
        showAmount: number | boolean
        currentTicketNumber? : number
    }
    amount?: number
}

const Receipt = ({ receiptSetting, amount }: Props) => {

    return (
        <div className="receipt-container bg-white">
             <div className='h-full w-full flex flex-col justify-between items-center py-4 text-center  rounded-lg border-2 receipt'>
            <h3 className='font-bold text-lg  '>{receiptSetting?.title}</h3>
            {receiptSetting?.showDate == 1 && <p><span className='font-semibold self-center'>Date :</span> 00-00-24 </p>}
            <p className='font-bold text-6xl'>{receiptSetting?.currentTicketNumber? receiptSetting?.currentTicketNumber : "45"} </p>
            {receiptSetting?.showAmount == 1 && <p><span className='font-semibold self-center'>Amount :</span> Rs {amount ? amount : "00"} </p>}
            <p className='text-sm text-gray-700 '>{receiptSetting?.bottomText}</p>
            </div>
        </div>
       
    )
}

export default Receipt