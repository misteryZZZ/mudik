import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/TableSort';
import { Dropdown } from '../../../libs/components/dropdown'
import { SpinnerOverlay } from '../../../libs/components/loading';

import { getAllDriver, deleteDriver } from '../../models/driverModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [driver, setDriver] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    const dataDriver = await getAllDriver();
    setDriver(dataDriver)
    setLoading(false)
  }

  useEffect(() => {
    getData();
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    if (window.confirm('Anda yakin ingin menghapusnya?')) {
      const response = await deleteDriver(id);

      if (response.success) {
        alert('Berhasil menghapus driver');
        getData();
      }
    }
  }

  const data = React.useMemo(() => driver)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Gambar',
        accessor: ({ image }) => 
        (<img className="w-10 h-10 object-cover rounded-full mx-auto" src={image} alt="" />)
      },
      {
        Header: 'Nama',
        accessor: 'name'
      },
      {
        Header: 'Tipe Kendaraan',
        accessor: 'type'
      },
      {
        Header: 'Action',
        accessor: ({ id }) => (
          <>
          <button className="bg-yellow-500 rounded px-2 text-white mr-1"
          onClick={() => handleUpdateClick(id)}>
            Update
          </button>
          <button className="bg-red-500 rounded px-2 text-white mr-1"
          onClick={() => handleDeleteClick(id)}>
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