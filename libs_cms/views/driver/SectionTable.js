import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getAllDriver, deleteDriver } from '../../models/driverModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [driver, setDriver] = useState([]);

  const getData = async () => {
    const dataDriver = await getAllDriver();
    setDriver(dataDriver)
  }

  useEffect(() => {
    getData();
  },[])

  const handleDeleteClick = async (id) => {
    const response = await deleteDriver(id);

    if (response.success) {
      alert('Berhasil menghapus driver');
      setDriver(driver.filter(e => e.id != id));
    }
  }

  const data = React.useMemo(() => driver)

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
        Header: 'Tipe Kendaraan',
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