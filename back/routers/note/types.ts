export type Note = {
  id: number;
  title: string;
  user_id: number;
  image: string | null;
  status: 'todo' | 'inprogress' | 'done';
};
