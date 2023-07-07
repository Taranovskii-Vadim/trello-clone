import { create } from "zustand";

import { Board, State } from "./types";

export const useStore = create<State>((set, get) => ({
  state: { todo: [], inprogress: [], done: [] },
  fetchData: async () => {
    const state: Board = {
      todo: [
        { id: 1, title: "first todo", createdAt: "today", status: "todo" },
        { id: 6, title: "second todo", createdAt: "today", status: "done" },
      ],
      inprogress: [
        {
          id: 2,
          title: "first inprogress",
          createdAt: "today",
          status: "inprogress",
        },
        {
          id: 5,
          title: "second inprogress",
          createdAt: "today",
          status: "done",
        },
      ],
      done: [
        { id: 3, title: "first done", createdAt: "today", status: "done" },
        { id: 4, title: "second done", createdAt: "today", status: "done" },
      ],
    };

    set({ state });
  },
  dragAndDropData: ({ destination, source, type }) => {
    if (!destination) return;

    const { state } = get();
    const entries = Object.entries(state);

    if (type === "column") {
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      set({ state: Object.fromEntries(entries) as Board });
    }

    if (type === "card") {
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
