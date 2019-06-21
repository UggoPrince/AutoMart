/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Flags from '../models/Flags';

class FlagsController {
  async reportAdvert(req, res) {
    const result = await Flags.report(req.body);
    res.status(201).send({
      status: 201,
      data: result.rows[0],
    });
  }
}

export default new FlagsController();
