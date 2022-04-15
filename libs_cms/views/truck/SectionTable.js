import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/TableSort';
import { Dropdown } from '../../../libs/components/dropdown'
import { SpinnerOverlay } from '../../../libs/components/loading';

import { getAllTruck, deleteTruck } from '../../models/truckModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [truck, setTruck] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    const dataTruck = await getAllTruck();
    setTruck(dataTruck)
    setLoading(false)
  }

  useEffect(() => {
    getData();
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    if (window.confirm('Anda yakin ingin menghapusnya?')) {
      const response = await deleteTruck(id);

      if (response.success) {
        alert('Berhasil menghapus truk');
        getData();
      }
    }
  }

  const data = React.useMemo(() => truck)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'name'
      },
      {
        Header: 'Driver',
        accessor: 'driver.name'
      },
      {
        Header: 'No Polisi',
        accessor: 'no_police'
      },
      {
        Header: 'Kuota',
        accessor: 'quota'
      },
      {
        Header: 'Slot Khusus',
        accessor: 'khusus'
      },
      {
        Header: 'Tanggal Keberangkatan',
        accessor: ({ date_at }) => (new Date(date_at)).toLocaleDateString('id', {year: 'numeric', month: 'long', day: 'numeric'})
      },
      {
        Header: 'Waktu Keberangkatan',
        accessor: 'time_at'
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