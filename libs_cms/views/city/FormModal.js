import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'
import { ImageUpload } from '../../../libs/components/imageUpload'
import { Modal } from '../../../libs/components/modal'

import { createCity, getCityDetail, updateCity } from '../../models/cityModel'

const FormModal = ({ setShowModal, type, id, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);

  const [image, setImage] = useState({});

  const [data, setData] = useState({
    name: '',
    terminal_name: '',
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
    formData.append('name', data.name);
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
    <Modal title={(type === 'create') ? 'Buat kota baru' : 'Update kota'} onClose={() => setShowModal(false)}>
      <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
        <InputWithLabel required label="Nama" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2"/>
        <InputWithLabel required label="Nama Terminal" name="terminal_name" value={data.terminal_name} onChange={e => setData({...data, terminal_name: e.target.value})} className="border-2"/>
        <ImageUpload required label="Gambar" onChange={handleFileChange} preview={image.preview} className="!border-2" />

        <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
      </form>
    </Modal>
  )
}

export default FormModal