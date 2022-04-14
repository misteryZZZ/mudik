import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'

import SectionTable from './SectionTable'
import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

const Manifest = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('bus.name');

  const filterOptions = [
    {
      label: 'Kota tujuan',
      value: 'bus.name'
    },{
      label: 'Nama',
      value: 'name'
    }
  ]

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
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
        router.push('/dashboard/login');
      }
    })()
  },[])

  if (!user) return <SpinnerOverlay className="text-maincolor" />;
  return(
    <Layout 
    title="Data LO | Mudik Gratis DKI Jakarta 2022"
    menuActive="data-lo">
      <Header title="Data LO" hasMoreButtons
      user={user}
      additionalComponent={
        <>
          <SortDropdown placeholder="Kota tujuan" options={filterOptions} onChange={handleFilterChange} />
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