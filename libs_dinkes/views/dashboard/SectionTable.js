import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/TableSort';
import { Dropdown } from '../../../libs/components/dropdown'

import { getManifestDinkes } from '../../models/manifestModel';

const capitalizeFirstLetter = (string) => string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);

const SectionTable = ({ filter, search, territory }) => {
  const [manifest, setManifest] = useState([]);

  useEffect(() => {
    (async () => {
      const dataManifest = await getManifestDinkes();
      console.log(dataManifest);
      setManifest(dataManifest)
    })()
  },[])

  const data = React.useMemo(() => manifest.filter(e => (e.detail_passenger.puskes.kabupaten).toLowerCase() == (territory).toLowerCase() ))

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (rows, i) => i + 1
      },
      {
        Header: 'Penumpang',
        accessor: 'detail_passenger.name'
      },
      {
        Header: 'Jenis Kelamin',
        accessor: ({ detail_passenger: {gender} }) => `${(gender === 'p') ? 'Perempuan' : 'Laki-laki'}`
      },
      {
        Header: 'Email',
        accessor: 'detail_passenger.email'
      },
      {
        Header: 'No Telepon',
        accessor: 'detail_passenger.phone'
      },
      {
        Header: 'NIK',
        accessor: 'detail_passenger.nik'
      },
      {
        Header: 'No KK',
        accessor: 'detail_passenger.no_kk'
      },
      {
        Header: 'Vaksin',
        accessor: ({ detail_passenger: {vaksin} }) => (vaksin) ? `Dosis ${vaksin}` : 'Belum Vaksin'
      },
      {
        Header: 'Tipe Vaksin',
        accessor: 'detail_passenger.type_vaksin'
      },
      {
        Header: 'Puskesmas',
        accessor: ({detail_passenger: {puskes}}) => `Puskesmas ${capitalizeFirstLetter(puskes.name)}`
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="overflow-auto pb-3">
        <Table columns={columns} data={data} search={search} filter={filter} />
      </div>
    </section>
  )
}

export default SectionTable;