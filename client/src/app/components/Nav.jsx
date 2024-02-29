"use client"
import { useState } from 'react';
import Link from 'next/link';

const Nav = () => {
  return (
    <nav className='flex justify-between items-center'>
      <div className="logo font-oswald-title mx-5 mt-4">
        <span className="text-[#4F96FB]">Net</span>
        <span className="text-black">Guardian</span>
      </div>
    </nav>
  );
};

export default Nav;
