import React, { useState, useEffect } from 'react';

import Table from '../../components/table';
import { Dropdown } from '../../components/dropdown'
import { Button } from '../../components/button'

import FormModal from './FormModal'

import { getPassengerManifest, verifPassenger } from '../../models/passengerModel';

const SectionTable = ({ filter, search }) => {
  const [modalID, setModalID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [manifest, setManifest] = useState([]);

  const getData = async () => {
    const dataManifest = await getPassengerManifest();
    console.log(dataManifest);
    setManifest(dataManifest)
  }

  const handleVerif = async (id) => {
    const response = await verifPassenger(id);
    if (response.success) {
      alert('Berhasil')
      getData();
    }
  }

  useEffect(() => {
    getData();
  },[])

  const data = React.useMemo(() => manifest)

  const columns = React.useMemo(() => [
      {
        Header: 'No',
        accessor: (e,i) => i + 1,
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
        Header: 'Email',
        accessor: 'detail_passenger.email'
      },
      {
        Header: 'Vaksin',
        accessor: ({ detail_passenger: {vaksin} }) => `Dosis ${vaksin}`
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
        Header: 'Status',
        accessor: ({ detail_passenger: {id, verify_date} }) => (
          <Button text="Verifikasi" disabled={!!verify_date} className="bg-maincolor hover:bg-maincolor-dark" onClick={() => {setShowModal(true); setModalID(id)}} />
        )
      }
    ],
    []
  );

  return (
    <section className="rounded-2xl bg-white p-4">
      <div className="overflow-auto pb-3">
        <Table columns={columns} data={data} search={search} filter={filter} />
        {showModal && <FormModal setShowModal={setShowModal} id={modalID}/>}
      </div>
    </section>
  )
}

export default SectionTable;