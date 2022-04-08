import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

const Manifest = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin()
      await setUser(logedInStatus);
      if (!logedInStatus) {
        router.push('/login');
      }
    })()
  },[])

  if (!user) return false;
  return(
    <Layout 
    title="Data Manifest | Mudik Gratis DKI Jakarta 2022"
    menuActive="manifest">
      <Header title="Data Manifest" hasMoreButtons
      user={user}
      additionalComponent={
        <>
          <SortDropdown placeholder="Kota tujuan" options={['Cilacap', 'Yogyakarta', 'Malang']} />
          <Search medium className="mr-2" onChange={() => setFilter(e.target.value)} />
        </>
      } />
      <main className="px-4 py-2">
        <SectionTable filter={filter} />
      </main>
    </Layout>
  );
}

export default Manifest;