import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'

import { createTruck, getTruckDetail, updateTruck } from '../../models/truckModel'

const FormModal = ({ setShowModal, type, id, dataSelect, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    driver_id: '',
    trip_id: '',
    code: '',
    no_police: '',
    quota: '',
    date_at: '',
    time_at: '',
    place_at: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type == 'create') {
      const response = await createTruck(data);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal membuat truck');
      }
    } else {
      const response = await updateTruck(id, data);
      console.log(response);
      if (response && response.success) {
        onSuccess();
        setShowModal(false);
      } else {
        alert('Gagal menupdate truck');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      if (type == 'update') {
        const dataPre = await getTruckDetail(id)
        console.log(dataPre);
        setData({
          driver_id: dataPre.id,
          trip_id: dataPre.trip_id,
          code: dataPre.code,
          no_police: dataPre.no_police,
          quota: dataPre.quota,
          date_at: dataPre.date_at,
          time_at: dataPre.time_at,
          place_at: dataPre.place_at,
        })
      }
    })()
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">{(type === 'create') ? 'Buat truck baru' : 'Update truck'}</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          <SelectWithLabel label="Driver" nama="driver" options={dataSelect.driver} selected={data.driver_id} onChange={e => setData({...data, driver_id: String(e.target.value)})} className="border-2" />
          <SelectWithLabel label="Trip" nama="trip" options={dataSelect.trip} selected={data.trip_id} onChange={e => setData({...data, trip_id: String(e.target.value)})} className="border-2" />
          <InputWithLabel label="Kode" name="code" value={data.code} onChange={e => setData({...data, code: e.target.value})} className="border-2"/>
          <InputWithLabel label="No Polisi" name="no_police" value={data.no_police} onChange={e => setData({...data, no_police: e.target.value})} className="border-2"/>
          <InputWithLabel label="Kuota" name="quota" value={data.quota} onChange={e => setData({...data, quota: String(e.target.value)})} className="border-2"/>
          <InputWithLabel label="Tanggal" type="date" value={data.date_at} onChange={e => setData({...data, date_at: e.target.value})} className="border-2"/>
          <InputWithLabel label="Waktu" type="time" value={data.time_at} onChange={e => setData({...data, time_at: e.target.value})} className="border-2"/>
          <InputWithLabel label="Posisi" value={data.place_at} onChange={e => setData({...data, place_at: e.target.value})} className="border-2"/>

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal