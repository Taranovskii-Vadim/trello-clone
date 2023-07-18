import { create } from 'zustand';

import api from '../api';

import { State } from './types';

export const useAuth = create<State>((set) => ({
  isAuth: !!localStorage.getItem('token'),
  logout: () => {
    localStorage.removeItem('token');

    set({ isAuth: false });
  },
  signIn: async (login, password) => {
    try {
      const { data } = await api.post<{ token: string }>('/auth/signIn', { login, password });

      api.defaults.headers.common = { Authorization: data.token };

      localStorage.setItem('token', data.token);

      set({ isAuth: true });
    } catch (e) {
      console.error(e);
    }
  },
  signUp: async (login, password, file) => {
    try {
      let avatar: string | null = null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        avatar = (await api.post<{ filename: string }>('/auth/signUp/avatar', formData)).data.filename;
      }

      const { data } = await api.post<{ token: string }>('/auth/signUp', { login, password, avatar });

      api.defaults.headers.common = { Authorization: data.token };

      localStorage.setItem('token', data.token);

      set({ isAuth: true });
    } catch (e) {
      console.error(e);
    }
  },
}));
