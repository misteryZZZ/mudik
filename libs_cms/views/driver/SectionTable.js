import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getDriver, deleteDriver } from '../../models/driverModel';

const SectionTable = ({ filter, search }) => {
  const [driver, setDriver] = useState({
    data: []
  });

  useEffect(() => {
    (async () => {
      const dataDriver = await getDriver();
      console.log(dataDriver);
      setDriver(dataDriver)
    })()
  },[])

  const handleDelete = async (id) => {
    const response = await deleteDriver(id);
    if (response.success) alert('Berhasil menghapus driver')
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
        Header: 'No Polisi',
        accessor: (rows) => rows[rows.type].no_police
      },
      {
        Header: 'Kota Tujuan',
        accessor: (rows) => rows[rows.type].trip.city.name
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
        <Table columns={columns} data={driver.data} />
      </div>
    </section>
  )
}

export default SectionTable;