import React, { useState, useEffect } from 'react';

import Table from '../../components/table';
import { Dropdown } from '../../components/dropdown'

import dataLO from '../../models/lo-dummy.json'
// import { getPassengerList } from '../../models/passengerModel';

const SectionTable = ({ filter, search }) => {
  // const [manifest, setManifest] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const dataManifest = await getPassengerList();
  //     console.log(dataManifest);
  //     setManifest(dataManifest)
  //   })()
  // },[])

  const data = React.useMemo(() => dataLO)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Nama LO',
        accessor: 'nama_lo'
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'kota_tujuan'
      },
      {
        Header: 'No Bus',
        accessor: 'no_bus'
      },
      {
        Header: 'No Telepon',
        accessor: 'phone'
      },
      {
        Header: 'Foto LO',
        accessor: (rows) => <img className="w-12 rounded-full mx-auto" src={rows.image} />
      },
      {
        Header: 'Masuk',
        accessor: 'masuk'
      },
      {
        Header: 'Pulang',
        accessor: 'keluar'
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4 shadow-gray-500/10">
      <div className="overflow-auto pb-3">
        <Table columns={columns} data={data} search={search} filter={'kota_tujuan'} />
      </div>
    </section>
  )
}

export default SectionTable;