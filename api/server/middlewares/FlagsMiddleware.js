/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Validator from './validators/ValidateFlag';
import FlagChecker from './database_checkers/FlagChecker';

const validateReportAdvert = async (req, res, next) => {
  const { car_id, reason, description } = req.body;
  const result = Validator.validateReportAdvertFields(car_id, reason, description);
  if (result.error) {
    res.status(400).send({
      status: 400,
      error: Validator.Response(),
    });
  } else if (!await FlagChecker.checkFlaggedCar(car_id)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${car_id}) does not exist.`,
    });
  } else {
    next();
  }
};

export default validateReportAdvert;
