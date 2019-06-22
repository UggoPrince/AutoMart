/* eslint-disable linebreak-style */
import Validator from './validators/ValidateFlag';
import FlagChecker from './database_checkers/FlagChecker';

const validateReportAdvert = async (req, res, next) => {
  const { carId, reason, description } = req.body;
  const result = Validator.validateReportAdvertFields(carId, reason, description);
  if (result.error) {
    res.status(400).send({
      status: 400,
      error: Validator.Response(),
    });
  } else if (!await FlagChecker.checkFlaggedCar(carId)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${carId}) does not exist.`,
    });
  } else {
    next();
  }
};

export default validateReportAdvert;
