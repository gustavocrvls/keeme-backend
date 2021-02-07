import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { object } from 'yup';

const privateKey = process.env.JWT_SECRET || '';

interface TokenInterface {
  id: string,
  perfil: string,
  iat: string,
  exp: string
}

function verifyToken(perfis: Array<number>) {
  return function (req: Request, res: Response, next: Function) {
    try {
      if (req.headers.authorization &&
        (req.headers.authorization.split(' ')[0] === 'Token' ||
          req.headers.authorization.split(' ')[0] === 'Bearer')
      ) {
        var token = req.headers.authorization.split(' ')[1]
        var decoded = jwt.verify(token, privateKey);
        let { perfil } = <TokenInterface>decoded;

        if (perfis.includes(Number(perfil))) next();
        else return res.json({ auth: false, message: 'Invalid Token.' }).sendStatus(401);

      } else {
        return res.json({ auth: false, message: 'No token provided.' }).sendStatus(401);
      }
    } catch (err) {
      return res.json({ auth: false, message: 'Invalid Token.' }).sendStatus(401);
    }
  }
}

export { verifyToken };
