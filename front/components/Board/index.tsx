'use client';
import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { useBoard } from '@/store/board';
import { Status } from '@/store/board/types';

import Column from '../Column';

const Board = (): JSX.Element => {
  const { state, fetchNotes, dragAndDropData } = useBoard();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <main className="px-6 md:px-4">
      <DragDropContext onDragEnd={dragAndDropData}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {({ innerRef, droppableProps }) => (
            <div {...droppableProps} ref={innerRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {Object.keys(state).map((key, index) => (
                <Column key={key} index={index} id={key as Status} data={state[key as Status]} />
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
};

export default Board;
