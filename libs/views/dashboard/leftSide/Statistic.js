import { useState, useEffect } from 'react';

import { getStatistic } from '../../../models/tripModel'

import CardStatistic from './CardStatistic';

export default function Statistic() {
  const [statistic, setStatistic] = useState({
    penumpang: {
      penumpang_mudik: '-',
      penumpang_balik: '-',
      motor_mudik: '-',
      motor_balik: '-',
    },
    verif: {
      penumpang_mudik: '-',
      penumpang_balik: '-',
      motor_mudik: '-',
      motor_balik: '-',
    }
  });

  useEffect(() => {
    (async () => {
      const penumpang_mudik = await getStatistic({ type: 'passenger', category: 'mudik', verif: 'no' })
      const penumpang_balik = await getStatistic({ type: 'passenger', category: 'balik', verif: 'no' })
      const motor_mudik = await getStatistic({ type: 'vehicle', category: 'mudik', verif: 'no' })
      const motor_balik = await getStatistic({ type: 'vehicle', category: 'balik', verif: 'no' })

      const penumpang_mudik_verif = await getStatistic({ type: 'passenger', category: 'mudik', verif: 'yes' })
      const penumpang_balik_verif = await getStatistic({ type: 'passenger', category: 'balik', verif: 'yes' })
      const motor_mudik_verif = await getStatistic({ type: 'vehicle', category: 'mudik', verif: 'yes' })
      const motor_balik_verif = await getStatistic({ type: 'vehicle', category: 'balik', verif: 'yes' })
      
      setStatistic({
        penumpang: {
          penumpang_mudik: penumpang_mudik.toLocaleString(),
          penumpang_balik: penumpang_balik.toLocaleString(),
          motor_mudik: motor_mudik.toLocaleString(),
          motor_balik: motor_balik.toLocaleString(),
        },
        verif: {
          penumpang_mudik: penumpang_mudik_verif.toLocaleString(),
          penumpang_balik: penumpang_balik_verif.toLocaleString(),
          motor_mudik: motor_mudik_verif.toLocaleString(),
          motor_balik: motor_balik_verif.toLocaleString(),
        }
      })
    })()
  },[])

  return (
    <>
      <CardStatistic
      title="Jumlah Penumpang"
      penumpangMudik={statistic.penumpang.penumpang_mudik}
      penumpangBalik={statistic.penumpang.penumpang_balik}
      motorMudik={statistic.penumpang.motor_mudik}
      motorBalik={statistic.penumpang.motor_balik}
      />
      <CardStatistic
      title="Jumlah Verifikasi E-Ticket"
      penumpangMudik={statistic.verif.penumpang_mudik}
      penumpangBalik={statistic.verif.penumpang_balik}
      motorMudik={statistic.verif.motor_mudik}
      motorBalik={statistic.verif.motor_balik}
      />
    </>
  )
}