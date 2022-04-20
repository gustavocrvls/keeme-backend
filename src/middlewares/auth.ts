/* eslint-disable consistent-return */
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

interface IToken extends JwtPayload {
  id: string;
  profile: string;
}

function verifyToken(profiles: Array<number>) {
  return (req: Request, res: Response, next: () => void): Response | void => {
    const privateKey = process.env.JWT_SECRET || '';

    if (process.env.UNSAFE_MODE) next();

    try {
      if (
        req.headers.authorization &&
        (req.headers.authorization.split(' ')[0] === 'Token' ||
          req.headers.authorization.split(' ')[0] === 'Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, privateKey);
        const { profile } = <IToken>decoded;

        if (profiles.includes(Number(profile))) next();
        else
          return res
            .status(401)
            .json({ auth: false, message: 'Invalid Token.' });
      } else {
        return res
          .status(401)
          .json({ auth: false, message: 'No token provided.' });
      }
    } catch (err: any) {
      return res.status(401).json({ auth: false, message: 'Invalid Token.' });
    }
  };
}

export { verifyToken };
