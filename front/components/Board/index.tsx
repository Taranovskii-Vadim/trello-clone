"use client";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { useStore } from "@/store/board";

import Column from "../Column";

const Board = (): JSX.Element => {
  const { data, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDragEnd = (result: DropResult): void => {};

  return (
    <main>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            >
              {Array.from(data.columns.entries()).map(([id, column], index) => (
                <Column key={id} id={id} data={column.notes} index={index} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
};

export default Board;
