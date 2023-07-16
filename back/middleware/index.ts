import util from 'util';
import path from 'path';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const fileSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}.${file.mimetype.split('/')[1]}`);
  },
});

export const uploadFile = util.promisify(multer({ storage, limits: { fileSize } }).single('file'));

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) throw new Error('JWT token is not defined');

    const { exp, iat, ...user } = jwt.verify(token, 'AVACATO') as { exp: number; iat: number } & Request['user'];
    req.user = user;

    return next();
  } catch (e) {
    res.status(401).json(e);
  }
};
