export type Note = {
  id: number;
  title: string;
  user_id: number;
  image: string | null;
  status: 'todo' | 'inprogress' | 'done';
};

export type CreateDTO = Omit<Note, 'id' | 'user_id'>;

export type PatchDTO = Pick<Note, 'status'>;
