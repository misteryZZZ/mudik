import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getAllTrip, deleteTrip } from '../../models/tripModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [trips, setTrips] = useState([]);

  const getData = async () => {
    const dataTrips = await getAllTrip();
    setTrips(dataTrips)
  }

  useEffect(() => {
    getData()
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    const response = await deleteTrip(id);

    if (response.success) {
      alert('Berhasil menghapus trip');
      getData()
    }
  }

  const data = React.useMemo(() => trips)

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
    <section className="rounded-2xl bg-white p-4">
      <div className="overflow-auto pb-3">
        <Table columns={columns} data={data} />
      </div>
    </section>
  )
}

export default SectionTable;