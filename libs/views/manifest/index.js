import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { isLogedin } from '../../models/userModel'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'

import VerifModal from './VerifModal'
import MemberModal from './MemberModal'
import SectionTable from './SectionTable'
import { SortDropdown } from '../../components/SortDropdown'
import { Search } from '../../components/input'

const Manifest = () => {
  const router = useRouter();

  const [tableUpdate, setTableUpdate] = useState(0);

  const [user, setUser] = useState(false);
  const [search, setSearch] = useState();
  const [filter, setFilter] = useState('city');
  const [data, setData] = useState('');
  const [modalID, setModalID] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [memberModal, setMemberModal] = useState(false);
  const [dataMember, setdataMember] = useState([]);

  const filterOptions = [
    {
      label: 'Kota tujuan',
      value: 'city'
    },{
      label: 'Nama Penumpang',
      value: 'name'
    },{
      label: 'Email',
      value: 'email'
    }
  ]

  const handleSearchChange = (e) => {
    const value = e.target.value || '';
    setSearch(value);
  }

  const handleSearchKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
      router.push(`/dashboard/manifest?page=1&key_search=${filter}&search=${search}`)
    }
  }

  const handleFilterChange = (e) => {
    const value = e.value || undefined;
    setFilter(value);
  }

  const handleVerifClick = (id, data) => {
    setModalID(id);
    setData(data);
    setShowModal(true);
  }

  const handleModalSuccess = () => {
    setTableUpdate(tableUpdate+1)
  }

  const handleMemberClick = (member) => {
    setMemberModal(true)
    setdataMember(member)
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
    title="Data Manifest | Mudik Gratis DKI Jakarta 2022"
    menuActive="manifest">
      <Header title="Data Manifest" hasMoreButtons
      user={user}
      additionalComponent={
        <>
          <SortDropdown placeholder="Kota tujuan" options={filterOptions} onChange={handleFilterChange} />
          <Search medium className="mr-2" onChange={handleSearchChange} onKeyPress={handleSearchKeyPress}  />
        </>
      } />
      <main className="px-4 py-2">
        <SectionTable
        search={search}
        filter={filter}
        handleVerifClick={handleVerifClick}
        handleMemberClick={handleMemberClick}
        tableUpdate={tableUpdate}
        />
        {showModal &&
          <VerifModal
          setShowModal={setShowModal}
          id={modalID}
          data={data}
          onSuccess={handleModalSuccess}
          />}
        {memberModal &&
          <MemberModal
          data={dataMember}
          setShowModal={setMemberModal}
          />}
      </main>
    </Layout>
  );
}

export default Manifest;