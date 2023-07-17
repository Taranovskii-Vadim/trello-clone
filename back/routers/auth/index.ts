import argon from 'argon2';
import jwt from 'jsonwebtoken';
import { Response, Request, Router } from 'express';

import database from '../../db';
import { uploadFile } from '../../middleware';

import { User, SignInDTO, SignUpDTO } from './types';

const router = Router();

const getJWT = (data: JWTUser) => jwt.sign(data, 'AVACATO', { expiresIn: '10h' });

router.post('/signUp/avatar', uploadFile, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    res.json({ filename: req.file.filename });
  } catch (e) {
    console.error(e);
  }
});

router.post('/signUp', async ({ body }: Request<any, any, SignUpDTO>, res: Response) => {
  try {
    const { login, password, avatar } = body;

    const hashedPassword = await argon.hash(password);

    const { rows } = await database.query(
      'INSERT INTO users(login, password, avatar) VALUES ($1, $2, $3) RETURNING id',
      [login, hashedPassword, avatar],
    );

    const token = getJWT({ id: rows[0].id, login, avatar });

    res.json({ token });
  } catch (e) {
    console.error(e);
  }
});

router.post('/signIn', async ({ body }: Request<any, any, SignInDTO>, res: Response) => {
  try {
    const { login, password } = body;

    const { rows } = await database.query<User>('SELECT * FROM users where login=$1', [`${login}`]);

    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!(await argon.verify(user.password, password))) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = getJWT({ id: user.id, login: user.login, avatar: user.avatar });

    res.json({ token });
  } catch (e) {
    console.error(e);
  }
});

export default router;
