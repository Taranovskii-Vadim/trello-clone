export type DbUser = { id: number; login: string; password: string; avatar: string | null };

export type SignUpDTO = Pick<DbUser, 'login' | 'password'>;

export type SignInDTO = Pick<DbUser, 'login' | 'password'>;
