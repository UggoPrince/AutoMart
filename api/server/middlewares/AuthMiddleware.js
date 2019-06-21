/* eslint-disable linebreak-style */
import JWT from '../authentication/JWT';
import { errorNoHeader, errorExpiredToken } from '../helpers/errorHandlers';

const authenticate = async (req, res, next) => {
  const sentToken = req.get('Authentication');
  if (!sentToken) {
    res.status(401).send(errorNoHeader());
  } else {
    const jwt = await JWT.verifyToken(sentToken);
    if (jwt.tokenExp) {
      res.status(401).send(errorExpiredToken());
    } else {
      req.token = jwt.decode;
      next();
    }
  }
};

export default authenticate;
