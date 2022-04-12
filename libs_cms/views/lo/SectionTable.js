import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getAllLO, deleteLO } from '../../models/loModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [LO, setLO] = useState([]);

  const getData = async () => {
    const dataLO = await getLO();
    setLO(dataLO)
  }

  useEffect(() => {
    getData();
  },[tableUpdate])

  const handleDelete = async (id) => {
    const response = await deleteLO(id);
    if (response.success) {
      alert('Berhasil menghapus LO')
      setLO(LO.filter(e => e.id != id));
    }
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
        Header: 'Tipe Kendaraan',
        accessor: 'type'
      },
      {
        Header: 'No Polisi',
        accessor: (rows) => <>{rows[type]?.no_police}</>
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