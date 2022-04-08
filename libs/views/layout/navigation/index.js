import React from 'react'

import Brand from './Brand'
import * as Menu from './Menu'

const Navigation = ({ menuActive }) => {
  return (
    <nav className="bg-maincolor text-white h-[100vh]">
      <Brand />

      <Menu.Wrapper>
        <Menu.Dashboard active={menuActive === 'dashboard'} />
        <Menu.LiveMap active={menuActive === 'map'} />
        <Menu.DataManifest active={menuActive === 'manifest'} />
        <Menu.Troubleshoot active={menuActive === 'troubleshoot'} />
      </Menu.Wrapper>
    </nav>
  );
}

export default Navigation;