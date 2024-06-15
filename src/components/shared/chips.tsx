import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';


interface Props {
    imageSrc : string 
    label : string 
}
const Chips = ({ imageSrc, label }:Props) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <button
            className={`rounded-full px-4 py-2 border border-primary flex items-center gap-x-2 ${
                isChecked ? 'bg-primary text-white font-bold' : ''
            }`}
            onClick={handleClick}
        >
            {isChecked && <FaCheck />}
            <img src={imageSrc} alt={label} className="w-8 h-8 rounded-full" />
            <p>{label}</p>
        </button>
    );
};

export default Chips;
