import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getCity, deleteCity } from '../../models/cityModel';

const SectionTable = ({ filter, search }) => {
  const [city, setCity] = useState({
    data: []
  });

  useEffect(() => {
    (async () => {
      const dataCity = await getCity();
      setCity(dataCity)
      console.log(city);
    })()
  },[])

  const handleDelete = async (id) => {
    const response = await deleteCity(id);
    if (response.success) alert('Berhasil menghapus city')
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
        <Table columns={columns} data={city.data} />
      </div>
    </section>
  )
}

export default SectionTable;