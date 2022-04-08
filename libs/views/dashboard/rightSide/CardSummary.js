import React from 'react'

const CardSummary = () => (
  <div className="bg-white rounded-lg shadow-sm text-sm mb-4">
    <div className="flex justify-between items-center w-full p-3 border-b">
      <h2 className="text-orange-500 font-semibold text-lg">Cilacap - 01</h2>
      <p className="rounded-md bg-yellow-300 px-3 h-min">B 1234 DKI</p>
    </div>

    <div className="flex items-center justify-between px-3 py-1.5 border-b">
      <p className="w-[80px]">Jumlah Penumpang</p>
      <div className="flex items-start">
        <p className="text-4xl font-semibold">54</p>
        <p>Org</p>
      </div>
      <div>
        <p>30 Laki-laki</p>
        <p>24 Perempuan</p>
      </div>
    </div>

    <div className="flex items-center gap-2 p-3">
      <img className="rounded-md w-12" src="https://randomuser.me/api/portraits/men/5.jpg" alt="" />
      <div className="grow">
        <p className="font-semibold">Jawad Nugroho</p>
        <p className="bg-green-500/25 text-green-900 px-2 rounded inline-block text-xs">
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-green-500 my-[2px] mr-2" />
          Perjalanan
        </p>
      </div>
      <p className="text-orange-300">Bus Penumpang</p>
    </div>
  </div>
)

export default CardSummary;