import React, { useState, useEffect } from 'react';

import Table from '../../../libs/components/table/simple';
import { Dropdown } from '../../../libs/components/dropdown'

import { getAllBanner, deleteBanner } from '../../models/bannerModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const [banner, setBanner] = useState([]);

  const getData = async () => {
    const dataBanner = await getAllBanner();
    setBanner(dataBanner)
  }

  useEffect(() => {
    getData();
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    if (window.confirm('Anda yakin ingin menghapusnya?')) {
      const response = await deleteBanner(id);

      if (response.success) {
        alert('Berhasil menghapus banner');
        getData();
      }
    }
  }

  const data = React.useMemo(() => banner)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
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