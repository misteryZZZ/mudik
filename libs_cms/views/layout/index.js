import React from 'react'

import Head from 'next/head'

import Navigation from './navigation'

const Layout = ({ children, title, description, menuActive, headerTitle, headerMoreButtons, user }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div>
        <Navigation menuActive={menuActive} />
        <div className="flex flex-col bg-gray-50 min-h-[100vh] lg:ml-[210px] transition-all">
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;