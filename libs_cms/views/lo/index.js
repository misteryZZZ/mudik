import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'
import { getAllDriver } from '../../models/driverModel'
import { getAllBus } from '../../models/busModel'
import { getAllTruck } from '../../models/truckModel'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import FormModal from './FormModal'
import { Button } from '../../../libs/components/button'

const LOView = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [modalID, setModalID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('create');
  const [dataSelect, setDataSelect] = useState({
    driver: []
  })

  const handleUpdateClick = (id) => {
    console.log(id);
    setModalID(id);
    setShowModal(true);
    setTypeModal('update')
  }

  const handleModalSuccess = () => {
    setTableUpdate(tableUpdate+1)
  }

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin()
      await setUser(logedInStatus);
      if (!logedInStatus) {
        router.push('/cms/login');
      }

      const fetchDriver = await getAllDriver();
      const fetchBus = await getAllBus();
      const fetchTruck = await getAllTruck();
      await setDataSelect({
        driver: fetchDriver.map(e => ({
          label: e.name,
          value: e.id
        })),
        bus: fetchBus.map(e => ({
          label: `${e.name} (${e.no_police})`,
          value: e.id
        })),
        truck: fetchTruck.map(e => ({
          label: `${e.name} (${e.no_police})`,
          value: e.id
        })),
      })

    })()
  },[])

  if (!user) return <>Loading...</>;
  return(
    <Layout 
    title="Data LO | Mudik Gratis DKI Jakarta 2022"
    menuActive="lo">
      <Header title="Data LO" hasMoreButtons
      user={user}
      additionalComponent={
        <>
          <Button text="Create" className="!w-min rounded-lg !py-1" onClick={() => {setShowModal(true); setTypeModal('create')}} />
        </>
      } />
      <main className="px-4 py-2">
        <SectionTable
        setShowModal={setShowModal}
        showModal={showModal}
        handleUpdateClick={handleUpdateClick}/>
        {showModal &&
          <FormModal
          setShowModal={setShowModal}
          type={typeModal}
          id={modalID}
          dataSelect={dataSelect}
          onSuccess={handleModalSuccess}
          />}
      </main>
    </Layout>
  );
}

export default LOView;