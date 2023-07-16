import { create } from 'zustand';

import api from '../api';

import { FetchResponseDTO, State } from './types';

export const useProfile = create<State>((set) => ({
  data: undefined,
  fetchData: async () => {
    try {
      let avatar: string | null = null;
      const { data } = await api.get<FetchResponseDTO>('/profile');

      if (data.profile.avatar) {
        const response = await api.get(`/files/${data.profile.avatar}`, { responseType: 'blob' });
        avatar = URL.createObjectURL(response.data);
      }

      set({ data: { ...data.profile, avatar } });
    } catch (e) {
      console.error(e);
    }
  },
}));
