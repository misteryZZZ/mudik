import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'
import { getAllDriver } from '../../models/driverModel'
import { getAllTrip } from '../../models/tripModel'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import FormModal from './FormModal'
import { Button } from '../../../libs/components/button'
import { SpinnerOverlay } from '../../../libs/components/loading'

const BusView = () => {
  const router = useRouter();

  const [tableUpdate, setTableUpdate] = useState(0);

  const [user, setUser] = useState(false);
  const [modalID, setModalID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('create');
  const [dataSelect, setDataSelect] = useState({
    driver: [],
    trip: [],
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

      const fetchTrip = await getAllTrip();
      const fetchDriver = await getAllDriver();
      await setDataSelect({
        trip: fetchTrip.map(e => ({
          label: `${e.city.name} (${e.type})`,
          value: e.id
        })),
        driver: fetchDriver.map(e => ({
          label: e.name,
          value: e.id
        }))
      })

    })()
  },[])

  if (!user) return <SpinnerOverlay  className="text-maincolor" />;
  return(
    <Layout 
    title="Bus | Mudik Gratis DKI Jakarta 2022"
    menuActive="bus">
      <Header title="Bus" hasMoreButtons
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
        handleUpdateClick={handleUpdateClick}
        tableUpdate={tableUpdate}/>
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

export default BusView;