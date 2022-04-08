import React, { useState, useEffect } from 'react';

import Table from '../../components/table';

// import dataManifest from '../../models/manifest-dummy.json'
import { getPassengerList } from '../../models/passengerModel';

const SectionTable = ({ filter }) => {
  const [manifest, setManifest] = useState([])

  useEffect(() => {
    (async () => {
      const dataManifest = await getPassengerList();
      setManifest(dataManifest)
    })()
  },[])

  const data = React.useMemo(() => manifest)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'detail_bus.name'
      },
      {
        Header: 'No Bus & Truk',
        accessor: (row) => `${row.detail_bus ? row.detail_bus.code : '-'} dan ${row.detail_truck ? row.detail_truck.code : '-'}`
      },
      {
        Header: 'Nama Penumpang',
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
        Header: 'Barang Bawaan',
        accessor: 'barang_bawaan'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Vaksin',
        accessor: (row) => `Dosis ${row.detail_passenger.vaksin}`
      },
      {
        Header: 'Hasil Tes',
        accessor: 'hasil_tes'
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="overflow-auto pb-3">
        <Table columns={columns} data={data} />
      </div>
    </section>
  )
}

export default SectionTable;