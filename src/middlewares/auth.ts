import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

interface IToken extends JwtPayload {
  id: string;
  profile: string;
}

//TODO validate user & refresh token
function verifyToken(profiles: Array<number>) {
  return (
    req: Request,
    res: Response,
    next: () => void,
  ): Promise<void> | void => {
    const privateKey = process.env.JWT_SECRET || '';

    try {
      if (
        req.headers.authorization &&
        (req.headers.authorization.split(' ')[0] === 'Token' ||
          req.headers.authorization.split(' ')[0] === 'Bearer')
      ) {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, privateKey);
        const { profile } = <IToken>decoded;

        if (profiles.includes(Number(profile))) {
          next();
        } else {
          res.status(401).json({ auth: false, message: 'Invalid Token.' });
        }
      } else {
        res.status(401).json({ auth: false, message: 'No token provided.' });
      }
    } catch (err: any) {
      res.status(401).json({ auth: false, message: 'Invalid Token.' });
    }
  };
}

export { verifyToken };
