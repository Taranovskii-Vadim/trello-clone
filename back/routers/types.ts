import { Router } from 'express';

type Prefix = 'notes' | 'files' | 'auth' | 'profile';

export type Route = { prefix: Prefix; router: Router; isAuth?: boolean };
