'use client'
import React, { useState } from 'react';
import MyInput from '../shared/inputs/myInput';
import MyPrimaryButton from '../shared/myPrimaryButton';
import MyCheckbox from '../shared/inputs/myCheckbox';
import { updateSettings } from '@/lib/apiRequests';


interface Props {
    receiptSetting : {
        title : string 
        bottomText : string
        showDate : boolean 
        showAmount : boolean 
    }
    setReceiptSetting : any
}



const ReceiptSetting = ({receiptSetting , setReceiptSetting}:Props) => {
    

    const handleReceiptSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setReceiptSetting((prev:any) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleClickFunction = async() => {
        // Handle the button click logic here
       
       const res = await updateSettings(receiptSetting)
       
    };

    return (
        <div className="p-4 border border-gray-700 rounded-lg w-full flex flex-col justify-center">
            <h3 className="font-bold text-lg text-center mb-4">Receipt Setting</h3>
            <div className='flex gap-x-6 items-center justify-between'>
                <div className="mb-4">
                    <MyInput
                        label='Receipt Title'
                        type='text'
                        id="receiptTitle"
                        name="title"
                        placeholder="Enter Title for Receipt"
                        value={receiptSetting.title}
                        onChange={handleReceiptSettingChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <MyInput
                        label='Bottom Text'
                        type='text'
                        id="bottomText"
                        name="bottomText"
                        placeholder="Enter the Bottom Text"
                        value={receiptSetting.bottomText}
                        onChange={handleReceiptSettingChange}
                        required
                    />
                </div>
            </div>
            <MyCheckbox
                label="Show Date"
                id="showDate"
                name="showDate"
                checked={receiptSetting.showDate}
                onChange={handleReceiptSettingChange}
            />
            <MyCheckbox
                label="Show Amount"
                id="showAmount"
                name="showAmount"
                checked={receiptSetting.showAmount}
                onChange={handleReceiptSettingChange}
            />
            <div className='flex justify-end'>
                <MyPrimaryButton text="Save Settings" onClickFunction={handleClickFunction} />
            </div>
        </div>
    );
};

export default ReceiptSetting;
