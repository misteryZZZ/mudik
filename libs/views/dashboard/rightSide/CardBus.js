import React from 'react'

const CardBus = ({
  title,
  jumlah_penumpang,
  laki_laki,
  perempuan,
  driver_image,
  driver_name,
  no_polisi
}) => (
  <div className="bg-white rounded-lg shadow-sm text-sm mb-4">
    <div className="flex justify-between items-center w-full p-3 border-b">
      <h2 className="text-orange font-semibold text-lg">{title}</h2>
      <p className="rounded-md bg-yellow-300 px-3 h-min">{no_polisi}</p>
    </div>

    <div className="flex items-center justify-between px-3 py-1.5 border-b">
      <p className="w-[80px]">Jumlah Penumpang</p>
      <div className="flex items-start">
        <p className="text-4xl font-semibold">{jumlah_penumpang}</p>
        <p className="ml-2">Org</p>
      </div>
      <div>
        <p>{laki_laki} Laki-laki</p>
        <p>{perempuan} Perempuan</p>
      </div>
    </div>

    <div className="flex items-center gap-2 p-3">
      <img className="rounded-md w-12" src={driver_image} alt="foto driver" />
      <div className="grow">
        <p className="font-semibold">{driver_name}</p>
        {/*<p className="bg-green-500/25 text-green-900 px-2 rounded inline-block text-xs">
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-green-500 my-[2px] mr-2" />
          Perjalanan
        </p>*/}
      </div>
      <p className="text-orange">Bus Penumpang</p>
    </div>
  </div>
)

export default CardBus;