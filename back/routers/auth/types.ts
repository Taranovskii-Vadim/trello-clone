export type DbUser = { id: number; login: string; password: string; avatar: string };

export type LoginDTO = Pick<DbUser, 'login' | 'password'>;
