'use client';

import React from 'react';
import UserSpace from './UserSpace';
import { useAuth } from '@clerk/nextjs';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import QuickAdd from './QuickAdd';

function Header() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className='flex h-20 items-center justify-between bg-secondary px-10 text-white'>
      <div className='logo'>Logo</div>
      <div className='flex items-center gap-2'>
        <UserSpace />
        <QuickAdd />
      </div>
    </div>
  );
}

export default Header;
