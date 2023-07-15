export type DbUser = { id: number; login: string; password: string; avatar: string | null };

export type LoginDTO = Pick<DbUser, 'login' | 'password'>;
