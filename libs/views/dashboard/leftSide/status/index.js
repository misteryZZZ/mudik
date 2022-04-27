import { useState, useEffect } from 'react'

import { getStatus } from '../../../../models/tripModel'

import CardStatus from './CardStatus';

export default function SectionStatus() {
  const [status, setStatus] = useState({
    bus: ['-','-','-','-'],
    truck: ['-','-','-','-']
  })

  useEffect(() => {
    (async () => {
      const busPerjalanan = await getStatus({ category: 'bus', type: 'ongoing' });
      const busIstirahat = await getStatus({ category: 'bus', type: 'rest' });
      const busBantuan = await getStatus({ category: 'bus', type: 'trouble' });
      const busTiba = await getStatus({ category: 'bus', type: 'arrive' });

      const truckPerjalanan = await getStatus({ category: 'truck', type: 'ongoing' });
      const truckIstirahat = await getStatus({ category: 'truck', type: 'rest' });
      const truckBantuan = await getStatus({ category: 'truck', type: 'trouble' });
      const truckTiba = await getStatus({ category: 'truck', type: 'arrive' });

      setStatus({
        bus: [
          busPerjalanan,
          busIstirahat,
          busBantuan,
          busTiba,
        ],
        truck: [
          truckPerjalanan,
          truckIstirahat,
          truckBantuan,
          truckTiba,
        ]
      })
    })()
  }, [])

  return (
    <div className="md:w-[27%] pt-6">
      <CardStatus
        judul="Status Bus"
        perjalanan={status.bus[0]}
        istirahat={status.bus[1]}
        butuhBantuan={status.bus[2]}
        tiba={status.bus[3]}
      />

      <CardStatus
        judul="Status Truk"
        perjalanan={status.truck[0]}
        istirahat={status.truck[1]}
        butuhBantuan={status.truck[2]}
        tiba={status.truck[3]}
      />
    </div>
  )
}