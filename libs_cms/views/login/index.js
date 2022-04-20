import  { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { isLogedin } from '../../models/userModel'

import SectionForm from './SectionForm'
import SectionImage from '../../../libs/views/login/SectionImage'

const Login = () => {
  const router = useRouter()

  useEffect(() => {
    (async () => {
      const logedInStatus = await isLogedin()
      if (logedInStatus) {
        router.push('/cms');
      }
    })()
  },[])

  return (
    <>
      <Head>
        <title>Login | Mudik Gratis JKT 2022</title>
      </Head>
      <div className="flex flex-col md:flex-row md:h-[100vh] bg-[url('/images/bg-pattern.svg')] bg-right-bottom">
        <SectionForm />
        <SectionImage />
      </div>
    </>
  );
}

export default Login;