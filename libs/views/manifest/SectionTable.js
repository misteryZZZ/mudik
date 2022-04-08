import React from 'react';

import Table from '../../components/table';

import dataManifest from '../../models/manifest-dummy.json'

const SectionTable = () => {

  const data = React.useMemo(() => dataManifest)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'kota_tujuan'
      },
      {
        Header: 'No Bus & Truk',
        accessor: 'no_kendaraan'
      },
      {
        Header: 'Nama Penumpang',
        accessor: 'nama_penumpang'
      },
      {
        Header: 'Jenis Kelamin',
        accessor: 'jenis_kelamin'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'No Telepon',
        accessor: 'telepon'
      },
      {
        Header: 'Barang Bawaan',
        accessor: 'barang_bawaan'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Vaksin',
        accessor: 'vaksin'
      },
      {
        Header: 'Hasil Tes',
        accessor: 'hasil_tes'
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