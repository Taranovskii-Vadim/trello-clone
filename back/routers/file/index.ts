import { Router, Request, Response } from 'express';

import uploadFile from '../../middleware/index';

const router = Router();

router.post('/', uploadFile, async (req: Request, res: Response) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    res.json({ filename: req.file.filename });
  } catch (e) {
    // res.status(500).json({
    //   message: `Could not upload the file: ${req.file.originalname}. ${e}`,
    // });
  }
});

export default router;
