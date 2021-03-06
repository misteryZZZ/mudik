import React, { useState, useEffect } from 'react';

import Table from '../../components/table';
import { Dropdown } from '../../components/dropdown'

// import dataLO from '../../models/lo-dummy.json'
import { getAllLO } from '../../../libs_cms/models/loModel';

const SectionTable = ({ filter, search }) => {
  const [dataLO, setDataLO] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getAllLO();
      console.log(data);
      setDataLO(data)
    })()
  },[])

  const data = React.useMemo(() => dataLO)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Nama LO',
        accessor: 'name'
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'bus.name'
      },
      {
        Header: 'No Bus',
        accessor: 'bus.code'
      },
      {
        Header: 'No Telepon',
        accessor: 'phone'
      },
      {
        Header: 'Foto LO',
        accessor: (rows) => <img className="w-12 h-12 object-cover rounded-full mx-auto" src={rows.image} />
      },
      /*{
        Header: 'Masuk',
        accessor: 'masuk'
      },
      {
        Header: 'Pulang',
        accessor: 'keluar'
      }*/
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4 shadow-gray-500/10">
      <div className="overflow-auto pb-3">
        <Table columns={columns} data={data} search={search} filter={filter} />
      </div>
    </section>
  )
}

export default SectionTable;