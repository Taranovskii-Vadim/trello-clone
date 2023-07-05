"use client";
import { Note, Status } from "@/store/board/types";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

interface Props {
  id: Status;
  data: Note;
  index: number;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const Card = ({
  id,
  data,
  index,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props): JSX.Element => {
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-start p-5">
        <p>{data.title}</p>
        <button className="text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {data.image ? <div>image</div> : null}
    </div>
  );
};

export default Card;
