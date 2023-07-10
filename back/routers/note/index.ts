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

router.post('/', async (req: Request<any, any, Omit<Note, 'id' | 'user_id'>>, res: Response) => {
  try {
    const title = req.body.title;
    const image = req.body.image;
    const status = req.body.status;

    const { rows } = await database.query<Note>(
      'INSERT INTO note(title, status, image, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, status, image, 1],
    );

    res.json({ note: { id: rows[0].id, title, status } });
  } catch (e) {
    console.error(e);
  }
});

router.patch('/', async (req: Request<any, any, { status: Note['status'] }, { id: string }>, res: Response) => {
  try {
    await database.query('UPDATE note SET status=$1 WHERE id=$2', [req.body.status, req.query.id]);

    res.json({ status: req.body.status });
  } catch (e) {
    console.error(e);
  }
});

router.delete('/', async (req: Request<any, any, any, { id: string }>, res: Response) => {
  try {
    await database.query('DELETE FROM note where id=$1', [req.query.id]);
    res.json();
  } catch (e) {
    console.error(e);
  }
});

export default router;
