import { useState } from 'react'

import SortableList from '../../../libs/components/sortableList'

export const InputRoute = ({ setValues, values, label, className }) => {
  const [input, setInput] = useState('')

  const addValues = () => {
    if (input) {
      setValues([ ...values, input]);
      setInput('');
    }
  }

  const handleKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      addValues();      
    }
  }

  const handleChange = (newValues) => {
    setValues(newValues)
  }

  return (
    <label className="block mt-4">
      <p>{label}</p>
      <div className="flex">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress}  className={"bg-white border-1 rounded text-xl text-black w-full p-1.5 "+className}/>
        <button type="button" className="bg-gray-200 ml-2 px-2 rounded-md" onClick={addValues}>Tambah</button>
      </div>
      <SortableList items={values} handleChange={handleChange} />
    </label>
    )
}