import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import FormModal from './FormModal'
import { Button } from '../../../libs/components/button'

const TripView = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [modalID, setModalID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState('create');

  const handleUpdate = (id) => {
    console.log(id);
    setModalID(id);
    setShowModal(true);
    setTypeModal('update')
  }

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin()
      await setUser(logedInStatus);
      if (!logedInStatus) {
        router.push('/cms/login');
      }
    })()
  },[])

  if (!user) return <>Loading...</>;
  return(
    <Layout 
    title="Trip | Mudik Gratis DKI Jakarta 2022"
    menuActive="trip">
      <Header title="Trip" hasMoreButtons
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
        handleUpdate={handleUpdate}
        />
        {showModal && <FormModal setShowModal={setShowModal} type={typeModal} id={modalID} />}
      </main>
    </Layout>
  );
}

export default TripView;