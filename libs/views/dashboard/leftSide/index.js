import { useState, useEffect } from 'react';

import SectionMap from './SectionMap';
import SectionCheckpoint from './SectionCheckpoint';
// import JumlahPenumpangMotor from './JumlahPenumpangMotor';
import SectionStatus from './status';
import DetilJumlah from './DetilJumlah';
import Statistic from './Statistic';

import { SpinnerOverlay } from '../../../components/loading'

const LeftSide = ({ maps, trips, checkpoint, status, scaned }) => {

  return (
    <div className="bg-white rounded-xl p-4 mb-4 relative grow">

      {(trips && trips.length > 0) && (checkpoint && checkpoint.length > 0) ? (
        <>
          <div className="flex flex-col md:flex-row gap-3 mb-3">
            <div className="flex flex-col gap-3 grow">
              <div className="flex flex-col sm:flex-row gap-3">
                <Statistic />
              </div>
              <p className="font-semibold text-lg text-maincolor tracking-widest">Total scan e-ticket: {scaned}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <SectionMap maps={maps} />
                <div className="w-px md:h-[272px]" />
                {/*<div className="border-2 border-gray-400 rounded-lg p-3 overflow-y-auto h-[272px]">
                  {trips.map((e,i) => (
                    <DetilJumlah
                      key={i}
                      trip={e.name}
                      bus={[e.bus, e.man, e.woman, 0]}
                      truck={[e.truck, 0, 0, e.vehicle]} />
                  ))}
                </div>*/}
              </div>
            </div>
            <SectionStatus />
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