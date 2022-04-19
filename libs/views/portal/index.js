import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { Button } from '../../components/button'

export const ProtalView = () => {
  return (
    <>
      <Head>
        <title>Mudik Gratis JKT 2022</title>
      </Head>
      <div className="flex flex-col bg-maincolor p-6 min-h-[100vh]">
        <div className="flex justify-center gap-6">
          <img className="w-16" src="/images/pemprov-dki.png" alt="logo pemprov dki"/>
          <img className="w-16" src="/images/dishub-dki.png" alt="logo dishub dki"/>
        </div>
        <div className="grow flex items-center justify-center">
          <div className="max-w-4xl w-full mx-auto py-16">
            <h1 className="text-3xl text-center font-semibold text-white mb-12">Pilih layanan</h1>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard"><Button text="Dashboard" className="text-2xl h-28" /></Link>
              <Link href="/cms"><Button text="CMS" className="text-2xl h-28" /></Link>
              <Link href="/dinkes"><Button text="Dinkes" className="text-2xl h-28" /></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProtalView;