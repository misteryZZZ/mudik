import React from 'react'

const Checkpoint = ({ judul, progres }) => (
  <div className="flex items-center py-4 border-b">
    <h2 className="font-semibold text-orange whitespace-nowrap">{judul}</h2>
    <div className="stepper">
      {([...new Array(8)]).map((e,i) => 
        (i + 1 == progres) ? (
          <span key={i} className="stepper-item active relative">
            <div className="absolute text-xs -top-4 translate-x-8 border rounded text-gray-400 px-1 w-max">Tiba di KM 02</div>
          </span>
        ) : (
          <span key={i} className={`stepper-item ${(i + 1 <= progres) ? 'active' : ''}`}/>
        )
      )}
    </div>
  </div>
)

export default Checkpoint;