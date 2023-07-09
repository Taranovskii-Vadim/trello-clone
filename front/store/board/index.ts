import axios from 'axios';
import { create } from 'zustand';

import { Board, State, FetchResponseDTO } from './types';

const axiosInstance = axios.create({ baseURL: 'http://localhost:3001/api' });

let HASH: Board;

export const useStore = create<State>((set, get) => ({
  state: { todo: [], inprogress: [], done: [] },
  fetchData: async () => {
    const { data } = await axiosInstance.get<FetchResponseDTO>('/notes');

    HASH = data.notes.reduce(
      (acc: Board, item) => {
        acc[item.status] = [...acc[item.status], item];

        return acc;
      },
      { todo: [], inprogress: [], done: [] } as Board,
    );

    set({ state: HASH });
  },
  searchData: (value) => {
    if (HASH) {
      const filtered = Object.entries(HASH).map((item) => [
        item[0],
        item[1].filter((note) => note.title.toLowerCase().startsWith(value.toLowerCase())),
      ]);

      set({ state: Object.fromEntries(filtered) });
    }
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
