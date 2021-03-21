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
            .json({ auth: false, message: 'Invalid Token.' })
            .sendStatus(401);
      } else {
        return res
          .json({ auth: false, message: 'No token provided.' })
          .sendStatus(401);
      }
    } catch (err) {
      return res
        .json({ auth: false, message: 'Invalid Token.' })
        .sendStatus(401);
    }
  };
}

// eslint-disable-next-line import/prefer-default-export
export { verifyToken };
