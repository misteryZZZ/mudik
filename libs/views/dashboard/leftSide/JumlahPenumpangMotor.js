import { useState, useEffect } from 'react'

import { getPassengerCount } from '../../../models/passengerModel'

const JumlahPenumpangMotor = () => {
  const [passenger, setPassenger] = useState({
    man: 0,
    woman: 0,
    vehicle: 0,
  })

  useEffect(() => {
    (async () => {
      const man = await getPassengerCount('man')
      const woman = await getPassengerCount('woman')
      const vehicle = await getPassengerCount('vehicle')
      await setPassenger({ man, woman, vehicle })
    })()
  },[])

  return (
    <div className="bg-gray-100 p-2 sm:p-4">
      <div className="flex justify-between text-sm sm:text-reset">
        <p>Jumalah<br/>Penumpang</p>
        <div className="ml-2 font-semibold">
          <div className="flex items-center">
            <img src="/images/male.svg" alt="" />
            <p className="ml-2">{passenger.man}</p>
          </div>

          <div className="flex items-center">
            <img src="/images/female.svg" alt="" />
            <p className="ml-2">{passenger.woman}</p>
          </div>
        </div>
      </div>

      <hr className="my-2" />

      <div className="flex justify-between">
        <p>Jumalah Motor</p>
        <div className="flex items-center ml-2 font-semibold">
          <img src="/images/motorcycle.svg" alt="" />
          <p className="ml-2">{passenger.vehicle}</p>
        </div>
      </div>
    </div>
  )
}

export default JumlahPenumpangMotor