import React from 'react';

import CardSummary from './CardSummary'

import { ButtonSort } from '../../../components/button'

const RightSide = () => {
  return (
    <div className="grow px-4 h-[688px] rounded-2xl">
      <div className="flex justify-between">
        <h1 className="text-2xl text-maincolor mb-4">Summary</h1>
        <ButtonSort className="h-min text-lg text-black !gap-2" text="Tujuan"  />
      </div>

      <div className="h-full overflow-y-auto pr-2">

        {([...new Array(8)]).map((e,i) => (
          <CardSummary key={i} />
        ))}
      </div>
    </div>
  );
}

export default RightSide;