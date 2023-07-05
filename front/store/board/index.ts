import { create } from "zustand";

import { Column, State, Status } from "./types";

export const useStore = create<State>((set) => ({
  data: { columns: new Map<Status, Column>() },
  fetchData: async () => {
    const columns = new Map<Status, Column>();

    columns.set("todo", {
      id: "todo",
      notes: [
        { id: 1, title: "first todo", createdAt: "today", status: "todo" },
        { id: 6, title: "second todo", createdAt: "today", status: "done" },
      ],
    });

    columns.set("inprogress", {
      id: "inprogress",
      notes: [
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
    });

    columns.set("done", {
      id: "done",
      notes: [
        { id: 3, title: "first done", createdAt: "today", status: "done" },
        { id: 4, title: "second done", createdAt: "today", status: "done" },
      ],
    });

    set({ data: { columns } });
  },
  setState(data) {
    set({ data });
  },
}));
