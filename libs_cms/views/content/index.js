import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import FormModal from './FormModal'
import { Button } from '../../../libs/components/button'
import { SpinnerOverlay } from '../../../libs/components/loading'

const BusView = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [modalID, setModalID] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateClick = (slug) => {
    setModalID(slug);
    setShowModal(true);
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

  if (!user) return <SpinnerOverlay  className="text-maincolor" />;
  return(
    <Layout 
    title="Content | Mudik Gratis DKI Jakarta 2022"
    menuActive="content">
      <Header title="Content" hasMoreButtons
      user={user} />
      <main className="px-4 py-2">
        <SectionTable
        setShowModal={setShowModal}
        handleUpdateClick={handleUpdateClick}
        />
        {showModal &&
          <FormModal
          setShowModal={setShowModal}
          id={modalID}
          // onSuccess={handleModalSuccess}
          />}
      </main>
    </Layout>
  );
}

export default BusView;