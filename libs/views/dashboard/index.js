import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'

import { isLogedin } from '../../models/userModel'
import { getMap } from '../../models/mapModel'
import { getTripCounting, getStatistic } from '../../models/tripModel'
import { getCheckpoint } from '../../models/checkpointModel'
import { getAllCity } from '../../../libs_cms/models/cityModel'

import LeftSide from './leftSide';
import RightSide from './rightSide';

const DashboardView = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);

  const [trips, setTrips] = useState([])
  const [checkpoint, setCheckpoint] = useState([])
  const [maps, setMaps] = useState([])
  const [scaned, setScaned] = useState('-')

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
      } else {

        const response = await getMap();
        setMaps(response)

        const dataTrips = await getTripCounting();
        setTrips(dataTrips)

        const dataCity = await getAllCity();
        console.log('city',dataCity);
        setFilterOption([ {label: 'all', value:''},...new Set(dataCity.map(e => e.name))])

        const dataCheckpoint = await getCheckpoint();
        setCheckpoint(dataCheckpoint)

        const dataScaned = await getStatistic({ type: 'total', category: 'mudik', verif: 'yes'});
        setScaned(dataScaned.toLocaleString())
        
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
      <main className="px-4">
        <div className="flex flex-col lg:flex-row">
          <LeftSide
          maps={maps.filter(e => e.name?.includes(filter))}
          trips={trips.filter(e => e.name.includes(filter))}
          checkpoint={checkpoint.filter(e => e.bus?.name.includes(filter))}
          scaned={scaned}
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