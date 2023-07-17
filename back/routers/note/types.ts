type Status = 'todo' | 'inprogress' | 'done';

export type Note = {
  id: number;
  title: string;
  status: Status;
  user_id: number;
  image: string | null;
};

export type PatchDTO = Pick<Note, 'status'>;
export type CreateDTO = Omit<Note, 'id' | 'user_id'>;
