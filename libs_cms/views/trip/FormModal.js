import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'
import { InputRoute } from '../../../libs/components/inputRoute'
import { Modal } from '../../../libs/components/modal';

import { createTrip, getTripDetail, updateTrip } from '../../models/tripModel'

const FormModal = ({ setShowModal, type, id, dataSelect, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);
  
  const [data, setData] = useState({
    city_id: undefined,
    type: undefined,
    rute: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type == 'create') {
      const response = await createTrip(data);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat trip');
      }
    } else {
      const response = await updateTrip(id, data);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate trip');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getTripDetail(id)
        console.log(dataPre);
        setData({
          city_id: dataPre.city_id,
          type: dataPre.type,
          rute: dataPre.rute.map(e => e.name)
        })
      }
    })()
  }, [])

  return (
    <Modal title={(type === 'create') ? 'Buat trip baru' : 'Update trip'} onClose={() => setShowModal(false)}>
      <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
        <SelectWithLabel label="Kota" required placeholder="-Pilih Kota-" nama="city" options={dataSelect.city} selected={data.city_id} onChange={e => setData({...data, city_id: e.target.value})} className="border-2"/>
        <SelectWithLabel label="Tipe" required placeholder="-Pilih Tipe-" nama="type" options={dataSelect.type} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2" />
        <InputRoute label="Rute" setValues={(newValues) => setData({...data, rute: newValues})} values={data.rute} className="border-2"/>

        <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
      </form>
    </Modal>
  )
}

export default FormModal