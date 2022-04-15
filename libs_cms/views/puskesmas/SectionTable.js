import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/TableSort';
import { Dropdown } from '../../../libs/components/dropdown';
import { SpinnerOverlay } from '../../../libs/components/loading';

import { getAllPuskesmas, deletePuskesmas } from '../../models/puskesmasModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [puskesmass, setPuskesmass] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    const dataPuskesmass = await getAllPuskesmas();
    setPuskesmass(dataPuskesmass)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    if (window.confirm('Anda yakin ingin menghapusnya?')) {
      const response = await deletePuskesmas(id);

      if (response.success) {
        alert('Berhasil menghapus puskesmas');
        getData()
      }
    }
  }

  const data = React.useMemo(() => puskesmass)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'city.name'
      },
      {
        Header: 'Terminal',
        accessor: 'city.terminal_name'
      },
      {
        Header: 'Tipe',
        accessor: 'type'
      },
      {
        Header: 'Action',
        accessor: (rows) => (
          <>
          <button className="bg-yellow-500 rounded px-2 text-white mr-1"
          onClick={() => handleUpdateClick(rows.id)}>
            Update
          </button>
          <button className="bg-red-500 rounded px-2 text-white mr-1"
          onClick={() => handleDeleteClick(rows.id)}>
            Delete
          </button>
          </>
        )
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4 relative">
      {isLoading && (
        <SpinnerOverlay className="text-maincolor" />
      )}
      <Table columns={columns} data={data} />
    </section>
  )
}

export default SectionTable;