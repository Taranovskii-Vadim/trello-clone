import { Note, Status } from "@/store/board/types";
import { Draggable, Droppable } from "react-beautiful-dnd";

import Card from "../Card";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  id: Status;
  data: Note[];
  index: number;
}

const Column = ({ id, index, data }: Props): JSX.Element => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, { isDraggingOver }) => {
              const color = isDraggingOver ? "bg-green-200" : "bg-white/50";

              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`p-2 rounded-2xl shadow-sm ${color}`}
                >
                  <h2 className="flex justify-between font-bold text-xl">
                    {id}
                    <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                      {data.length}
                    </span>
                  </h2>
                  <div className="space-y-2">
                    {data.map((item, index) => {
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              id={id}
                              data={item}
                              index={index}
                              {...provided}
                            />
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                    <div className="flex items-end justify-end">
                      <button className="text-green-500 hover:text-green-600">
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
