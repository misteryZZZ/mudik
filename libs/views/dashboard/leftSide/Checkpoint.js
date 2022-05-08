import React from 'react'

const Checkpoint = ({ judul, progres, rute, reverseRute }) => {
  let renderRute = [...rute];
  if (reverseRute) renderRute.reverse();
  return (
    <div className="flex items-center py-4 border-b">
      <h2 className="font-semibold text-orange whitespace-nowrap leading-3">
        {judul}<br/>
        <span className="text-xs font-light">{reverseRute && '(arus balik)'}</span>
      </h2>
      <div className="stepper">
        {renderRute.map((e,i,A) => 
          (e.checkpoint != null) ? (
            <span key={i} className="stepper-item active relative">
            {A[i + 1]?.checkpoint == null && <div className="absolute text-xs -top-4 translate-x-8 border rounded text-gray-400 px-1 w-max">Tiba di {e.name}</div>}
            </span>
          ) : (
            <span key={i} className={`stepper-item ${(i + 1 <= progres) ? 'active' : ''}`}/>
          )
        )}
      </div>
    </div>
  )
}

export default Checkpoint;