/* eslint-disable linebreak-style */
import Validator from './validators/ValidateCar';

const validateCreateAdvert = (req, res, next) => {
  const {
    owner, state, status, price, title, manufacturer, model, bodyType,
  } = req.body;
  const myPhoto = req.files;
  const result = Validator.createAdvertFields(
    owner, state, status, price, title, manufacturer, model, bodyType, myPhoto,
  );
  if (result.error) {
    res.status(400).send(Validator.Response());
  } else {
    next();
  }
};

export default validateCreateAdvert;
