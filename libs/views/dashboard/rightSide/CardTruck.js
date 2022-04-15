import React from 'react'

const CardTruck = ({
  title,
  jumlah_motor,
  driver_image,
  driver_name,
  no_polisi,
}) => (
  <div className="bg-white rounded-lg shadow-sm text-sm mb-4">
    <div className="flex justify-between items-center w-full p-3 border-b">
      <h2 className="text-orange font-semibold text-lg">{title}</h2>
      <p className="rounded-md bg-yellow-300 px-3 h-min">{no_polisi}</p>
    </div>

    <div className="flex items-center justify-center px-3 py-1.5 border-b">
      <p className="w-[80px]">Jumlah Motor</p>
      <div className="flex items-start">
        <p className="text-4xl font-semibold">{jumlah_motor}</p>
        <p className="ml-2">Unit</p>
      </div>
    </div>

    <div className="flex items-center gap-2 p-3">
      <img className="rounded-md w-12 h-12 object-cover" src={driver_image} alt="foto driver" />
      <div className="grow">
        <p className="font-semibold">{driver_name}</p>
        {/*<p className="bg-green-500/25 text-green-900 px-2 rounded inline-block text-xs">
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-green-500 my-[2px] mr-2" />
          Perjalanan
        </p>*/}
      </div>
      <p className="text-orange">Truk Barang</p>
    </div>
  </div>
)

export default CardTruck;