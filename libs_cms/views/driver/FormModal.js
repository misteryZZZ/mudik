import { useState, useEffect } from 'react'

import { Button } from '../../../libs/components/button'
import { InputWithLabel } from '../../../libs/components/input'
import { SelectWithLabel } from '../../../libs/components/select'

import { createDriver, getDriverDetail, updateDriver } from '../../models/driverModel'
import { getBus } from '../../models/busModel'
import { getTruck } from '../../models/truckModel'

const FormModal = ({ setShowModal, type, id }) => {

  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: '',
    type: '',
    vehicle_id: '',
  });

  const dataVehicleType = [
    {label: 'Bus', value: 'bus'},
    {label: 'Truck', value: 'truck'},
  ]
  const [dataVehicle, setDataVehicle] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (type == 'create') {
      const response = await createDriver(data);
      if (response && response.success) {
        alert('Berhasil membuat truck');
      } else {
        alert('Gagal membuat truck');
      }
    } else {
      const response = await updateDriver(id, data);
      console.log(response);
      if (response && response.success) {
        alert('Berhasil menupdate truck');
      } else {
        alert('Gagal menupdate truck');
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      const fetchDataBus = await getBus();
      setDataVehicle(fetchDataBus.data.map(e => ({
        label: `${e.name} (bus)`,
        value: e.id
      })))
      // const fetchDataTruck = await getTruck();
      // setDataVehicle([
      //   ...dataVehicle,
      //   fetchDataTruck.data.map(e => ({
      //     label: `${e.name} (truck)`,
      //     value: e.id
      //   }))
      // ])
      console.log(dataVehicle);

      if (type == 'update') {
        const dataPre = await getDriverDetail(id)
        console.log(dataPre);
        setData({
          name: dataPre.name,
          type: dataPre.type,
          vehicle_id: dataPre.bus_id ? dataPre.bus_id : dataPre.truck_id,
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
          <InputWithLabel label="Nama" name="name" value={data.name} onChange={e => setData({...data, name: e.target.value})} className="border-2"/>
          <SelectWithLabel label="Tipe Kendaraan" nama="type" options={dataVehicleType} selected={data.type} onChange={e => setData({...data, type: e.target.value})} className="border-2" />
          <SelectWithLabel label="Kendaraan" name="vehicle_id" options={dataVehicle} onChange={e => setData({...data, vehicle_id: e.target.value})} className="border-2"/>

          <Button text={(type === 'create') ? 'Buat' : 'Update'} isLoading={isLoading} className="mt-6" />
        </form>
      </div>
    </div>
  )
}

export default FormModal