import { Router } from 'express';

import noteRouter from './note';

type Prefix = 'notes' | 'auth' | 'profile';

interface AppRouter {
  prefix: Prefix;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [{ prefix: 'notes', router: noteRouter }];
