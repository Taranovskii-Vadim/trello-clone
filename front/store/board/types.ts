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
  fetchData: () => Promise<void>;
  searchData: (value: string) => void;
  dragAndDropData: (value: DropResult) => void;
};

export type FetchResponseDTO = {
  notes: {
    id: number;
    title: string;
    image: string | null;
    status: 'todo' | 'inprogress' | 'done';
  }[];
};
