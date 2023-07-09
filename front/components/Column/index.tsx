import { Note, Status } from '@/store/board/types';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

import { useModal } from '@/store/modal';

import Card from '../Card';

interface Props {
  id: Status;
  data: Note[];
  index: number;
}

const Column = ({ id, index, data }: Props): JSX.Element => {
  const openModal = useModal((state) => state.openModal);

  return (
    <Draggable draggableId={id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <div {...dragHandleProps} {...draggableProps} ref={innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {({ droppableProps, placeholder, innerRef }, { isDraggingOver }) => {
              const color = isDraggingOver ? 'bg-green-200' : 'bg-white/50';

              return (
                <div {...droppableProps} ref={innerRef} className={`py-3 px-4 rounded-2xl shadow-sm ${color}`}>
                  <h2 className="flex mb-2 justify-between font-bold text-xl">
                    {id}
                    <span className="text-gray-500 text-sm font-normal">{data.length}</span>
                  </h2>
                  <div className="space-y-2">
                    {data.map((item, index) => (
                      <Draggable key={item.id} index={index} draggableId={item.id.toString()}>
                        {(provided) => <Card data={item} {...provided} />}
                      </Draggable>
                    ))}
                    {placeholder}
                    <div className="flex items-end justify-end">
                      <button className="text-green-500 hover:text-green-600" onClick={openModal}>
                        <PlusCircleIcon className="h-10 w-10" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
