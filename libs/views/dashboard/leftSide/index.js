import { useState, useEffect } from 'react';

import SectionMap from './SectionMap';
import SectionCheckpoint from './SectionCheckpoint';
import JumlahPenumpangMotor from './JumlahPenumpangMotor';
import DetilJumlah from './DetilJumlah';
import CardStatus from './CardStatus';
import CardStatistic from './CardStatistic';

import { SpinnerOverlay } from '../../../components/loading'

const LeftSide = ({ maps, trips, checkpoint }) => {

  return (
    <div className="bg-white rounded-xl p-4 mb-4 relative grow">

      {(trips && trips.length > 0) || (checkpoint && checkpoint.length > 0) ? (
        <>
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="flex flex-col gap-3 grow">
              <div className="flex flex-col sm:flex-row gap-3">
                <CardStatistic
                title="Jumlah Penumpang"
                penumpangMudik={0}
                penumpangBalik={0}
                motorMudik={0}
                motorBalik={0}
                />
                <CardStatistic
                title="Jumlah Verifikasi"
                penumpangMudik={0}
                penumpangBalik={0}
                motorMudik={0}
                motorBalik={0}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <SectionMap maps={maps} />
                <div className="border-2 border-gray-400 rounded-lg p-3 overflow-y-auto h-[272px]">
                  {trips.map((e,i) => (
                    <DetilJumlah
                      key={i}
                      trip={e.trip.city.name}
                      bus={[e.bus_count, e.passenger_man_count, e.passenger_woman_count, 0, ]}
                      truck={[e.truck_count, 0, 0, e.vehicle_count, ]} />
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-[27%] pt-6">
              <CardStatus
                judul="Status Bus"
                perjalanan="0"
                istirahat="0"
                butuhBantuan="0"
                tiba="0"
              />

              <CardStatus
                judul="Status Truk"
                perjalanan="0"
                istirahat="0"
                butuhBantuan="0"
                tiba="0"
              />
            </div>
          </div>
          <div>
            <SectionCheckpoint checkpoint={checkpoint} />
          </div>
        </>
      ) : (
        <SpinnerOverlay className="text-maincolor" />
      ) }



    </div>
  );
}

export default LeftSide;