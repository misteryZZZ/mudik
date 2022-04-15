import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'

import { isLogedin } from '../../models/userModel'
import { getTripCounting } from '../../models/tripModel'
import { getCheckpoint } from '../../models/checkpointModel'

import LeftSide from './leftSide';
import RightSide from './rightSide';

const DashboardView = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);

  const [trips, setTrips] = useState([])
  const [checkpoint, setCheckpoint] = useState([])
  const [filterOptions, setFilterOption] = useState([])
  const [summaryFilter, setSummaryFilter] = useState([])
  const [filter, setFilter] = useState('')

  const handleChangeFilter = (e) => {
    setFilter(e.value);
  }

  useEffect(() => {
    (async () => {
      const userData = await isLogedin();
      console.log(userData);
      await setUser(userData);
      if (!userData) {
        router.push('/dashboard/login');
      }

      const dataTrips = await getTripCounting();
      setTrips(dataTrips)
      setFilterOption([...new Set(dataTrips.map(e => e.trip.city.name))])

      const dataCheckpoint = await getCheckpoint();
      setCheckpoint(dataCheckpoint)
    })()
  },[])

  if (!user) return <SpinnerOverlay className="text-maincolor" />;
  return (
    <Layout
    title="Mudik Gratis DKI Jakarta 2022"
    menuActive="dashboard">
      <Header
      title="Dashboard"
      hasMoreButtons
      user={user}/>
      <main className="px-4 py-2">
        <div className="flex flex-col lg:flex-row">
          <LeftSide
          trips={trips.filter(e => e.trip.city.name.includes(filter))}
          checkpoint={checkpoint.filter(e => e.bus?.name.includes(filter))}
          />
          <RightSide
          filterOptions={filterOptions}
          filter={filter}
          handleChangeFilter={handleChangeFilter}
          />
        </div>
      </main>
    </Layout>
  );
}


export default DashboardView;