import { useState } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'

import { verifPassenger } from '../../models/passengerModel'

const VerifModal = ({ setShowModal, id, data, onSuccess }) => {

  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const [dataForm, setDataForm] = useState({
    passenger_id: id,
    passenger_date: '',
    passenger_time_start: '',
    passenger_time_end: '',
    passenger_place: '',
  });

  const dataTempatVerif = [
    'Dinas Perhubungan Provinsi DKI Jakarta',
    'Suku Dinas Perhubungan Kota Jakarta Barat',
    'Suku Dinas Perhubungan Kota Jakarta Pusat',
    'Suku Dinas Perhubungan Kota Jakarta Timur',
    'Suku Dinas Perhubungan Kota Jakarta Utara',
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await verifPassenger(dataForm);
    if (response && response.success) {
      onSuccess()
      setShowModal(false)
    } else {
      alert('Gagal memverifikasi');
    }

    setLoading(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-[520px] min-h-[300px]">
        {step == 0 && (
          <>
            <div className="flex flex-col justify-between items-end h-full">
              <div className="grow">
                <div className="flex justify-between -mt-2">
                  <h1 className="text-xl font-semibold"></h1>
                  <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
                </div>
                <p className="text-maincolor text-2xl">
                  Apakah anda yakin semua dataForm manifest <span className="text-orange">{data.name}</span> sesuai dataForm dokumen?
                </p>
              </div>
              <Button text="Lanjutkan" className="w-36 rounded-lg mt-24" onClick={() => setStep(1)} />
            </div>
          </>
        )}
        {step == 1 && (
          <>
            <div className="flex flex-col sm:flex-row gap-4 relative">
              <button className="text-xl absolute -top-6 left-full" onClick={() => setShowModal(false)}>x</button>
              <div className="sm:w-1/2">
                <h1 className="text-xl text-maincolor">{data.name}</h1>
                <p>{data.address}</p>
                <ul className="bg-[#ECECEC] p-3 list-disc text-xs pl-6 mr-4 mt-4">
                  <li>Dinas Perhubungan Provinsi DKI Jakarta: 5500</li>
                  <li>Suku Dinas Perhubungan Kota Jakarta Barat: 6000</li>
                  <li>Suku Dinas Perhubungan Kota Jakarta Pusat: 4000</li>
                  <li>Suku Dinas Perhubungan Kota Jakarta Timur: 5000</li>
                  <li>Suku Dinas Perhubungan Kota Jakarta Utara: 4000</li>
                </ul>
              </div>
              <form className="sm:w-1/2" onSubmit={handleSubmit}>
                <SelectWithLabel label="Tempat Verifikasi" selected={dataForm.passenger_place} options={dataTempatVerif} onChange={e => setDataForm({...dataForm, passenger_place: e.value})} className="border border-black !text-sm"/>
                <InputWithLabel label="Tanggal" type="date" value={dataForm.passenger_date} onChange={e => setDataForm({...dataForm, passenger_date: e.target.value})} className="border border-black !text-sm"/>
                <InputWithLabel label="Waktu mulai" type="time" value={dataForm.passenger_time_start} onChange={e => setDataForm({...dataForm, passenger_time_start: e.target.value})} className="border border-black !text-sm"/>
                <InputWithLabel label="Waktu akhir" type="time" value={dataForm.passenger_time_end} onChange={e => setDataForm({...dataForm, passenger_time_end: e.target.value})} className="border border-black !text-sm"/>

                <Button text="Verifikasi" isLoading={isLoading} className="mt-6" />
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifModal;