import { create } from "zustand";

import { Column, State, Status } from "./types";

export const useStore = create<State>((set) => ({
  data: { columns: new Map<Status, Column>() },
  fetchData: async () => {
    const columns = new Map<Status, Column>();

    columns.set("todo", {
      id: "todo",
      notes: [{ id: 1, title: "test", createdAt: "today", status: "todo" }],
    });

    columns.set("inprogress", {
      id: "inprogress",
      notes: [
        { id: 1, title: "test", createdAt: "today", status: "inprogress" },
      ],
    });

    columns.set("done", {
      id: "done",
      notes: [{ id: 1, title: "test", createdAt: "today", status: "done" }],
    });

    set({ data: { columns } });
  },
}));
