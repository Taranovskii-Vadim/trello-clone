import fs from 'fs';
import path from 'path';
import { Request, Router, Response } from 'express';

import database from '../../db';

import { Note, CreateDTO, PatchDTO } from './types';

const router = Router();

router.get('/', async ({ user }: Request, res: Response) => {
  try {
    const { rows } = await database.query<Note>('SELECT * FROM notes where user_id=$1', [user.id]);

    res.json({ notes: rows.map(({ user_id, ...others }) => others) });
  } catch (e) {
    console.error(e);
  }
});

router.post('/', async ({ body, user }: Request<any, any, CreateDTO>, res: Response) => {
  try {
    const title = body.title;
    const image = body.image;
    const status = body.status;

    const { rows } = await database.query<Pick<Note, 'id'>>(
      'INSERT INTO notes(title, status, image, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, status, image, user.id],
    );

    res.json({ note: { id: rows[0].id, title, status } });
  } catch (e) {
    console.error(e);
  }
});

router.patch('/:id', async ({ body, params }: Request<{ id: string }, any, PatchDTO>, res: Response) => {
  try {
    await database.query('UPDATE notes SET status=$1 WHERE id=$2', [body.status, params.id]);

    res.json({ status: body.status });
  } catch (e) {
    console.error(e);
  }
});

router.delete('/:id', async ({ params: { id } }: Request<{ id: string }>, res: Response) => {
  try {
    const { rows } = await database.query<Pick<Note, 'image'>>('DELETE FROM notes where id=$1 RETURNING image', [id]);
    const image = rows[0].image;

    if (image) {
      fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', image), (err) => {
        if (err) throw err;
      });
    }

    res.json();
  } catch (e) {
    console.error(e);
  }
});

export default router;
