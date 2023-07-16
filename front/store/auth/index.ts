import { create } from 'zustand';

import api from '../api';

type State = {
  isAuth: boolean;
  logout: () => void;
  signIn: (login: string, password: string) => Promise<void>;
};

export const useAuth = create<State>((set) => ({
  isAuth: !!localStorage.getItem('token'),
  logout: () => {
    localStorage.removeItem('token');

    set({ isAuth: false });
  },
  signIn: async (login, password) => {
    try {
      const { data } = await api.post<{ token: string }>('/auth', { login, password });

      api.defaults.headers.common = { Authorization: data.token };

      localStorage.setItem('token', data.token);

      set({ isAuth: true });
    } catch (e) {
      console.error(e);
    }
  },
}));
