import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { SpinnerOverlay } from '../../components/loading'

import Layout from '../layout'
import Header from '../layout/header'

import { isLogedin } from '../../models/userModel'

import LeftSide from './leftSide';
import RightSide from './rightSide';

const DashboardView = () => {
  const router = useRouter();

  const [user, setUser] = useState(false);

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
          <LeftSide />
          <RightSide />
        </div>
      </main>
    </Layout>
  );
}


export default DashboardView;