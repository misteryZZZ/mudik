import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'

import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

import SectionTroubleshoot from './SectionTroubleshoot'

const Troubleshoot = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);

  useEffect(() => {
    (async () => {
      const dataUser = await isLogedin()
      await setUser(dataUser);
      if (!dataUser) {
        router.push('/dashboard/login');
      }
    })()
  },[])

  if (!user) return <SpinnerOverlay className="text-maincolor" />;
  return (
    <Layout menuActive="troubleshoot"
    title="Troubleshoot | Mudik Gratis DKI Jakarta 2022">
      <Header title="Troubleshoot" hasMoreButtons
      user={user}
      additionalComponent={
        <>
          {/*<ButtonSort className="text-black mr-4" text="Semua rute" medium />*/}
          <SortDropdown placeholder="Semua rute" options={['Cilacap', 'Jogjakarta', 'Malang']} />
          <Search medium />
        </>
      } />
      <main className="px-4 py-2 grow">
        <SectionTroubleshoot />
      </main>
    </Layout>
  );
}

export default Troubleshoot;