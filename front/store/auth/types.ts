export type State = {
  isAuth: boolean;
  logout: () => void;
  signIn: (login: string, password: string) => Promise<void>;
  signUp: (login: string, password: string, avatar: File | undefined) => Promise<void>;
};
