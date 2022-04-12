import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table';
import { Dropdown } from '../../../libs/components/dropdown'

import { getPassengerManifest } from '../../../libs/models/passengerModel';

const SectionTable = ({ filter, search }) => {
  const [manifest, setManifest] = useState([]);

  useEffect(() => {
    (async () => {
      const dataManifest = await getPassengerManifest();
      console.log(dataManifest);
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
        Header: 'Nama Penumpang',
        accessor: ({ detail_passenger: {name, member}}) => {
          if (member.length == 0) return name;
          const options = [...member].map(e => e.name)
          return (<Dropdown placeholder={name} options={options}/>)
        }
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
      },
      {
        Header: 'Jenis Vaksin',
        accessor: (rows) => rows.detail_passenger.type_vaksin
      },
      {
        Header: 'Puskesmas',
        accessor: (rows) => rows.detail_passenger.puskes
      },
      {
        Header: 'Action',
        accessor: (rows) => (
          <>
            <button className="bg-green-500 rounded px-2 text-white mr-1"
            onClick={null}>
              Accept
            </button>
            <button className="bg-red-500 rounded px-2 text-white mr-1"
            onClick={null}>
              Decline
            </button>
          </>
        )
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