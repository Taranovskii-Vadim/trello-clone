import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { PaperAirplaneIcon, PhotoIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

import { useBoard } from '@/store/board';
import { Status } from '@/store/board/types';

interface Props {
  status: Status;
}

const AddForm = ({ status }: Props): JSX.Element => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleAddNote = useBoard((state) => state.addNote);

  useEffect(() => {
    setPreview(file ? URL.createObjectURL(file) : '');
  }, [file]);

  const handleOpen = (): void => setIsOpen((prev) => !prev);

  const handleAdd = (): void => {
    if (value) {
      handleAddNote({ title: value, status }, file);
      setValue('');
      setFile(undefined);
    }
    setIsOpen(false);
  };

  const handleSetFile = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.files![0];
    if (!value.type.startsWith('image/')) return;

    setFile(value);
  };

  const handleChooseFile = (): void => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const Icon = isOpen ? PaperAirplaneIcon : PlusCircleIcon;

  return (
    <div className={`flex items-center ${isOpen ? 'justify-between' : 'justify-end'}`}>
      {isOpen ? (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-1 px-2 mr-2"
          />
          <input hidden type="file" ref={fileRef} onChange={handleSetFile} />
          {!preview ? (
            <button className="text-green-500 hover:text-green-600" onClick={handleChooseFile}>
              <PhotoIcon className="h-8 w-8" />
            </button>
          ) : (
            <img className="h-8 w-8 rounded-md" src={preview} onClick={() => setFile(undefined)} />
          )}
        </>
      ) : null}
      <button className="text-green-500 hover:text-green-600 ml-2" onClick={isOpen ? handleAdd : handleOpen}>
        <Icon className="h-8 w-8" />
      </button>
    </div>
  );
};

export default AddForm;
