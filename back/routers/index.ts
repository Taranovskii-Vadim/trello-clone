import { Router } from 'express';

import noteRouter from './note';
import fileRouter from './file';
import authRouter from './auth';
import profileRouter from './profile';

type Prefix = 'notes' | 'files' | 'auth' | 'profile';

interface AppRouter {
  prefix: Prefix;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: 'notes', router: noteRouter },
  { prefix: 'files', router: fileRouter },
  { prefix: 'profile', router: profileRouter },
  { prefix: 'auth', isAuth: false, router: authRouter },
];
