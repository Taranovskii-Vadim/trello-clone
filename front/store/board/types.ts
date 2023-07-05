export type Status = "todo" | "inprogress" | "done";

export type Note = {
  id: number;
  title: string;
  status: Status;
  image?: string;
  createdAt: string;
};

// TODO maybe refactor types later and stucture
export type Column = { id: Status; notes: Note[] };

export type State = {
  data: { columns: Map<Status, Column> };
  fetchData: () => Promise<void>;
};