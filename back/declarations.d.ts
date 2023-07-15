declare namespace Express {
  interface Request {
    user: { id: number; login: string; avatar: string };
  }
}
