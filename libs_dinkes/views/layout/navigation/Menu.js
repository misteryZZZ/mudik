import React from 'react';
import Link from 'next/link';

export const Wrapper = ({ children }) => (
  <ul className="menu">{children}</ul>
);

export const Dashboard = ({ active }) => (
  <li className={active ? 'active' : null}>
    <Link href="/dinkes">
      <div className="flex items-center relative px-6 py-3 hover:bg-white/10 cursor-pointer">
        <p className="ml-4">Dashboard</p>
      </div>
    </Link>
  </li>
);