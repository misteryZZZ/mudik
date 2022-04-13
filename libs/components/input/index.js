import React from 'react'

export const Search = ({ className, medium, placeholder = 'Cari', ...inputProps }) => (
  <label
  className={`block relative ` + className}>
    <svg className={`absolute ${medium ? 'top-2.5 left-3' : 'top-1.5 left-1.5'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
    <input type="text" placeholder={placeholder}
    className={`border-2 rounded-md placeholder:text-gray-300 ${medium ? 'text-md py-1 pl-8' : 'text-sm pl-6 w-[100px]'}`}
    {...inputProps}
    />
  </label>
)

export const InputWithLabel = ({ label, type = 'text', labelClassName, className, ...inputProps }) => (
  <label className={`block mt-4 `+labelClassName}>
    <p className="text-sm mb-1">{label}</p>
    <input type={type} className={`bg-white border-1 rounded text-xl text-black w-full p-1.5 `+className} {...inputProps} />
  </label>
)