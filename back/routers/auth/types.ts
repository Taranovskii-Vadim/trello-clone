export type User = JWTUser & { password: string };

export type SignUpDTO = Omit<User, 'id'>;

export type SignInDTO = Pick<User, 'login' | 'password'>;
