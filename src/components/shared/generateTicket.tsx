import React, { useState } from 'react';
import MyInput from './inputs/myInput';
import { createTicket } from '@/lib/apiRequests';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';
import Image from 'next/image';

interface Props {
    categories: Category[];
    selectedCategory: Category | null;
    setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
    quantity: number | undefined;
    setQuantity: React.Dispatch<React.SetStateAction<number | undefined>>;
    amount: number | undefined;
    setAmount: React.Dispatch<React.SetStateAction<number | undefined>>;
    response: any;
    setResponse: React.Dispatch<React.SetStateAction<any>>;
}

const GenerateTicket = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    quantity,
    setQuantity,
    amount,
    setAmount,
    setResponse,
}: Props) => {

    const router = useRouter()
    // const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const categoryId = parseInt(e.target.value);
    //     const selected = categories.find((cat) => cat.id === categoryId) || null;
    //     setSelectedCategory(selected);
    // };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value ? parseInt(e.target.value) : undefined);
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value ? parseFloat(e.target.value) : undefined);
    };

    const handleGenerateTicket = async () => {
        const body = {
            category_Id: selectedCategory?.id,
            quantity,
            amount: amount
        };

        const res = await createTicket(body);
        setResponse(res);
        setQuantity(undefined);
        setAmount(undefined);
        setSelectedCategory(null);

        const url = `/printReceipt?amount=${amount}&quantity=${quantity}`;

        // Open the URL in a new tab
        const printWindow = window.open(url, '_blank');

    // Function to close the print tab
    const closePrintTab = () => {
        printWindow?.close();
        window.removeEventListener('afterprint', closePrintTab);
    };

    // Listen for afterprint event to close the print tab after printing or cancelling
    window.addEventListener('afterprint', closePrintTab);

    // Print the page programmatically
    printWindow?.print();

    // Navigate programmatically without reloading the current page
    router.push('/');
    };


    const handleCategoryCheck = (cat: Category) => {
        selectedCategory?.id == cat.id ? setSelectedCategory(null) : setSelectedCategory(cat)
    }

    return (
        <div className="p-4 border border-gray-700 rounded-lg mt-4 flex flex-col justify-center">
            <h3 className="font-bold text-lg text-center mb-4">Generate a Ticket</h3>



            <div className='flex gap-3 flex-wrap my-4'>
                {categories.map((cat) => (
                    <>
                        <button key={cat.id} onClick={() => { handleCategoryCheck(cat) }} className={` h-24 w-20 flex flex-col justify-center items-center gap-x-2 border  border-primary rounded-lg  ${selectedCategory?.id == cat.id ? "bg-primary text-white font-bold" : ""}`}>

                            {/* {selectedCategory?.id == cat.id && <div><FaCheck /></div>} */}                                                 
                                <Image src={`/category_images/images.jpeg`} alt='Category Image' height={20} width={20} />                               
                                <p>{cat.name}</p>
                                <p className='text-xs'>Rs {cat.price}</p>
                               
                        </button>
                    </>
                ))}
            </div>

            {/* <div className="mb-4">
                <label htmlFor="categorySelect" className="block text-sm font-medium text-gray-700">
                    Select Category
                </label>
                <select
                    id="categorySelect"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={selectedCategory?.id || ""}
                    onChange={handleSelectChange}
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div> */}
            <div className="mb-4">
                <MyInput
                    label="Quantity"
                    type="number"
                    id="ticketQuantity"
                    name="quantity"
                    placeholder="Enter Quantity"
                    value={quantity ?? ""}
                    onChange={handleQuantityChange}
                    required="required"
                />
            </div>
            <div className="mb-4">
                <MyInput
                    label="Amount"
                    type="number"
                    id="ticketAmount"
                    name="amount"
                    placeholder="Enter Amount"
                    value={amount ?? ""}
                    onChange={handleAmountChange}
                    required="required"
                />
            </div>
            <button
                type="button"
                className="mt-2 px-4 py-2 mx-auto bg-green-500 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                onClick={handleGenerateTicket}
            >
                Print Ticket
            </button>
        </div>
    );
};

export default GenerateTicket;
