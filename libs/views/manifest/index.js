import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import SectionTable from './SectionTable'
import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

import Header from '../layout/header'

const Manifest = () => {
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
  return(
    <>
      <Header title="Data Manifest" hasMoreButtons
      additionalComponent={
        <>
          {/*<ButtonSort className="text-black mr-4" text="Kota tujuan" medium />*/}
          <SortDropdown placeholder="Kota tujuan" options={['Cilacap', 'Yogyakarta', 'Malang']} />
          <Search medium />
        </>
      } />
      <main className="px-4 py-2">
        <SectionTable />
      </main>
    </>
  );
}

export default Manifest;