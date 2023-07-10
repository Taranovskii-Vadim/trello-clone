import { DropResult } from 'react-beautiful-dnd';

export type Status = 'todo' | 'inprogress' | 'done';

export type Note = {
  id: number;
  title: string;
  status: Status;
  image: string | null;
};

export type Board = Record<Status, Note[]>;

export type State = {
  state: Board;
  fetchNotes: () => Promise<void>;
  searchNote: (value: string) => void;
  dragAndDropData: (value: DropResult) => Promise<void>;
  deleteNote: (id: number, status: Status) => Promise<void>;
  addNote: (noteConfig: Pick<Note, 'title' | 'status'>, image?: File) => Promise<void>;
};

export type FetchResponseDTO = {
  notes: {
    id: number;
    title: string;
    image: string | null;
    status: 'todo' | 'inprogress' | 'done';
  }[];
};

export type PostResponseDTO = { note: Omit<Note, 'image'> };

export type PatchResponseDTO = {
  status: Note['status'];
};
