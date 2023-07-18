import { create } from 'zustand';

import api from '../api';

import { Board, State, FetchResponseDTO, PatchResponseDTO, PostResponseDTO, Note } from './types';

let HASH: Board;

export const useBoard = create<State>((set, get) => ({
  state: { todo: [], inprogress: [], done: [] },
  searchNote: (value) => {
    if (HASH) {
      const filtered = Object.entries(HASH).map((item) => [
        item[0],
        item[1].filter((note) => note.title.toLowerCase().startsWith(value.toLowerCase())),
      ]);

      set({ state: Object.fromEntries(filtered) });
    }
  },
  deleteNote: async (id, status) => {
    try {
      await api.delete(`/notes/${id}`);

      HASH[status] = HASH[status].filter((item) => item.id !== id);

      set({ state: HASH });
    } catch (e) {
      console.error(e);
    }
  },
  addNote: async (noteConfig, file) => {
    try {
      let image: Note['image'] = null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        image = (await api.post<{ filename: string }>('/files', formData)).data.filename;
      }

      const { data } = await api.post<PostResponseDTO>('/notes', { ...noteConfig, image });

      HASH[noteConfig.status].push({ ...data.note, image: file ? URL.createObjectURL(file) : null });

      set({ state: HASH });
    } catch (e) {
      console.error(e);
    }
  },
  fetchNotes: async () => {
    try {
      const { data } = await api.get<FetchResponseDTO>('/notes');

      const dataWithImages = await Promise.all(
        data.notes.map(async (item) => {
          if (!item.image) return item;

          const response = await api.get(`/files/${item.image}`, { responseType: 'blob' });

          return { ...item, image: URL.createObjectURL(response.data) };
        }),
      );

      HASH = dataWithImages.reduce(
        (acc: Board, item) => {
          acc[item.status] = [...acc[item.status], item];

          return acc;
        },
        { todo: [], inprogress: [], done: [] } as Board,
      );

      set({ state: HASH });
    } catch (e) {
      console.error(e);
    }
  },
  dragAndDropData: async ({ destination, source, type }) => {
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
        const { data } = await api.patch<PatchResponseDTO>(`/notes/${moved.id}`, { status: finish[0] });

        finishNotes.splice(destination.index, 0, { ...moved, status: data.status });

        set({
          state: { ...state, [start[0]]: startNotes, [finish[0]]: finishNotes },
        });
      }
    }
  },
}));
