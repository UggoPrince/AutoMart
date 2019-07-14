/* eslint-disable linebreak-style */
import JWT from '../authentication/JWT';
import { errorNoHeader, errorExpiredToken } from '../helpers/errorHandlers';

const authenticate = async (req, res, next) => {
  const sentToken = req.get('Authorization');
  let token = '';
  if (!sentToken) {
    res.status(401).send(errorNoHeader());
  } else {
    token = sentToken.slice(7, sentToken.length);
    const jwt = await JWT.verifyToken(token);
    if (jwt.tokenExp) {
      res.status(401).send(errorExpiredToken());
    } else {
      req.token = jwt.decode;
      next();
    }
  }
};

export default authenticate;
