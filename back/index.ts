import express, { json } from 'express';
import cors from 'cors';

import { routers } from './routers';
// import { authMiddleWare } from './middlewares';

const PORT = process.env.PORT || 3001;

export const server = express();

server.use(json());
server.use(cors({ origin: 'http://localhost:3000' }));

routers.forEach(({ prefix, router, isAuth = true }) => {
  const completedPrefix = `/api/${prefix}`;

  //   if (isAuth) {
  //     server.use(completedPrefix, authMiddleWare, router);
  //   } else {
  //     server.use(completedPrefix, router);
  //   }
  server.use(completedPrefix, router);
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
