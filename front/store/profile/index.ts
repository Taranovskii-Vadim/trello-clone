import { create } from 'zustand';

import { api } from '../api';

import { FetchResponseDTO, State } from './types';

export const useProfile = create<State>((set) => ({
  data: undefined,
  fetchData: async () => {
    try {
      const { data } = await api.get<FetchResponseDTO>('/profile');

      set({ data: data.profile });
    } catch (e) {
      console.error(e);
    }
  },
}));
