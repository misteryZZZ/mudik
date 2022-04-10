import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'

import { createTrip, getTripDetail } from '../../models/tripModel'
import { getCity } from '../../models/cityModel'

const FormModal = ({ setShowModal, type, id }) => {

  const [isLoading, setLoading] = useState(false);

  const [cityID, setCityID] = useState(null);
  const [data, setData] = useState({
    cityID: null,
    type: null,
  });

  // const dataCity = [
  //   {label: 'Yogyakarta', value: 1},
  //   {label: 'Malang', value: 2},
  //   {label: 'Cilacap', value: 3},
  // ]
  const [dataCity, setDataCity] = useState([])
  const dataType = ['mudik-saja','mudik-balik','mudik-balik-motor']

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createTrip(data);
    console.log(response);
    if (response && response.success) {
      alert('Berhasil membuat trip');
    } else {
      alert('Gagal membuat trip');
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const fetchDataCity = await getCity();
      setDataCity(fetchDataCity.data.map(e => ({
        label: e.name,
        value: e.id
      })))

      if (type == 'update') {
        const dataPre = await getTripDetail(id)
        console.log(dataPre);
        setData({
          cityID: dataPre.city_id,
          type: dataPre.type
        })
      }
    })()
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start backdrop-blur-sm z-10 bg-black/10 overflow-y-auto p-4">
      <div className="flex flex-col bg-white rounded-xl p-6 shadow-lg w-full max-w-[800px]">
        <div className="flex justify-between border-b pb-4">
          <h1 className="text-xl font-semibold">{(type === 'create') ? 'Buat trip baru' : 'Update trip'}</h1>
          <button className="text-xl" onClick={() => setShowModal(false)}>x</button>
        </div>
        <form className="overflow-y-auto py-4" onSubmit={handleSubmit}>
          <SelectWithLabel label="Kota" nama="city" options={dataCity} selected={data.cityID} onChange={e => setData({...data, cityID: e.target.value})} className="border-2" />
          <SelectWithLabel label="Tipe" nama="type" options={dataType} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2" />

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal