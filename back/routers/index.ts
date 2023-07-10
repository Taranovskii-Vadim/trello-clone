import { Router } from 'express';

import noteRouter from './note';
import fileRouter from './file';

type Prefix = 'notes' | 'files';

interface AppRouter {
  prefix: Prefix;
  router: Router;
  isAuth?: boolean;
}

export const routers: AppRouter[] = [
  { prefix: 'notes', router: noteRouter },
  { prefix: 'files', router: fileRouter },
];
