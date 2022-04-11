// import D from 'react-dropdown';
import { useState } from 'react'

export const Dropdown = (props) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const toggle = () => setOpen(!open);
  return(
  /*<D {{props}}
  className="pl-2 cursor-pointer relative"
  placeholderClassName="pr-2 whitespace-nowrap"
  controlClassName="flex items-center"
  menuClassName="bg-white border rounded-md px-4 py-1 absolute -right-3 mt-1.5 shadow-md"
  arrowClosed={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    </svg>
  }
  arrowOpen={
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
    </svg>
  }
  />*/
    <div className="relative">
      <button onClick={toggle} className="flex items-center mx-auto gap-2 whitespace-nowrap">
        {props.placeholder}
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
            <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
          </svg>
        )}
      </button>
      {open && (
      <div className="absolute right-0 top-full bg-white p-2 rounded-lg shadow-md">
        {props.options.map((e,i) => (
          <p key={i} className="whitespace-nowrap">{e}</p>
        ))}
      </div>
      )}
    </div>
  )
}