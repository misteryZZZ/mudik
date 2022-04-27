import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'
import { getAllCity } from '../../../libs_cms/models/cityModel'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'
import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

import SectionMap from './SectionMap'

const Map = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);
  const [filterOptions, setFilterOption] = useState([])
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const handleChangeFilter = (e) => {
    setFilter(e.value);
  }

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setSearch(value);
  }

  useEffect(() => {
    (async () => {
      const dataUser = await isLogedin()
      await setUser(dataUser);
      if (!dataUser) {
        router.push('/dashboard/login');
      } else {
        const dataCity = await getAllCity();
        setFilterOption([ {label: 'all', value:''},...new Set(dataCity.map(e => e.name))])
      }
    })()
  },[])

  if (!user) return <SpinnerOverlay className="text-maincolor" />;
  return (
    <Layout
    title="Mudik Gratis DKI Jakarta 2022"
    menuActive="map">
      <Header title="Live Map" hasMoreButtons
      user={user}
       additionalComponent={
        <>
          <SortDropdown placeholder="Semua rute" options={filterOptions} onChange={handleChangeFilter} />
          <Search medium className="mr-2" onChange={handleSearchChange}/>
        </>
      } />
      <main className="px-4 py-2">
        <SectionMap filter={filter} search={search}  />
      </main>
    </Layout>
  );
}

export default Map;