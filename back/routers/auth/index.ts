import jwt from 'jsonwebtoken';
import { Response, Request, Router } from 'express';

import { database } from '../../db';

import { DbUser, SignInDTO, SignUpDTO } from './types';

const router = Router();

// login, password, avatar

const getJWT = (data: Omit<DbUser, 'password'>) => jwt.sign(data, 'AVACATO', { expiresIn: '10h' });

router.post('/signUp', async ({ body }: Request<any, any, SignUpDTO>, res: Response) => {
  try {
    const { login, password } = body;

    const { rows } = await database.query('INSERT INTO users(login, password) VALUES ($1, $2) RETURNING id', [
      login,
      password,
    ]);

    const token = getJWT({ id: rows[0].id, login, avatar: null });

    return res.json({ token });
  } catch (e) {
    console.error(e);
  }
});

router.post('/signIn', async ({ body }: Request<any, any, SignInDTO>, res: Response) => {
  try {
    const { login, password } = body;

    const { rows } = await database.query<DbUser>('SELECT * FROM users where login=$1', [`${login}`]);

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // TODO do magic with password hash (bcrypt, argon)

    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = getJWT({ id: user.id, login: user.login, avatar: user.avatar });

    return res.json({ token });
  } catch (e) {
    console.error(e);
  }
});

export default router;
