import {useState, useEffect} from 'react'

export const SelectSearchable = ({ 
  placeholder = '-',
  options,
  selected,
  onChange,
  className,
  required,
  icon,
  ...props
}) => {
  options = options.map(e => (typeof e !== 'object') ? ({label: e, value: e}) : e);

  useEffect(() => {
    options = options.map(e => (typeof e !== 'object') ? ({label: e, value: e}) : e);
    const selectedLable = options.filter(e => e.value == selected);
    setLabel(selectedLable.length > 0 ? selectedLable[0].label : placeholder)
  }, [selected])

  const [label, setLabel] = useState(placeholder)
  const [listOption, setListOptions] = useState(options)
  const [keyword, setKeyword] = useState('')
  const [showList, setShowList] = useState(false)

  const handleInputChange = (e) => {
    const value = e.target.value
    setKeyword(value);
    if (value !== '') {
      setListOptions(options.filter(option => option.label.toLowerCase().includes(value.toLowerCase())))
    } else {
      setListOptions(options)
    }
  }

  const handleListClick = (value, label) => {
    setLabel(label);
    if (onChange) onChange({ value })
    console.log(showList);
  }

  const handleClick = () => {
    setShowList(!showList)
  }

  const handleBlur = () => {
    setTimeout(() => setShowList(false) ,250)
  }

  return (
    <div className="w-full relative">
      <button type="button" onClick={handleClick}
      className={`bg-white flex items-center justify-between gap-1 border-1 rounded text-left text-xl w-full p-1.5 `+className}>
        {icon}
        {label}
        <svg className="mr-1" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg>
      </button>
      <input type="text" required={selected ? false : required} className="opacity-0 z-[-1] absolute bottom-0"/>
      {showList && (
      <div className="absolute z-10 bg-white rounded shadow-lg border border-gray-300" onBlur={handleBlur} tabIndex={0}>
        <input
          autoFocus
          type="search"
          value={keyword}
          onChange={handleInputChange}
          className="p-0.5 border rounded m-2"
          placeholder="Filter"
        />

        <div className="select-none max-h-[400px] overflow-y-auto">
          {listOption && listOption.length > 0 ? (
            <ul>
              {listOption.map((e,i) => (
                <li key={i} className="px-2 hover:bg-gray-100" onClick={() => handleListClick(e.value ? e.value : e, e.label ? e.label : e)}>
                  <span>{e.label ? e.label : e}</span>
                </li>
              ))}
            </ul>
          ) : (
            <h1>No results found!</h1>
          )}
        </div>
      </div>
        )}
    </div>
  )
}
