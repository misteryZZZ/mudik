import Link from 'next/link'

import * as Button from './Button'

const Header = ({
  title,
  additionalComponent,
  hasMoreButtons,
  user
}) => {
  return (
    <header className="flex items-start w-full pr-6 py-4 pl-12 lg:pl-6">
      <div className="grow flex flex-col md:flex-row gap-y-4 md:items-center ml-4">
        <h1 className="text-3xl text-maincolor mr-4">{title}</h1>
          {additionalComponent}
      </div>

      <div className="flex items-center">
        {(hasMoreButtons) && (
          <>
            {/*<Button.Export />*/}
            {/*<Button.Notif />*/}
            <Button.Profile
              fotoProfile={user.image}
              dropdownContent={
                <div className="p-2">
                  <Link href="/logout">
                    <a className="bg-red-400 text-white rounded block text-center">Logout</a>
                  </Link>
                </div>
              }/>
            {/*<Button.More />*/}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;