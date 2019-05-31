/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import flagsService from '../services/FlagsService';
import carsService from '../services/CarsService';
import Validator from '../helpers/ValidateFlag';

class FlagsController {
  reportAdvert(req, res) {
    const { carId, reason, description } = req.body;
    const validator = new Validator();
    const validFlagReq = validator.validateReportAdvertFields(carId, reason, description);
    if (validFlagReq.error) {
      res.status(404).send({
        status: 404,
        error: validFlagReq.data,
      });
    } else if (!carsService.getCarById(parseInt(carId, 10)).exist) {
      res.status(404).send({
        status: 404,
        error: 'Invalid carId. There is no car with this id.',
      });
    } else {
      const report = flagsService.report(carId, reason, description);
      res.status(201).send({
        status: 201,
        data: report,
      });
    }
  }
}

export default new FlagsController();
