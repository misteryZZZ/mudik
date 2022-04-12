import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import { SortDropdown } from '../../../libs/components/SortDropdown'
import { Search } from '../../../libs/components/input'

const Manifest = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [search, setSearch] = useState(undefined);
  const [filter, setFilter] = useState('Nama Penumpang');

  const filterOptions = [
    {
      label: 'Nama Penumpang',
      value: 'Nama Penumpang'
    },{
      label: 'Vaksin',
      value: 'Vaksin'
    },{
      label: 'Puskesmas',
      value: 'Puskesmas'
    }
  ]

  const handleSearchChange = (e) => {
    const value = e.target.value || undefined;
    setSearch(value);
  }

  const handleFilterChange = (e) => {
    const value = e.value || undefined;
    setFilter(value);
  }

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin()
      await setUser(logedInStatus);
      if (!logedInStatus) {
        router.push('/dinkes/login');
      }
    })()
  },[])

  if (!user) return false;
  return(
    <Layout 
    title="Data Manifest | Mudik Gratis DKI Jakarta 2022"
    menuActive="manifest">
      <Header hasMoreButtons title="Data Manifest"
      user={user}
      additionalComponent={
        <>
          <SortDropdown placeholder="Nama Penumpang" options={filterOptions} onChange={handleFilterChange} />
          <Search medium className="mr-2" onChange={handleSearchChange} />
        </>
      } />
      <main className="px-4 py-2">
        <SectionTable search={search} filter={filter} />
      </main>
    </Layout>
  );
}

export default Manifest;