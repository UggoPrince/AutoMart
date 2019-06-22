/* eslint-disable linebreak-style */
import Validator from './validators/ValidateCar';
import CarChecker from './database_checkers/CarChecker';

export const validateCreateAdvert = async (req, res, next) => {
  const {
    state, status, price, title, manufacturer, model, bodyType,
  } = req.body;
  const myPhoto = req.files;
  const result = Validator.validateCreateAdvertFields(
    state, status, price, title, manufacturer, model, bodyType, myPhoto,
  );
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    req.body.owner = req.token.id;
    req.body.email = req.token.email;
    next();
  }
};

export const validateUpdateCarStatus = async (req, res, next) => {
  const { newStatus } = req.body;
  const carId = req.params.car_id;
  const result = Validator.validateUpdateCarStatusFields(carId, newStatus);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!await CarChecker.checkId(carId)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${carId}) does not exist.`,
    });
  } else {
    req.body.email = req.token.email;
    next();
  }
};

export const validateUpdateCarPrice = async (req, res, next) => {
  const { newPrice } = req.body;
  const carId = req.params.car_id;
  const result = Validator.validatUpdateCarPriceFields(carId, newPrice);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!await CarChecker.checkId(carId)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${carId}) does not exist.`,
    });
  } else {
    req.body.email = req.token.email;
    next();
  }
};

export const validateViewACar = async (req, res, next) => {
  const carId = req.params.car_id;
  const result = Validator.validateViewSpecficCarParams(carId);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!await CarChecker.checkId(carId)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${carId}) do not exist.`,
    });
  } else {
    next();
  }
};

export const validateViewCars = (req, res, next) => {
  const rQuery = req.query;
  const qLength = Object.keys(req.query).length;
  const isZero = qLength === 0;
  const isOne = qLength > 0 && qLength === 1;
  const isTwo = qLength > 0 && qLength === 2;
  const isThree = qLength > 0 && qLength === 3;
  if (isZero) {
    if (!req.token.isAdmin) {
      res.status(403).send({
        status: 403,
        error: 'You are not an admin. Only admins are allowed to view both sold and unsold cars.',
      });
    } else {
      req.qLength = 0;
      next();
    }
  } else if (isOne) {
    const result = Validator.validateViewUnsoldCarsQuery(rQuery.status);
    if (result.error) {
      res.status(400).send(Validator.Response());
    } else {
      req.qLength = 1;
      next();
    }
  } else if (isTwo) {
    if (rQuery.status && rQuery.state) {
      const result = Validator.validateViewUnsoldNewCars(rQuery.status, rQuery.state);
      if (result.error) {
        res.status(400).send(Validator.Response());
      } else {
        req.qLength = 2;
        next();
      }
    } else if (rQuery.status && rQuery.manufacturer) {
      const result = Validator.validateViewUnsoldCarsByManufacturer(
        rQuery.status, rQuery.manufacturer,
      );
      if (result.error) {
        res.status(400).send(Validator.Response());
      } else {
        req.qLength = 2;
        next();
      }
    } else res.status(400).send({ status: 400, error: 'The query string (with its value) is not valid.' });
  } else if (isThree && rQuery.min_price && rQuery.max_price) {
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

export const validateDeleteCar = async (req, res, next) => {
  const carId = req.params.car_id;
  const result = Validator.validateDeleteACarParams(carId);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!req.token.isAdmin) {
    res.status(403).send({
      status: 403, error: 'You are not an admin. Only admin are allowed to delete an Advert',
    });
  } else if (!await CarChecker.checkId(carId)) {
    res.status(404).send({ status: 404, error: `Car with id (${carId}) does not exist.` });
  } else {
    next();
  }
};
