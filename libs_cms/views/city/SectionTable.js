import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/TableSort';
import { Dropdown } from '../../../libs/components/dropdown'

import { getAllCity, deleteCity } from '../../models/cityModel';

const SectionTable = ({ handleUpdateClick, tableUpdate }) => {
  const [city, setCity] = useState([]);

  const getData = async () => {
    const dataCity = await getAllCity();
    setCity(dataCity)
  }

  useEffect(() => {
    getData();
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    const response = await deleteCity(id);

    if (response.success) {
      alert('Berhasil menghapus city');
      getData();
    }
  }

  const data = React.useMemo(() => city)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Kota',
        accessor: 'name'
      },
      {
        Header: 'Terminal',
        accessor: 'terminal_name'
      },
      {
        Header: 'Gambar',
        accessor: (rows) => <img className="w-20 mx-auto" src={rows.image} alt="" />
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
      <Table columns={columns} data={data} />
    </section>
  )
}

export default SectionTable;