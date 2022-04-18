import React from 'react'

const DetilJumlah = ({ trip, bus, truck }) => (
  <table className="text-[10px] border-b leading-5 mb-2 w-full">
    <thead>
      <tr className="text-left pr-2">
        <th className="mx-px text-sm text-orange-500">{trip}</th>
        <th className="mx-px">
          <img className="w-3" src="/images/bus.svg" alt=""/>
        </th>
        <th className="mx-px">
          <img className="w-3" src="/images/male.svg" alt=""/>
        </th>
        <th className="mx-px">
          <img className="w-3" src="/images/female.svg" alt=""/>
        </th>
        <th className="mx-px">
          <img className="w-3" src="/images/motorcycle.svg" alt=""/>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="pr-2">Bus Penumpang</td>
        <td className="text-center">{bus[0]}</td>
        <td className="text-center">{bus[1]}</td>
        <td className="text-center">{bus[2]}</td>
        <td className="text-center">{bus[3]}</td>
      </tr>
      <tr>
        <td className="pr-2">Truk Barang</td>
        <td className="text-center">{truck[0]}</td>
        <td className="text-center">{truck[1]}</td>
        <td className="text-center">{truck[2]}</td>
        <td className="text-center">{truck[3]}</td>
      </tr>
    </tbody>
  </table>
)

export default DetilJumlah;