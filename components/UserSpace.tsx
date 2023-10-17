'use client';

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Image from 'next/image';
import { Separator } from './ui/separator';
import { SignOutButton, useUser } from '@clerk/nextjs';

function UserSpace() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log(user, 'this is user');

  if (!isLoaded) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center gap-2 p-2'>
        <div className='relative h-8 w-8 rounded-md border-2 border-accent'>
          <Image
            src={user?.imageUrl as string}
            alt='User'
            height={50}
            width={50}
            className='rounded-md object-cover'
          />
        </div>
        <span className=''>Account</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='mr-2 w-[200px] rounded-md border border-accent bg-secondary p-0 text-sm'>
        <DropdownMenuGroup className='bg-accent px-2 py-4'>
          <span className=''>{user?.fullName}</span>
        </DropdownMenuGroup>
        <Separator className='bg-secondary' />
        <DropdownMenuItem className='cursor-pointer p-2'>
          Settings
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className='cursor-pointer p-2'>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserSpace;
