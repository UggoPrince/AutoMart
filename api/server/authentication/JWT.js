/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class JWT {
  async verifyToken(sentToken) {
    const token = await jwt.verify(sentToken, `${process.env.tokenSecret}`, (err, decode) => {
      if (err) {
        return { tokenExp: true, error: err };
      }
      return { tokenExp: false, decode };
    });
    return token;
  }

  signToken(data) {
    // const time = Math.floor(Date.now() / 1000) + process.env.tokenTime;
    // console.log(time);
    return jwt.sign(data, `${process.env.tokenSecret}`,
      { expiresIn: process.env.tokenTime });
  }
}

export default new JWT();
