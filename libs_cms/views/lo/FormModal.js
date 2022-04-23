import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'
import { ImageUpload } from '../../../libs/components/imageUpload'
import { Modal } from '../../../libs/components/modal'

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
    type: 'bus',
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
    formData.append('phone', String(data.phone));
    formData.append('type', data.type);
    formData.append('vehicle_id', String(data.vehicle_id));
    if (image.file) formData.append('image', image.file);


    if (type == 'create') {
      const response = await createLO(formData);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat LO');
      }
    } else {
      formData.append('_method', 'PUT');
      const response = await updateLO(id, formData);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate LO');
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

  console.log('data type:',data.type);
  console.log('dataselect:',dataSelect[data.type]);
  return (
    <Modal title={(type === 'create') ? 'Buat LO baru' : 'Update LO'} onClose={() => setShowModal(false)}>
      <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
        <InputWithLabel required label="Nama LO" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2" />
        <InputWithLabel required label="Email" name="email" value={data.email} onChange={e => setData({...data, email: e.target.value})} className="border-2" />
        <InputWithLabel label="Password" type="password" value={data.password} onChange={e => setData({...data, password: e.target.value})} className="border-2"/>
        <InputWithLabel label="Confirm Password" type="password" value={data.re_password} onChange={e => setData({...data, re_password: e.target.value})} className="border-2"/>
        <InputWithLabel required label="No Telepon" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} className="border-2"/>
        <SelectWithLabel required label="Tipe Kendaraan" placeholder="-Pilih Tipe Kendaraan-" options={dataVehicleType} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2"/>
        <SelectWithLabel required label="Kendaraan" placeholder="-Pilih Kendaraan-" options={(data.type) ? dataSelect[data.type] : []} selected={data.vehicle_id} value={data.vehicle_id} onChange={e => setData({...data, vehicle_id: String(e.target.value)})} className="border-2"/>
        <ImageUpload required label="Gambar" onChange={handleFileChange} preview={image.preview} className="!border-2" />

        <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
      </form>
    </Modal>
  )
}

export default FormModal