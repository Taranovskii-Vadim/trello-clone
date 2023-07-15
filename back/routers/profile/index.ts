import { Response, Request, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    res.json({ profile: req.user });
  } catch (e) {
    console.error(e);
  }
});

export default router;
