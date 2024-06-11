'use client'
import { createCategory } from '@/lib/apiRequests';
import React, { Dispatch, SetStateAction, useState } from 'react'
import MyPrimaryButton from './myPrimaryButton';
import MyInput from './inputs/myInput';


interface Props {
    category: {
        name: string
        price: number
    }
    setCategory: Dispatch<SetStateAction<{ name: string; price: number; }>>
    setResponse: any
}


const CreateCategory = ({ category, setCategory, setResponse }: Props) => {


    // Handler to update state when input fields change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCategory((prevCategory) => ({
            ...prevCategory,
            [name]: value,
        }));
    };

    // Handler for the create category button
    const handleCreateCategory = async () => {
        const response = await createCategory(category)
        setResponse(response)
        setCategory({ name: "", price: 0 })
    };

    return (
        <div className="p-4 m-2 border border-gray-700 rounded-lg w-1/3 mx-auto flex flex-col justify-center">
            <h3 className="font-bold text-lg text-center mb-4">Create a Category</h3>
            <div className='flex gap-x-6 items-center justify-between'>

                <div className="mb-4">                    
                    <MyInput
                        label='Category Name'
                        type={'text'}
                        id={"categoryName"}
                        name={"Name"}
                        placeholder={"Enter Category Name"}
                        value={category.name}
                        onChange={handleInputChange}
                        required={"required"}
                    />
                </div>
                <div className="mb-4">                    
                    <MyInput
                        label='Category Price'
                        type={'number'}
                        id={"categoryPrice"}
                        name={"Price"}
                        placeholder={"Enter Category Price"}
                        value={category.price}
                        onChange={handleInputChange}
                        required={"required"}
                    />
                </div>
            </div>
            <div className='flex justify-end'>
                <MyPrimaryButton text="Create Category" onClickFunction={handleCreateCategory} />
            </div>
        </div>
    )
}

export default CreateCategory