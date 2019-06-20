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

export const validateUpdateCarPrice = (req, res, next) => {
  const { newPrice } = req.body;
  const carId = req.params.car_id;
  const result = Validator.validatUpdateCarPriceFields(carId, newPrice);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export const validateViewACar = (req, res, next) => {
  const carId = req.params.car_id;
  const result = Validator.validateViewSpecficCarParams(carId);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export const validateViewCars = (req, res, next) => {
  const rQuery = req.query;
  const qLength = Object.keys(req.query).length;
  const isOne = qLength > 0 && qLength === 1;
  const isThree = qLength > 0 && qLength === 3;
  if (isOne) {
    const result = Validator.validateViewUnsoldCarsQuery(rQuery.status);
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      req.qLength = 1;
      next();
    }
  } else if (isThree) {
    const result = Validator.validateViewUnsoldCarsInPriceRange(
      rQuery.status, rQuery.min_price, rQuery.max_price,
    );
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      req.qLength = 3;
      next();
    }
  } else {
    res.status(400).send({
      status: 400,
      error: 'The query string (with its value) is not valid.',
    });
  }
};
