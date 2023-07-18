import { memo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

import { useStore } from '@/store/board';

import { useDebounce } from './hooks';

const Search = (): JSX.Element => {
  const handleSearch = useStore((state) => state.searchNote);
  const debouncedSearch = useDebounce(handleSearch, 100);

  return (
    <div className="flex items-center bg-white px-4 rounded-md shadow-md flex-1 md:flex-initial">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        className="p-2 flex-1"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};

export default memo(Search);
