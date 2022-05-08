import { useState } from 'react'

import Checkpoint from './Checkpoint';
import { Search } from '../../../components/input'
import { ButtonSort } from '../../../components/button'

const SectionCheckpoint = ({ checkpoint }) => {
  const [filterCheckpont, setFilterCheckPoint] = useState('')

  const handleSearchChange = (e) => {
    setFilterCheckPoint(e.target.value);
  }

  return (
    <>
      <div className="flex items-center gap-3 border-b">
        <h1 className="text-2xl text-maincolor">Bus Checkpoint</h1>
        <Search onChange={handleSearchChange} />
        <ButtonSort className="hidden md:flex" />
      </div>

      <div className="overflow-auto max-h-[340px]">
        {checkpoint
          .filter(e => e.bus.name.toLowerCase().includes(filterCheckpont.toLowerCase()))
          .map((e,i) => (
          <Checkpoint key={i} judul={e.bus.name} progres={0} rute={e.rute} reverseRute={e.bus.status == 'end'}/>
        ))}
      </div>
    </>
  )
}

export default SectionCheckpoint;