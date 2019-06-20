/* eslint-disable linebreak-style */
import Validator from './validators/ValidateCar';

export const validateCreateAdvert = (req, res, next) => {
  const {
    owner, state, status, price, title, manufacturer, model, bodyType,
  } = req.body;
  const myPhoto = req.files;
  const result = Validator.validateCreateAdvertFields(
    owner, state, status, price, title, manufacturer, model, bodyType, myPhoto,
  );
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export const validateUpdateCarStatus = (req, res, next) => {
  const { newStatus } = req.body;
  const carId = req.params.car_id;
  const result = Validator.validateUpdateCarStatusFields(carId, newStatus);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};
