import Head from 'next/head'

import SectionForm from './SectionForm'
import SectionImage from './SectionImage'

const Login = () => {
  return (
    <>
      <Head>
        <title>Login | Mudik Gratis JKT 2022</title>
      </Head>
      <div className="flex flex-col md:flex-row min-h-[100vh] bg-[url('/images/bg-pattern.svg')]">
        <SectionForm />
        <SectionImage />
      </div>
    </>
  );
}

export default Login;