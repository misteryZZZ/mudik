export const SelectWithLabel = ({ label, labelClassName, options, className, placeholder = '-', selected, ...inputProps }) => (
  <label className={`block mt-4 `+labelClassName}>
    <p className="text-sm mb-1">{label}</p>
    <select className={`bg-white border-1 rounded text-xl w-full p-1.5 `+className} value={selected} {...inputProps}>
      <option value="" className="hidden opacity-50">{placeholder}</option>
      {options.map((e,i) => (
        <option key={i}
        value={(e.value) ? e.value : e}
        /*selected={e.value ? e.value == selected : e == selected}*/
        >
          {(e.label) ? e.label : e}
        </option>
      )) }
    </select>
  </label>
)