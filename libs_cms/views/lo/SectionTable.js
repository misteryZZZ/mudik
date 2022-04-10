import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getLO, deleteLO } from '../../models/loModel';

const SectionTable = ({ filter, search }) => {
  const [LO, setLO] = useState({
    data: []
  });

  useEffect(() => {
    (async () => {
      const dataLO = await getLO();
      console.log(dataLO);
      setLO(dataLO)
    })()
  },[])

  const handleDelete = async (id) => {
    const response = await deleteLO(id);
    if (response.success) alert('Berhasil menghapus LO')
  }

  const data = React.useMemo(() => LO)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Nama',
        accessor: 'name'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Telepon',
        accessor: 'phone'
      },
      {
        Header: 'Bus',
        accessor: 'bus.name'
      },
      {
        Header: 'No Polisi',
        accessor: 'bus.no_police'
      },
      {
        Header: 'Action',
        accessor: (rows) => (
          <>
          <button className="bg-yellow-500 rounded px-2 text-white mr-1"
          onClick={null}>
            Update
          </button>
          <button className="bg-red-500 rounded px-2 text-white mr-1"
          onClick={() => handleDelete(rows.id)}>
            Delete
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
        <Table columns={columns} data={LO.data} />
      </div>
    </section>
  )
}

export default SectionTable;