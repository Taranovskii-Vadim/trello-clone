export type Profile = { id: number; login: string; avatar: string | null };

export type FetchResponseDTO = { profile: Profile };

export type State = {
  data: Profile | undefined;
  fetchData: () => Promise<void>;
};
