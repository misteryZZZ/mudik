import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Table from '../../components/table/TablePagination';
import { Dropdown } from '../../components/dropdown'
import { Button } from '../../components/button'
import { SpinnerOverlay } from '../../components/loading'


import { getPassengerManifest, verifPassenger } from '../../models/passengerModel';

const SectionTable = ({ filter, search, tableUpdate, handleVerifClick, handleMemberClick, setShowModal }) => {
  const router = useRouter()
  const { page } = router.query;
  
  const [manifest, setManifest] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true)
    const dataManifest = await getPassengerManifest({ page });
    console.log(dataManifest);

    // filter nulled member
    let memberCount = 0;
    const filterMember = dataManifest.data.map((e,i) => {
      const notNullMember = e.member.filter(f => f.name && f.email);
      memberCount += notNullMember.length
      return {
        ...e,
        id_with_member: i + 1 + memberCount - notNullMember.length,
        member: notNullMember
      }
    })

    setManifest({
      ...dataManifest,
      data: filterMember
    })
    setLoading(false)
  }

  useEffect(() => {
    getData();
  },[tableUpdate, page])

  console.log(manifest);

  const data = React.useMemo(() => manifest.data ? manifest.data : [])

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + ((manifest) ? manifest.from : 1)
        // accessor: 'id_with_member'
      },
      {
        Header: 'No Tiket Penumpang',
        accessor: ({ mudik, scan_booking }) => (scan_booking == '1') ? mudik?.code : ''
      },
      {
        Header: 'No Tiket Motor',
        accessor: ({ mudik, scan_booking }) => (scan_booking == '1') ? mudik?.code : ''
      },
      {
        Header: 'Status Keberangkatan',
        accessor: () => ''
      },
      {
        Header: 'No. Bus',
        accessor: ({ mudik, scan_booking }) => (scan_booking == '1') ? mudik?.bus_card : ''
      },
      {
        Header: 'No. Truck',
        accessor: ({ mudik, scan_booking }) => (scan_booking == '1') ? mudik?.truck_card : ''
      },
      {
        Header: 'Kota Tujuan',
        accessor: 'trip.city.name'
      },
      {
        Header: 'Nama Penumpang',
        accessor: ({ name, member }) => {
          if (member.length > 0) return (
          <button className="flex items-center justify-center mx-auto max-w-[380px]" onClick={() => handleMemberClick(member)}>
            {name}
            <svg className="ml-2 shrink-0" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </button>
        )
        return <span className="max-w-[380px]">{name}</span>;
        }
      },
      {
        Header: 'NIK',
        accessor: ({ nik, file_ktp }) => {
          if (file_ktp) return (
            <a href={file_ktp} target="_blank"
            className="py-1 px-3 border border-maincolor text-maincolor rounded">
              {nik}
            </a>
          )
        }
      },
      {
        Header: 'No. KK',
        accessor: ({ no_kk, file_kk }) => {
          if (file_kk) return (
            <a href={file_kk} target="_blank"
            className="py-1 px-3 border border-maincolor text-maincolor rounded">
              {no_kk}
            </a>
          )
        }
      },
      {
        Header: 'Kota pada KTP',
        accessor: 'placebirth'
      },
      {
        Header: 'Jenis Kelamin',
        accessor: ({ gender }) => `${(gender === 'p') ? 'Perempuan' : (gender === 'l') ? 'Laki-laki' : ''}`
      },
      {
        Header: 'No. Telepon',
        accessor: 'phone'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Status Vaksin',
        accessor: 'type_vaksin'
      },
      {
        Header: 'Puskesmas',
        accessor: 'puskes.name'
      },
      {
        Header: 'Waktu Verifikasi Offline',
        accessor: 'verify_date'
      },
      {
        Header: 'Sepeda Motor',
        accessor: ({ vehicle }) => vehicle ? 'Ya' : 'Tidak'
      },
      {
        Header: 'No. STNK',
        accessor: 'vehicle.no_stnk'
      },
      {
        Header: 'File Booster',
        accessor: ({ file_booster }) => {
          if (file_booster) return (
            <a href={file_booster} target="_blank"
            className="py-1 px-3 border border-maincolor text-maincolor rounded">
              Dokumen
            </a>
          )
        }
      },
      {
        Header: 'Status Booking',
        accessor: 'status'
      },
      // {
      //   Header: 'Verifikasi',
      //   accessor: ({ id, name, address, verify_date }) => (
      //     <Button
      //     text="Verifikasi"
      //     disabled={!!verify_date}
      //     className="bg-maincolor disabled:opacity-50 hover:bg-maincolor-dark pointer-events-none"
      //     onClick={() => handleVerifClick(id, {name, address})} />
      //   )
      // },
      {
        Header: 'Kode Booking',
        accessor: () => ''
      }
    ], 
   [manifest]);

  return (
    <section className="rounded-2xl bg-white p-4 shadow-lg shadow-gray-500/10 relative">
      {isLoading && (
        <SpinnerOverlay className="text-maincolor" />
      )}
      <Table
      columns={columns}
      data={data}
      links={manifest.links || []}
      from={manifest.from}
      to={manifest.to}
      total={manifest.total}
      basePagination="/dashboard/manifest"
      />
    </section>
  )
}

export default SectionTable;