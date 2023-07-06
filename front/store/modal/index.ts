import { create } from "zustand";

import { State } from "./types";

export const useModal = create<State>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
