/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import Validator from './validators/ValidateCar';
import CarChecker from './database_checkers/CarChecker';
import { errorInvalidQueryString } from '../helpers/errorHandlers';

export const validateCreateAdvert = async (req, res, next) => {
  const {
    state, status, price, title, manufacturer, model, body_type,
  } = req.body;
  let car_photo = {};
  if (req.body.img_url) car_photo = { empty: false };
  else if (req.files.img_url) car_photo = { empty: false };
  else car_photo = { empty: true };
  const result = Validator.validateCreateAdvertFields(
    state, status, price, title, manufacturer, model, body_type, car_photo,
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
  const { car_id } = req.params;
  const { status } = req.body.status;
  console.log({ body: req.body });
  const result = Validator.validateUpdateCarStatusFields(car_id, status);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!await CarChecker.checkId(car_id)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${car_id}) does not exist.`,
    });
  } else {
    req.body.email = req.token.email;
    next();
  }
};

export const validateUpdateCarPrice = async (req, res, next) => {
  const { price } = req.body;
  const { car_id } = req.params;
  const result = Validator.validatUpdateCarPriceFields(car_id, price);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!await CarChecker.checkId(car_id)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${car_id}) does not exist.`,
    });
  } else {
    req.body.email = req.token.email;
    next();
  }
};

export const validateViewACar = async (req, res, next) => {
  const { car_id } = req.params;
  const result = Validator.validateViewSpecficCarParams(car_id);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!await CarChecker.checkId(car_id)) {
    res.status(404).send({
      status: 404,
      error: `Car with id (${car_id}) do not exist.`,
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
    req.qLength = 0;
    next();
  } else if (isOne) {
    if (rQuery.status) { // getting all available cars
      const result = Validator.validateViewUnsoldCarsQuery(rQuery.status);
      if (result.error) {
        res.status(400).send(Validator.Response());
      } else {
        req.qLength = 1;
        next();
      }
    } else if (rQuery.owner) { // getting all cars of a particular owner
      const result = Validator.validateViewAllCarsOfOwner(rQuery.owner);
      const userId = parseInt(rQuery.owner, 10);
      if (result.error) {
        res.status(400).send(Validator.Response());
      } else if (userId !== req.token.id) {
        res.status(400).send({ status: 400, error: 'invalid owner.' });
      } else {
        req.qLength = 1;
        next();
      }
    } else {
      res.status(400).send(errorInvalidQueryString());
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
    } else res.status(400).send(errorInvalidQueryString());
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
    res.status(400).send(errorInvalidQueryString());
  }
};

export const validateDeleteCar = async (req, res, next) => {
  const { car_id } = req.params;
  const result = Validator.validateDeleteACarParams(car_id);
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else if (!req.token.is_admin) {
    res.status(403).send({
      status: 403, error: 'You are not an admin. Only admin are allowed to delete an Advert',
    });
  } else if (!await CarChecker.checkId(car_id)) {
    res.status(404).send({ status: 404, error: `Car with id (${car_id}) does not exist.` });
  } else {
    next();
  }
};
