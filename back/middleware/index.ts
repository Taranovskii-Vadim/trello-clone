import util from 'util';
import path from 'path';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

export const uploadFile = util.promisify(multer({ storage: storage, limits: { fileSize: maxSize } }).single('file'));

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies && req.cookies.token;

  if (token) {
    const user = jwt.verify(token, 'AVACATO') as Request['user'];
    req.user = user;
    return next();
  }

  res.status(401).json({ message: 'Session expired' });
};
