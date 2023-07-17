import path from 'path';
import { Router, Request, Response } from 'express';

import { uploadFile } from '../../middleware';

const router = Router();

router.post('/', uploadFile, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    res.json({ filename: req.file.filename });
  } catch (e) {
    console.error(e);
  }
});

router.get('/:name', async (req: Request<{ name: string }>, res: Response) => {
  try {
    const filename = req.params.name;
    const directoryPath = path.resolve(__dirname, '..', '..', 'uploads', filename);

    res.download(directoryPath, filename, (e) => {
      if (e) {
        res.status(500).send({ message: 'Could not download the file' + e });
      }
    });
  } catch (e) {
    console.error(e);
  }
});

export default router;
