import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getTruck, deleteTruck } from '../../models/truckModel';

const SectionTable = ({ handleUpdate }) => {
  const [truck, setTruck] = useState({
    data: []
  });

  useEffect(() => {
    (async () => {
      const dataTruck = await getTruck();
      setTruck(dataTruck)
      console.log(truck);
    })()
  },[])

  const handleDelete = async (id) => {
    const response = await deleteTruck(id);

    if (response.success) {
      alert('Berhasil menghapus truk');
      setTruck({
        ...truck,
        data: truck.data.filter(e => e.id != id)
      });
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
        Header: 'No Polisi',
        accessor: 'no_police'
      },
      {
        Header: 'Kuota',
        accessor: 'quota'
      },
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
        <Table columns={columns} data={truck.data} />
      </div>
    </section>
  )
}

export default SectionTable;