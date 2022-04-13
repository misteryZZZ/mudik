import React, { useState, useEffect } from 'react';

import Table from '../../components/table/TableSort';
import { Dropdown } from '../../components/dropdown'
import { Button } from '../../components/button'


import { getPassengerManifest, verifPassenger } from '../../models/passengerModel';

const SectionTable = ({ filter, search, tableUpdate, handleVerifClick, setShowModal }) => {
  
  const [manifest, setManifest] = useState([]);

  const getData = async () => {
    const dataManifest = await getPassengerManifest();
    console.log(dataManifest);
    setManifest(dataManifest)
  }


  useEffect(() => {
    getData();
  },[tableUpdate])

  const data = React.useMemo(() => manifest)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: 'id'
      },
      {
        Header: 'No Tiket Penumpang',
        accessor: 'code'
      },
      {
        Header: 'No Tiket Motor',
        accessor: 'code'
      },
      {
        Header: 'Status Keberangkatan',
        accessor: '(belom)'
      },
      {
        Header: 'No. Bus',
        accessor: 'bus_card'
      },
      {
        Header: 'No. Bus',
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
          if (member.length == 0) return name;
          const options = [...member].map(e => e.name)
          return (<Dropdown placeholder={name} options={options}/>)
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
        accessor: '(belom)'
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
        accessor: ({ detail_passenger: {id, verify_date} }) => (
          <Button text="Verifikasi" disabled={!!verify_date} className="bg-maincolor disabled:opacity-50 hover:bg-maincolor-dark" onClick={() => handleVerifClick(id)} />
        )
      },
      {
        Header: 'Kode Booking',
        accessor: '(belom)'
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4 shadow-lg shadow-gray-500/10">
        <Table columns={columns} data={data} search={search} filter={filter} />
    </section>
  )
}

export default SectionTable;