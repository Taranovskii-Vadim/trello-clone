import noteRouter from './note';
import fileRouter from './file';
import authRouter from './auth';
import profileRouter from './profile';

import { Route } from './types';

export const routers: Route[] = [
  { prefix: 'notes', router: noteRouter },
  { prefix: 'files', router: fileRouter },
  { prefix: 'profile', router: profileRouter },
  { prefix: 'auth', isAuth: false, router: authRouter },
];
