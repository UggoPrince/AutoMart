/* eslint-disable class-methods-use-this */
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { errorNoHeader, errorExpiredToken } from '../helpers/errorHandlers';

dotenv.config();

class AuthMiddleware {
  static async verifyToken(sentToken) {
    const token = await JWT.verify(sentToken, `${process.env.tokenSecret}`, (err, decode) => {
      if (err) {
        return { tokenExp: true, error: err };
      }
      return { tokenExp: false, decode };
    });
    return token;
  }

  signToken(data) {
    return JWT.sign(data, `${process.env.tokenSecret}`,
      { expiresIn: process.env.tokenTime });
  }

  async authenticate(req, res, next) {
    const sentToken = req.get('Authorization');
    let token = '';
    if (!sentToken) {
      res.status(401).send(errorNoHeader());
    } else {
      token = sentToken.slice(7, sentToken.length);
      const jwt = await AuthMiddleware.verifyToken(token);
      if (jwt.tokenExp) {
        res.status(401).send(errorExpiredToken());
      } else {
        req.token = jwt.decode;
        next();
      }
    }
  }
}

export default new AuthMiddleware();
