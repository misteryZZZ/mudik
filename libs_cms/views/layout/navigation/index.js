import { useState, useRef } from 'react'

import Brand from './Brand'
import Hamburger from './Hamburger'
import * as Menu from './Menu'

const Navigation = ({ menuActive }) => {
  const [expanded, setExpanded] = useState(false);

  const nav = useRef()

  const expand = () => {
    setExpanded(true);
    nav.current.focus();
  }
  const close = () => {
    setExpanded(false);
  }

  return (
    <>
      <Hamburger onClick={expand} />
      <nav className={`bg-maincolor text-white h-[100vh] fixed top-0 left-0 -translate-x-full lg:translate-x-0 transition z-10 ${expanded ? '!translate-x-0' : ''}`} tabIndex="0" ref={nav} onBlur={close}>
        <Brand />

        <Menu.Wrapper>
          <Menu.Trip active={menuActive === 'trip'} />
          <Menu.Bus active={menuActive === 'bus'} />
          <Menu.Truck active={menuActive === 'truck'} />
          <Menu.City active={menuActive === 'city'} />
          <Menu.Driver active={menuActive === 'driver'} />
          <Menu.LO active={menuActive === 'lo'} />
          <Menu.Banner active={menuActive === 'banner'} />
          <Menu.Content active={menuActive === 'content'} />
        </Menu.Wrapper>
      </nav>
    </>
  );
}

export default Navigation;