import { useState, useEffect } from 'react'

import { getTripSummary } from '../../../models/tripModel'

import CardSummary from './CardSummary'

import { SortDropdown } from '../../../components/SortDropdown'

const RightSide = () => {
  const [summary, setSummary] = useState([])

  useEffect(() => {
    (async () => {
      const dataSummary = await getTripSummary();
      console.log(dataSummary);
      setSummary(dataSummary)
    })()
  },[])

  return (
    <div className="grow px-4 h-[688px] rounded-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl text-maincolor mb-4">Summary</h1>
        <SortDropdown placeholder="Tujuan" options={['Cilacap', 'Jogjakarta', 'Malang']}/>
      </div>

      <div className="h-full overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">

        {summary.map((e,i) => (
          <CardSummary key={i}
            title={e.detail_bus ? e.detail_bus.name : '-'}
            jumlah_penumpang={e.passenger_count}
            laki_laki={e.passenger_man_count}
            perempuan={e.passenger_woman_count}
            driver_image={e.detail_bus ? e.detail_bus.driver.image : 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'}
            driver_name={e.detail_bus ? e.detail_bus.driver.name : '-'}
            no_polisi={e.detail_bus ? e.detail_bus.no_police : '-'}
          />
        ))}
      </div>
    </div>
  );
}

export default RightSide;