import React from 'react'

import * as Button from './Button'

const Header = ({
  title,
  additionalComponent,
  hasMoreButtons
}) => {
  return (
    <header className="flex items-center w-full px-6 py-4">
      <div className="grow flex items-center ml-4">
        <h1 className="text-3xl text-maincolor mr-4">{title}</h1>
        {additionalComponent}
      </div>

      {(hasMoreButtons) && (
        <>
          <Button.Export />
          <Button.Notif />
          <Button.Profile />
          <Button.More />
        </>
      )}
    </header>
  );
}

export default Header;