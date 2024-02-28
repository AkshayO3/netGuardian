"use client"
import { useState } from 'react';
import Link from 'next/link';

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogin = () => {
    //
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
  }
  const onSignOut = () => {
    console.log("Signin out")
  }
  return (
    <nav className='flex justify-between items-center'>
      <div className="logo font-oswald-title mx-5 mt-4">
        <span className="text-[#4F96FB]">Net</span>
        <span className="text-black">Guardian</span>
      </div>
      {isLoggedIn ? (
        <Link href="/" className='mr-5 border-black border-solid border-[2px] flex px-4 py-1 mt-4 rounded-full hover:bg-black hover:text-white signin'>
          <button onClick={onSignOut} className='font-outfit font-bold'>Sign Out</button>
        </Link>
      ) : null}
    </nav>
  );
};

export default Nav;
