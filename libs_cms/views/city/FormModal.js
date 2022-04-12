import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'
import { ImageUpload } from '../../../libs/components/imageUpload'

import { createCity, getCityDetail, updateCity } from '../../models/cityModel'

const FormModal = ({ setShowModal, type, id, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);

  const [image, setImage] = useState({});

  const [data, setData] = useState({
    name: '',
    terminal_name: '',
    image: null
  });

  const handleFileChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nama', data.name);
    formData.append('terminal_name', data.terminal_name);
    if (image.file) formData.append('image', image.file);

    if (type == 'create') {
      const response = await createCity(formData);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat city');
      }
    } else {
      formData.append('_method', 'PUT');
      const response = await updateCity(id, formData);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate city');
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
        setImage({ preview: dataPre.image })
      }
    })()
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">{(type === 'create') ? 'Buat kota baru' : 'Update kota'}</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          <InputWithLabel label="Nama" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2"/>
          <InputWithLabel label="Nama Terminal" name="terminal_name" value={data.terminal_name} onChange={e => setData({...data, terminal_name: e.target.value})} className="border-2"/>
          <ImageUpload label="Gambar" onChange={handleFileChange} preview={image.preview} className="!border-2" />

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal