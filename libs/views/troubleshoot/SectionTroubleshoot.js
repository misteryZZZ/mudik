import React from 'react';

import Table from '../../components/table';

import dataTroubleshoot from '../../models/troubleshoot-dummy.json'

const SectionTable = () => {

  const data = React.useMemo(() => dataTroubleshoot)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
      },
      {
        Header: 'Nomor Bis',
        accessor: 'no_kendaraan'
      },
      {
        Header: 'Tujuan',
        accessor: 'tujuan'
      },
      {
        Header: 'Nama Lo',
        accessor: 'nama_lo'
      },
      {
        Header: 'Jumlah Penumpang',
        accessor: (row) => (
          <>
            <span className="mx-1">L: {row.jumlah_penumpang.laki_laki}</span>
            <span className="mx-1">P: {row.jumlah_penumpang.perempuan}</span>
          </>
        )
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Tanggal',
        accessor: 'tanggal'
      },
      {
        Header: 'Jam',
        accessor: 'jam'
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4 h-full shadow-gray-500/10">
      <div className="overflow-auto pb-3 h-full">
        <Table columns={columns} data={data} filter="tujuan" />
      </div>
    </section>
  )
}

export default SectionTable;