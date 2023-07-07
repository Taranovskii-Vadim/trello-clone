import { Router, Request, Response } from 'express';

import { database } from '../../db';

import { Note } from './types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const { rows } = await database.query<Note>('SELECT * FROM note where user_id=$1', [1]);

    res.json({ notes: rows.map(({ user_id, ...others }) => others) });
  } catch (e) {
    console.error(e);
  }
});

export default router;
