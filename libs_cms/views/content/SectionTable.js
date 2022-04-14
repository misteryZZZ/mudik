import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const content = [
    {slug: 'lokasi-mudik', title: 'Lokasi Mudik'},
    {slug: 'lokasi-keberangkatan', title: 'Lokasi Keberangkatan'},
    {slug: 'syarat-ketentuan', title: 'Syarat dan Ketentuan'},
  ]

  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="overflow-auto pb-3">

      </div>
    </section>
  )
}

export default SectionTable;