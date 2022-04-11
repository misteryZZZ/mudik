import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import Layout from '../layout'
import Header from '../layout/header'
import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

import SectionMap from './SectionMap'

const Map = () => {
  const router = useRouter();

  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin()
      await setLogedIn(logedInStatus);
      if (!logedInStatus) {
        router.push('/login');
      }
    })()
  },[])

  if (!logedIn) return false;
  return (
    <Layout
    title="Mudik Gratis DKI Jakarta 2022"
    menuActive="map">
      <Header title="Live Map" additionalComponent={
        <>
          <SortDropdown placeholder="Semua rute" options={['Cilacap', 'Jogjakarta', 'Malang']} />
          <Search medium />
        </>
      } />
      <main className="px-4 py-2">
        <SectionMap />
      </main>
    </Layout>
  );
}

export default Map;