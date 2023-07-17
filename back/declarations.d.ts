declare type JWTUser = {
  id: number;
  login: string;
  avatar: string | null;
};

declare namespace Express {
  export interface Request {
    user: JWTUser;
  }
}
