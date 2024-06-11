const MyInput = ({ label = '', type, id, name, pattern = undefined || '',   value, onChange, placeholder, disable = false , required}) => {
    return (
      <>
        {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
        <input
         {...(pattern && { pattern })}
          type={type}
          id={id}
          name={name}
          required 
          disabled={disable ? true : false}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        />
      </>
    );
  }
  
  export default MyInput;