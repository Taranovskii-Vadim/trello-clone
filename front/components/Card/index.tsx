'use client';
import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

import { useStore } from '@/store/board';
import { Note } from '@/store/board/types';

interface Props {
  data: Note;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const Card = ({ data, innerRef, dragHandleProps, draggableProps }: Props): JSX.Element => {
  const handleDelete = useStore((state) => state.deleteNote);

  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-start p-5">
        <p>{data.title}</p>
        <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(data.id, data.status)}>
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {data.image ? (
        <div className="h-full w-full rounded-b-md">
          <Image
            width={400}
            height={200}
            src={data.image}
            alt="note image"
            className="w-full object-contain rounded-b-md"
          />
        </div>
      ) : null}
    </div>
  );
};

export default Card;
