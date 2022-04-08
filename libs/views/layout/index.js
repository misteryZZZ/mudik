import React from 'react'

import Head from 'next/head'

import Navigation from './navigation'

const Layout = ({ children, title, description, menuActive }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex">
        <Navigation menuActive={menuActive} />
        <div className="grow flex flex-col bg-gray-50 h-[100vh] overflow-y-scroll">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;