// components/shared/MyDateInput.tsx
import React from 'react';

interface MyDateInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyDateInput: React.FC<MyDateInputProps> = ({ label, value, onChange }) => {
  return (
    <div className="mb-4 w-[18rem]" >
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="date"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default MyDateInput;
