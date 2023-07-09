import { useState } from 'react';
import { PaperAirplaneIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

import { useStore } from '@/store/board';
import { Status } from '@/store/board/types';

interface Props {
  status: Status;
}

const AddForm = ({ status }: Props): JSX.Element => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const handleAddNote = useStore((state) => state.addNote);

  const handleOpen = (): void => setIsOpen((prev) => !prev);

  const handleAdd = (): void => {
    handleAddNote({ title: value, status });
    setValue('');
    setIsOpen(false);
  };

  const Icon = isOpen ? PaperAirplaneIcon : PlusCircleIcon;

  return (
    <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-end'}`}>
      {isOpen ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-1 px-2 mr-2"
        />
      ) : null}
      <button className="text-green-500 hover:text-green-600" onClick={isOpen ? handleAdd : handleOpen}>
        <Icon className="h-8 w-8" />
      </button>
    </div>
  );
};

export default AddForm;
