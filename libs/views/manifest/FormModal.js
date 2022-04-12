import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'

import { verifPassenger } from '../../models/passengerModel'

const FormModal = ({ setShowModal, id }) => {

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    passenger_date: '',
    passenger_time_start: '',
    passenger_time_end: '',
    passenger_place: '',
    vehicle_date: '',
    vehicle_time_start: '',
    vehicle_time_end: '',
    vehicle_place: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await verifPassenger(data);
    if (response && response.success) {
      alert('Berhasil memverifikasi');
    } else {
      alert('Gagal memverifikasi');
    }

    setLoading(false);
  }

  useEffect(() => {
    //
  }, [])  

  return (
    <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">Verifikasi penumpang</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          {/*PASSENGER*/}
          <h1 className="text-lg">Penumpang</h1>
          <InputWithLabel label="Tanggal penumpang" type="date" value={data.passenger_date} onChange={e => setData({...data, passenger_date: e.target.value})} className="border-2"/>
          <InputWithLabel label="Waktu mulai penumpang" type="time" value={data.passenger_time_start} onChange={e => setData({...data, passenger_time_start: e.target.value})} className="border-2"/>
          <InputWithLabel label="Waktu akhir penumpang" type="time" value={data.passenger_time_end} onChange={e => setData({...data, passenger_time_end: e.target.value})} className="border-2"/>
          <InputWithLabel label="Tempat penumpang" value={data.passenger_place} onChange={e => setData({...data, passenger_place: e.target.value})} className="border-2"/>
          {/*VEHICLE*/}
          <h1 className="text-lg my-6">Motor</h1>
          <InputWithLabel label="Tanggal motor" type="date" value={data.vehicle_date} onChange={e => setData({...data, vehicle_date: e.target.value})} className="border-2"/>
          <InputWithLabel label="Waktu mulai motor" type="time" value={data.vehicle_time_start} onChange={e => setData({...data, vehicle_time_start: e.target.value})} className="border-2"/>
          <InputWithLabel label="Waktu akhir motor" type="time" value={data.vehicle_time_end} onChange={e => setData({...data, vehicle_time_end: e.target.value})} className="border-2"/>
          <InputWithLabel label="Tempat motor" value={data.vehicle_place} onChange={e => setData({...data, vehicle_place: e.target.value})} className="border-2"/>

          <Button text="Verifikasi" isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal