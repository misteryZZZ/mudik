import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'
import { ImageUpload } from '../../../libs/components/imageUpload'

import { createLO, getLODetail, updateLO } from '../../models/loModel'

const FormModal = ({ setShowModal, type, id, dataSelect, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);

  const [image, setImage] = useState({});

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    re_password: '',
    phone: '',
    type: '',
    vehicle_id: '',
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
    formData.append('email', data.email);
    if (data.password) formData.append('password', data.password);
    if (data.password) formData.append('re_password', data.re_password);
    formData.append('phone', data.phone);
    formData.append('type', data.type);
    formData.append('vehicle_id', String(data.vehicle_id));
    if (image.file) formData.append('image', image.file);


    if (type == 'create') {
      const response = await createLO(formData);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat bus');
      }
    } else {
      const response = await updateLO(id, formData);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate bus');
      }
    }

    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getLODetail(id)
        console.log(dataPre);
        setData({
          name: dataPre.name,
          email: dataPre.email,
          password: '',
          re_password: '',
          phone: dataPre.phone,
          type: dataPre.bus ? 'bus' : 'truck',
          vehicle_id: dataPre.bus_id ? dataPre.bus_id : dataPre.truck_id,
        })
        setImage({ preview: dataPre.image })
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
          <InputWithLabel label="Nama LO" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2" />
          <InputWithLabel label="Email" name="email" value={data.email} onChange={e => setData({...data, email: e.target.value})} className="border-2" />
          <InputWithLabel label="Password" type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} className="border-2"/>
          <InputWithLabel label="Confirm Password" type="password" value={data.re_password} onChange={e => setData({...data, re_password: e.target.value})} className="border-2"/>
          <InputWithLabel label="No Telepon" value={data.phone} onChange={e => setData({...data, phoone: e.target.value})} className="border-2"/>
          <SelectWithLabel label="Tipe Kendaraan" options={dataVehicleType} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2"/>
          <SelectWithLabel label="Kendaraan" options={(data.type) ? dataSelect[data.type] : []} selected={data.vehicle_id} value={data.vehicle_id} onChange={e => setData({...data, vehicle_id: String(e.target.value)})} className="border-2"/>
          <ImageUpload label="Gambar" onChange={handleFileChange} preview={image.preview} className="!border-2" />

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal