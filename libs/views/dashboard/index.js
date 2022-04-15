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

  const [trips, setTrips] = useState(null)
  const [checkpoint, setCheckpoint] = useState(null)
  const [summaryFilter, setSummaryFilter] = useState([])

  useEffect(() => {
    (async () => {
      const dataTrips = await getTripCounting();
      setTrips(dataTrips)
      setSummaryFilter(dataTrips.map(e => e.trip.city.name))

      const dataCheckpoint = await getCheckpoint();
      setCheckpoint(dataCheckpoint)
    })()
  },[])

  useEffect(() => {
    (async () => {
      const userData = await isLogedin();
      console.log(userData);
      await setUser(userData);
      if (!userData) {
        router.push('/dashboard/login');
      }
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
          trips={trips}
          checkpoint={checkpoint}
          />
          <RightSide
          summaryFilter={summaryFilter}
          />
        </div>
      </main>
    </Layout>
  );
}


export default DashboardView;