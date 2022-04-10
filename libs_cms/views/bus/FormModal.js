import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'

import { createbus, getBusDetail } from '../../models/busModel'
import { getDriver } from '../../models/driverModel'
import { getTrip } from '../../models/tripModel'

const FormModal = ({ setShowModal, type, id }) => {

  const [isLoading, setLoading] = useState(false);

  const [cityID, setCityID] = useState(null);
  const [data, setData] = useState({
    driverID: null,
    tripID: null,
    code: null,
    no_police: null,
    quota: null,
  });

  const [dataDriver, setDataDriver] = useState([])
  const [dataTrip, setDataTrip] = useState([])

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
      const fetchDataDriver = await getDriver();
      setDataDriver(fetchDataDriver.data.map(e => ({
        label: e.name,
        value: e.id
      })))
      const fetchDataTrip = await getTrip();
      setDataTrip(fetchDataTrip.data.map(e => ({
        label: e.city.name,
        value: e.id
      })))

      if (type == 'update') {
        const dataPre = await getBusDetail(id)
        console.log(dataPre);
        setData({
          driverID: dataPre.id,
          tripID: dataPre.trip_id,
          code: dataPre.code,
          no_police: dataPre.no_police,
          quota: dataPre.quota,
        })
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
          <SelectWithLabel label="Driver" nama="city" options={dataDriver} selected={data.driverID} onChange={e => setData({...data, driverID: e.target.value})} className="border-2" />
          <SelectWithLabel label="Trip" nama="type" options={dataTrip} selected={data.tripID} onChange={e => setData({...data, tripID: e.target.value})} className="border-2" />
          <InputWithLabel label="Kode" name="code" onChange={null} value={data.code} className="border-2"/>
          <InputWithLabel label="No Polisi" name="no_police" onChange={null} value={data.no_police} className="border-2"/>
          <InputWithLabel label="Kuota" name="quota" onChange={null} value={data.quota} className="border-2"/>

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal