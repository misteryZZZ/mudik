import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'
import { ImageUpload } from '../../../libs/components/imageUpload'
import { Modal } from '../../../libs/components/modal'

import { createDriver, getDriverDetail, updateDriver } from '../../models/driverModel'

const FormModal = ({ setShowModal, type, id, dataSelect, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);
  
  const [image, setImage] = useState({});

  const [data, setData] = useState({
    name: '',
    type: '',
  });

  const dataVehicleType = [
    {label: 'Bus', value: 'bus'},
    {label: 'Truck', value: 'truck'},
  ]

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
    formData.append('type', data.type);
    if (image.file) formData.append('image', image.file);

    console.log(...formData.entries());

    if (type == 'create') {
      const response = await createDriver(formData);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat driver');
      }
    } else {
      formData.append('_method', 'PUT');
      const response = await updateDriver(id, formData);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate driver');
      }
    }
    setLoading(false);
  }

  // didMount
  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getDriverDetail(id)
        console.log(dataPre);
        setData({
          name: dataPre.name,
          type: dataPre.type,
        })
        setImage({ preview: dataPre.image })
      }
    })()
  }, [])

  return (
    <Modal title={(type == 'create' ? 'Buat driver baru' : 'Update driver')} onClose={() => setShowModal(false)}>
      <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
        <InputWithLabel label="Nama" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2"/>
        <SelectWithLabel label="Tipe Kendaraan" nama="type" options={dataVehicleType} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2" />
        <ImageUpload label="Gambar" onChange={handleFileChange} preview={image.preview} className="!border-2" />

        <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
      </form>
    </Modal>
  )
}

export default FormModal