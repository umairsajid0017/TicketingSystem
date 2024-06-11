// src/shared/MyCheckbox.tsx
import React from 'react';

interface MyCheckboxProps {
    label: string;
    id: string;
    name: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyCheckbox: React.FC<MyCheckboxProps> = ({ label, id, name, checked, onChange }) => {
    return (
        <div className="mb-4 flex items-center">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mr-2">{label}</label>
            <input
                type="checkbox"
                id={id}
                name={name}
                checked={checked}
                onChange={onChange}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
        </div>
    );
};

export default MyCheckbox;
