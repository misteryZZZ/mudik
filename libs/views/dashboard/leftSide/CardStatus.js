import React from 'react';

const CardStatus = ({ judul, perjalanan, istirahat, butuhBantuan, tiba}) => (
  <div className="rounded-lg bg-gray-100 p-4 mb-4 last:mb-0">
    <h1 className="font-semibold text-center text-gray-500">{judul}</h1>
    <hr className="my-px"/>
    <div className="flex items-center gap-2">
      <span className="w-[6px] h-[6px] rounded-full bg-green-500" />
      <p className="text-xs grow text-gray-500">Perjalanan</p>
      <p className="text-xl font-semibold">{perjalanan}</p>
    </div>
    <hr className="my-px"/>
    <div className="flex items-center gap-2">
      <span className="w-[6px] h-[6px] rounded-full bg-gray-500" />
      <p className="text-xs grow text-gray-500">Istirahat</p>
      <p className="text-xl font-semibold">{istirahat}</p>
    </div>
    <hr className="my-px"/>
    <div className="flex items-center gap-2">
      <span className="w-[6px] h-[6px] rounded-full bg-red-500" />
      <p className="text-xs grow text-gray-500">Butuh bantuan</p>
      <p className="text-xl font-semibold">{butuhBantuan}</p>
    </div>
    <hr className="my-px"/>
    <div className="flex items-center gap-2">
      <span className="w-[6px] h-[6px] rounded-full bg-yellow-500" />
      <p className="text-xs grow text-gray-500">Telah Tiba</p>
      <p className="text-xl font-semibold">{tiba}</p>
    </div>
    <hr className="my-px"/>
  </div>
)

export default CardStatus;