"use client";
import { useEffect } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

import { useStore } from "@/store/board";

import Column from "../Column";

const Board = (): JSX.Element => {
  const { data, fetchData, setState } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDragEnd = ({ destination, source, type }: DropResult): void => {
    if (!destination) return;

    if (type === "column") {
      const entries = Array.from(data.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const columns = new Map(entries);
      setState({ columns });
    }

    if (type === "card") {
      const copy = Array.from(data.columns);
      const startIndex = copy[Number(source.droppableId)];
      const finishIndex = copy[Number(destination.droppableId)];

      const startCol = { id: startIndex[0], notes: startIndex[1].notes };
      const finishCol = { id: finishIndex[0], notes: finishIndex[1].notes };

      const newNotes = startCol.notes;
      const [moved] = newNotes.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        newNotes.splice(destination.index, 0, moved);

        const newCol = { id: startCol.id, notes: newNotes };

        const columns = new Map(data.columns);
        columns.set(startCol.id, newCol);
        setState({ columns });
      } else {
        const finishNotes = Array.from(finishCol.notes);
        finishNotes.splice(destination.index, 0, moved);

        const newCol = { id: startCol.id, notes: newNotes };
        const columns = new Map(data.columns);

        columns.set(startCol.id, newCol);
        columns.set(finishCol.id, { id: finishCol.id, notes: finishNotes });

        setState({ columns });
      }
    }
  };

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
