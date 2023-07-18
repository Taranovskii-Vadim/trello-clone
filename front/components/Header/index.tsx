'use client';
import Image from 'next/image';
import { useEffect } from 'react';

import Logo from '@/ui/Logo';

import { useAuth } from '@/store/auth';
import { useProfile } from '@/store/profile';

import Search from '../Search';
import { EMPTY_AVATAR } from '../constants';

const Header = (): JSX.Element => {
  const { data, fetchData } = useProfile();
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <header className="px-6 md:px-4 py-4 md:py-2 mb-6 flex flex-col md:flex-row items-center">
      <Logo />
      <div className="flex items-center space-x-5 flex-1 justify-end w-full">
        <Search />
        <Image
          width={40}
          height={40}
          alt="user avatar"
          onClick={() => logout()}
          src={data?.avatar || EMPTY_AVATAR}
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
