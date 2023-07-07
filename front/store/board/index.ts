import { create } from 'zustand';
import axios from 'axios';

import { Board, State } from './types';

interface ResponseDTO {
  notes: {
    id: number;
    title: string;
    image: string | null;
    status: 'todo' | 'inprogress' | 'done';
  }[];
}

export const useStore = create<State>((set, get) => ({
  state: { todo: [], inprogress: [], done: [] },
  fetchData: async () => {
    const { data } = await axios.get<ResponseDTO>('http://localhost:3001/api/notes');

    const state = data.notes.reduce(
      (acc: Board, item) => {
        acc[item.status] = [...acc[item.status], item];

        return acc;
      },
      { todo: [], inprogress: [], done: [] } as Board,
    );

    set({ state });
  },
  dragAndDropData: ({ destination, source, type }) => {
    if (!destination) return;

    const { state } = get();
    const entries = Object.entries(state);

    if (type === 'column') {
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      set({ state: Object.fromEntries(entries) as Board });
    }

    if (type === 'card') {
      const start = entries[Number(source.droppableId)];
      const finish = entries[Number(destination.droppableId)];

      const startNotes = start[1];
      const finishNotes = finish[1];
      const [moved] = startNotes.splice(source.index, 1);

      if (start[0] === finish[0]) {
        startNotes.splice(destination.index, 0, moved);
        set({ state: { ...state, [start[0]]: startNotes } });
      } else {
        finishNotes.splice(destination.index, 0, moved);

        set({
          state: { ...state, [start[0]]: startNotes, [finish[0]]: finishNotes },
        });
      }
    }
  },
}));
