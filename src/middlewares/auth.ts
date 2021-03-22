/* eslint-disable consistent-return */
/* eslint-disable func-names */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

interface IToken {
  id: string;
  perfil: string;
  iat: string;
  exp: string;
}

const privateKey = process.env.JWT_SECRET || '';

function verifyToken(perfis: Array<number>) {
  return function (req: Request, res: Response, next: () => void): any {
    if (!process.env.UNSAFE_MODE)
      try {
        if (
          req.headers.authorization &&
          (req.headers.authorization.split(' ')[0] === 'Token' ||
            req.headers.authorization.split(' ')[0] === 'Bearer')
        ) {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, privateKey);
          const { perfil } = <IToken>decoded;

          if (perfis.includes(Number(perfil))) next();
          else
            return res
              .status(401)
              .json({ auth: false, message: 'Invalid Token.' });
        } else {
          return res
            .status(401)
            .json({ auth: false, message: 'No token provided.' });
        }
      } catch (err) {
        return res.status(401).json({ auth: false, message: 'Invalid Token.' });
      }
    else next();
  };
}

// eslint-disable-next-line import/prefer-default-export
export { verifyToken };
