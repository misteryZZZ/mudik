import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

const SectionTable = ({ handleUpdateClick }) => {
  const content = [
    {slug: 'lokasi-mudik', title: 'Lokasi Mudik'},
    {slug: 'lokasi-keberangkatan', title: 'Lokasi Keberangkatan'},
    {slug: 'syarat-ketentuan', title: 'Syarat dan Ketentuan'},
  ]

  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="overflow-auto pb-3">
        {content.map((e,i) => (
          <div key={i} className="flex p-4 justify-between border-b">
            <p className="font-semibold text-lg">{e.title}</p>
            <button className="bg-orange rounded-lg px-3 py-1 text-white" onClick={() => handleUpdateClick(e.slug)}>Update</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionTable;