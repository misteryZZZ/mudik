import React from 'react'

export const TextareaWithLabel = ({ label, type = 'text', labelClassName, className, ...inputProps }) => (
  <label className={`block mt-4 `+labelClassName}>
    <p className="text-sm mb-1">{label}</p>
    <textarea className={`bg-white border-1 rounded text-xl text-black w-full p-1.5 `+className} {...inputProps}></textarea>
  </label>
)