import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getTrip, deleteTrip } from '../../models/tripModel';

const SectionTable = ({ handleUpdate }) => {
  const [trips, setTrips] = useState({
    data: []
  });

  useEffect(() => {
    (async () => {
      const dataTrips = await getTrip();
      setTrips(dataTrips)
    })()
  },[])

  const handleDelete = async (id) => {
    const response = await deleteTrip(id);
    if (response.success) {
      alert('Berhasil menghapus trip');
      setTrips({
        ...trips,
        data: trips.data.filter(e => e.id != id)
      });
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
      // {
      //   Header: 'Rute',
      //   accessor: (rows) => <p>{rows.rute.map(e => e.name).join(',')}</p>
      // },
      {
        Header: 'Action',
        accessor: (rows) => (
          <>
          <button className="bg-yellow-500 rounded px-2 text-white mr-1"
          onClick={() => handleUpdate(rows.id)}>
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
        <Table columns={columns} data={trips.data} />
      </div>
    </section>
  )
}

export default SectionTable;