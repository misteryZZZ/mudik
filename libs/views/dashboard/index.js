import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import Header from '../layout/header'

import { isLogedin } from '../../models/userModel'

import LeftSide from './leftSide';
import RightSide from './rightSide';

const DashboardView = () => {
  const router = useRouter();

  const [logedIn, setLogedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin();
      await setLogedIn(logedInStatus);
      if (!logedInStatus) {
        router.push('/login');
      }
    })()
  },[])

  if (!logedIn) return false;
  return (
    <>
      <Header title="Dashboard" hasMoreButtons />
      <main className="px-4 py-2">
        <div className="flex flex-col lg:flex-row">
          <LeftSide />
          <RightSide />
        </div>
      </main>
    </>
  );
}


export default DashboardView;