export type DbUser = { id: number; login: string; password: string; avatar: string | null };

export type SignUpDTO = Omit<DbUser, 'id'>;

export type SignInDTO = Pick<DbUser, 'login' | 'password'>;
