import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Table from '../../../libs/components/table/TablePagination';
import { Dropdown } from '../../../libs/components/dropdown';
import { SpinnerOverlay } from '../../../libs/components/loading';

import { getAllPuskesmas, deletePuskesmas } from '../../models/puskesmasModel';

const SectionTable = ({ handleUpdateClick, setShowModal, tableUpdate }) => {
  const router = useRouter()
  const { page } = router.query;

  const [puskesmas, setPuskesmas] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    const dataPuskesmas = await getAllPuskesmas();
    setPuskesmas(dataPuskesmas)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  },[tableUpdate])

  const handleDeleteClick = async (id) => {
    if (window.confirm('Anda yakin ingin menghapusnya?')) {
      const response = await deletePuskesmas(id);

      if (response.success) {
        alert('Berhasil menghapus puskesmas');
        getData()
      }
    }
  }

  const data = React.useMemo(() => puskesmas.data || [])

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
        Header: 'Alamat',
        accessor: 'address'
      },
      {
        Header: 'Kecamatan',
        accessor: 'kecamatan'
      },
      {
        Header: 'Kabupaten',
        accessor: 'kabupaten'
      },
      {
        Header: 'No. Telepon',
        accessor: 'phone'
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
      <Table
      columns={columns}
      data={data}
      links={puskesmas?.links}
      from={puskesmas?.from}
      to={puskesmas?.to}
      total={puskesmas?.total}
      basePagination="/cms/puskesmas"
      curentPage={page}
      />
    </section>
  )
}

export default SectionTable;