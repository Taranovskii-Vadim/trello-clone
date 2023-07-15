'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import Logo from '@/ui/Logo';

import { useStore } from '@/store/board';
import { useProfile } from '@/store/profile';

import { useDebounce } from './hooks';

const Header = (): JSX.Element => {
  const { data, fetchData } = useProfile();
  const handleSearch = useStore((state) => state.searchNote);
  const debouncedSearch = useDebounce(handleSearch, 500);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <header className="px-6 md:px-4 py-4 md:py-2 mb-6 flex flex-col md:flex-row items-center">
      <Logo />
      <div className="flex items-center space-x-5 flex-1 justify-end w-full">
        <div className="flex items-center bg-white px-4 rounded-md shadow-md flex-1 md:flex-initial">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="p-2 flex-1"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        <Image
          width={40}
          height={40}
          alt="user avatar"
          src={data?.avatar || ''}
          className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
        />
      </div>
    </header>
  );
};

export default Header;
