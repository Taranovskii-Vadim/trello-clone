import jwt from 'jsonwebtoken';
import { Response, Request, Router } from 'express';

import { database } from '../../db';

import { DbUser, LoginDTO } from './types';

const router = Router();

// 5 min
const maxAge = 300000;
// 1 min
// const maxAge = 60000;

router.post('/', async ({ body }: Request<any, any, LoginDTO>, res: Response) => {
  try {
    const { login, password } = body;

    const { rows } = await database.query('SELECT * FROM users where login=$1', [`${login}`]);

    const user = rows[0] as DbUser | undefined;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO do magic with password hash (bcrypt, argon)

    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, login: user.login } as Request['user'], 'AVACATO', { expiresIn: '10h' });

    return res.json({ token });
  } catch (e) {
    console.error(e);
  }
});

export default router;
