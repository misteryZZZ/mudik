import { useState, useEffect } from 'react'

import { getTripSummary } from '../../../models/tripModel'

import CardBus from './CardBus'
import CardTruck from './CardTruck'

import { SortDropdown } from '../../../components/SortDropdown'
import { Spinner } from '../../../components/loading'

const RightSide = ({ summaryFilter }) => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    (async () => {
      const dataSummary = await getTripSummary();
      console.log(dataSummary);
      setSummary(dataSummary)
    })()
  },[])

  return (
    <div className="grow px-4 max-h-[688px] rounded-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl text-maincolor mb-4">Summary</h1>
        <SortDropdown placeholder="Tujuan" options={summaryFilter}/>
      </div>

      <div className="overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 max-h-[770px]">

        {(!summary) ? (
          <Spinner className="text-maincolor mx-auto" />
        ) : (
          summary.map((e,i) => (
            <>
              {e.category == 'bus' ? (
                <CardBus key={i}
                  title={e.name}
                  jumlah_penumpang={e.mudik?.passenger_count}
                  laki_laki={e.mudik?.passenger_man_count}
                  perempuan={e.mudik?.passenger_woman_count}
                  driver_image={e.driver ? e.driver.image : 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'}
                  driver_name={e.driver ? e.driver.name : '-'}
                  no_polisi={e.no_police}
                />
              ): (
                <CardTruck key={i}
                  title={e.name}
                  jumlah_motor={e.mudik?.vehicle_count}
                  driver_image={e.driver ? e.driver.image : 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'}
                  driver_name={e.driver ? e.driver.name : '-'}
                  no_polisi={e.no_police}
                />
              )}
            </>
          ))
        )}
      </div>
    </div>
  );
}

export default RightSide;