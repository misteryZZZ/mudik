import React, { useState, useEffect } from 'react';

import Table from '../../components/table/TableSort';
import { Dropdown } from '../../components/dropdown'
import { Button } from '../../components/button'
import { SpinnerOverlay } from '../../components/loading'


import { getPassengerManifest, verifPassenger } from '../../models/passengerModel';

const SectionTable = ({ filter, search, tableUpdate, handleVerifClick, handleMemberClick, setShowModal }) => {
  
  const [manifest, setManifest] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    const dataManifest = await getPassengerManifest();
    console.log(dataManifest);
    setManifest(dataManifest)
    setLoading(false)
  }

  useEffect(() => {
    getData();
  },[tableUpdate])

  const data = React.useMemo(() => manifest)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (rows, i) => i + 1
      },
      {
        Header: 'No Tiket Penumpang',
        accessor: (rows) => rows.code
      },
      {
        Header: 'No Tiket Motor',
        accessor: (rows) => rows.code
      },
      {
        Header: 'Status Keberangkatan',
        accessor: () => ''
      },
      {
        Header: 'No. Bus',
        accessor: 'bus_card'
      },
      {
        Header: 'No. Truck',
        accessor: 'truck_card'
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'detail_bus.name'
      },
      {
        Header: 'Nama Penumpang',
        // accessor: 'detail_passenger.name'
        accessor: ({ detail_passenger: {name, member}}) => {
          if (member.length > 0) return (
          <button className="flex items-center justify-center mx-auto" onClick={() => handleMemberClick(member)}>
            {name}
            <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>
        )
        return name;
        }
      },
      {
        Header: 'NIK',
        accessor: 'detail_passenger.nik'
      },
      {
        Header: 'No. KK',
        accessor: 'detail_passenger.no_kk'
      },
      {
        Header: 'Jenis Kelamin',
        accessor: ({ detail_passenger: {gender} }) => `${(gender === 'p') ? 'Perempuan' : 'Laki-laki'}`
      },
      {
        Header: 'No. Telepon',
        accessor: 'detail_passenger.phone'
      },
      {
        Header: 'Email',
        accessor: 'detail_passenger.email'
      },
      {
        Header: 'Status Vaksin',
        accessor: 'detail_passenger.type_vaksin'
      },
      {
        Header: 'Puskesmas',
        accessor: 'detail_passenger.puskes.name'
      },
      {
        Header: 'Waktu Verifikasi Offline',
        accessor: () => ''
      },
      {
        Header: 'Sepeda Motor',
        accessor: ({ detail_passenger: {vehicle} }) => vehicle ? 'Ya' : 'Tidak'
      },
      {
        Header: 'No. STNK',
        accessor: 'detail_passenger.vehicle.stnk'
      },
      {
        Header: 'File Booster',
        accessor: ({ detail_passenger: {file_booster} }) => {
          if (file_booster) return (
            <a href={file_booster} target="_blank">Link</a>
          )
        }
      },
      {
        Header: 'Status Booking',
        accessor: ({ detail_passenger: {id, name, address, verify_date} }) => (
          <Button
          text="Verifikasi"
          disabled={!!verify_date}
          className="bg-maincolor disabled:opacity-50 hover:bg-maincolor-dark"
          onClick={() => handleVerifClick(id, {name, address})} />
        )
      },
      {
        Header: 'Kode Booking',
        accessor: () => ''
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4 shadow-lg shadow-gray-500/10 relative">
      {isLoading && (
        <SpinnerOverlay className="text-maincolor" />
      )}
      <Table columns={columns} data={data} search={search} filter={filter} />
    </section>
  )
}

export default SectionTable;