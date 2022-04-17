import { useState, useEffect } from 'react'

import { getTripSummary } from '../../../models/tripModel'

import CardBus from './CardBus'
import CardTruck from './CardTruck'

import { SortDropdown } from '../../../components/SortDropdown'
import { Spinner } from '../../../components/loading'

const RightSide = ({ filterOptions, handleChangeFilter, filter }) => {
  const [summary, setSummary] = useState(null)

  useEffect(() => {
    (async () => {
      const dataSummary = await getTripSummary();
      console.log(dataSummary);
      setSummary(dataSummary)
    })()
  },[])

  return (
    <div className="grow px-4 rounded-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl text-maincolor mb-4">Summary</h1>
        <SortDropdown placeholder="Tujuan" options={filterOptions} onChange={handleChangeFilter} />
      </div>

      <div className="overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2 min-h-[300px] max-h-[770px]">

        {(!summary) ? (
          <Spinner className="text-maincolor mx-auto" />
        ) : (
          summary
          .filter(e => e.vehicle.name?.includes(filter))
          .map((e,i) => (
            <>
              {e.vehicle.category == 'bus' ? (
                <CardBus key={i}
                  title={e.vehicle.name}
                  jumlah_penumpang={e.result.passenger + e.vehicle.khusus}
                  laki_laki={e.result.man}
                  perempuan={e.result.woman}
                  driver_image={e.vehicle.driver ? e.vehicle.driver.image : 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'}
                  driver_name={e.vehicle.driver ? e.vehicle.driver.name : '-'}
                  no_polisi={e.vehicle.no_police}
                />
              ): (
                <CardTruck key={i}
                  title={e.vehicl.name}
                  jumlah_motor={e.result.vehicle}
                  driver_image={e.vehicle.driver ? e.vehicle.driver.image : 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'}
                  driver_name={e.vehicle.driver ? e.vehicle.driver.name : '-'}
                  no_polisi={e.vehicle.no_police}
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