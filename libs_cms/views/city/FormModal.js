import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'

import { createCity, getCityDetail, updateCity } from '../../models/cityModel'

const FormModal = ({ setShowModal, type, id }) => {

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: '',
    terminal_name: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type == 'create') {
      const response = await createCity(data);
      if (response && response.success) {
        alert('Berhasil membuat truck');
      } else {
        alert('Gagal membuat truck');
      }
    } else {
      const response = await updateCity(id, data);
      console.log(response);
      if (response && response.success) {
        alert('Berhasil menupdate truck');
      } else {
        alert('Gagal menupdate truck');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getCityDetail(id)
        console.log(dataPre);
        setData({
          name: dataPre.name,
          terminal_name: dataPre.terminal_name,
        })
      }
    })()
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">{(type === 'create') ? 'Buat bus baru' : 'Update bus'}</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          <InputWithLabel label="Nama" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2"/>
          <InputWithLabel label="Nama Terminal" name="terminal_name" value={data.terminal_name} onChange={e => setData({...data, terminal_name: e.target.value})} className="border-2"/>

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal