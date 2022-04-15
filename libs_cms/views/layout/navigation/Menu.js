import React from 'react';
import Link from 'next/link';

export const Wrapper = ({ children }) => (
  <ul className="menu">{children}</ul>
);

export const Trip = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Trip</p>
      </div>
    </Link>
  </li>
);

export const Bus = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/bus">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Bus</p>
      </div>
    </Link>
  </li>
);

export const Truck = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/truck">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Truck</p>
      </div>
    </Link>
  </li>
);

export const City = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/city">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">City</p>
      </div>
    </Link>
  </li>
);

export const Driver = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/driver">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Driver</p>
      </div>
    </Link>
  </li>
);

export const LO = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/lo">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">LO</p>
      </div>
    </Link>
  </li>
);

export const Puskemas = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/puskesmas">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Puskemas</p>
      </div>
    </Link>
  </li>
);

export const Banner = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/banner">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Banner</p>
      </div>
    </Link>
  </li>
);

export const Content = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/cms/content">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Content</p>
      </div>
    </Link>
  </li>
);
