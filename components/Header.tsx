'use client';

import React from 'react';
import UserSpace from './UserSpace';
import { useAuth } from '@clerk/nextjs';

function Header() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className='flex h-20 items-center justify-between bg-black px-10 text-white'>
      <div className='logo'>Logo</div>
      <div className=''>
        <UserSpace />
      </div>
    </div>
  );
}

export default Header;
