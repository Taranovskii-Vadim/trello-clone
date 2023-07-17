import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', async ({ user }: Request, res: Response) => {
  try {
    res.json({ profile: user });
  } catch (e) {
    console.error(e);
  }
});

export default router;
