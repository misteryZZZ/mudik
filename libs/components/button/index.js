import React from 'react'
import Link from 'next/link'

export const ButtonSort = ({ className, medium, text = 'Sort' }) => {
  return (
    <button className={`
      flex items-center gap-[2px] px-3 bg-white rounded-md border-2  hover:bg-gray-100 text-gray-400
      ${medium ? 'px-4 py-1 text-md' : 'text-sm'}
      ${className}
      `}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
      </svg>
      {text}
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
      </svg>
    </button>
  )
}

export const Button = ({ type, text }) => (
  <button className="bg-orange text-white w-full rounded px-4 py-2">{text}</button>
)

export const ButtonLink = ({ href, text, type }) => (
  <Link href={href}>
    <Button text={text} type={type} />
  </Link>
)