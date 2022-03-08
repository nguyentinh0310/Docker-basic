import { DataStoredInToken } from '@core/interfaces';
import { Logger } from '@core/utils';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let cookies = req.cookies;
  if (cookies && cookies.jwt) {
    const token = cookies && cookies.jwt ? cookies.jwt : req.header('Authorization');
  console.log("cookies: ",cookies)
    if (!token) return res.status(401).json({ message: 'No token, authorization denied.' });

    try {
      const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET ?? '') as DataStoredInToken;
      if (!req.user) req.user = { id: '' };

      req.user.id = user.id;
      next();
    } catch (error: any) {
      Logger.error(`[ERROR] Msg: ${token}`);
      if (error.name === 'TokenExpiredError') {
        res.status(401).json({ message: 'Token is expired' });
      } else {
        res.status(401).json({ message: 'Token is not valid' });
      }
    }
  }
};

export default authMiddleware;
