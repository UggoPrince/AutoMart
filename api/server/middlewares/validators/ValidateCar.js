/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import Validator from './Validator';

class ValidateCar extends Validator {
  static validateCreateAdvertFields( // validates the fields that would creat an advert
    state, status, price, title, manufacturer, model, body_type, photo,
  ) {
    ValidateCar.refresh();
    ValidateCar.isValidState(state, 'state'); // validate state
    ValidateCar.isValidStatus(status, 'status'); // validate status
    ValidateCar.isValidPrice(price, 'price'); // validate price
    ValidateCar.isValidTitle(title, 'title'); // validate title
    ValidateCar.isValidManufacturer(manufacturer, 'manufacturer'); // validate manufacturer
    ValidateCar.isValidModel(model, 'model'); // validate model
    ValidateCar.isValidBodyType(body_type, 'body_type'); // validate body_type
    ValidateCar.isValidPhoto(photo, 'image'); // validate photo
    return ValidateCar.getErrorMessage();
  }

  // validates the field and url parameter sent to update a car status
  static validateUpdateCarStatusFields(car_id) {
    ValidateCar.refresh();
    ValidateCar.validateInt(car_id, 'car_id');
    return ValidateCar.getErrorMessage();
  }

  // validates the field and url parameter that updates a car price
  static validatUpdateCarPriceFields(car_id, price) {
    ValidateCar.refresh();
    ValidateCar.validateInt(car_id, 'car_id'); // validate car id
    ValidateCar.isValidPrice(price, 'price'); // validate the new price
    return ValidateCar.getErrorMessage();
  }

  // validate the url parameter for car id sent to retrieve a car
  static validateViewSpecficCarParams(car_id) {
    ValidateCar.refresh();
    ValidateCar.validateInt(car_id, 'car_id');
    return ValidateCar.getErrorMessage();
  }

  // validate the query string sent for status
  static validateViewUnsoldCarsQuery(status) {
    ValidateCar.refresh();
    ValidateCar.isValidStatusQuery(status, 'status');
    return ValidateCar.getErrorMessage();
  }

  // validate the query string for getting cars in a certain price range
  static validateViewUnsoldCarsInPriceRange(status, min_price, max_price) {
    ValidateCar.refresh();
    ValidateCar.isValidStatusQuery(status, 'status');
    ValidateCar.isValidPrice(min_price, 'min_price');
    ValidateCar.isValidPrice(max_price, 'max_price');
    return ValidateCar.getErrorMessage();
  }

  // validate the url parameter for car id sent to delete a car
  static validateDeleteACarParams(car_id) {
    ValidateCar.refresh();
    ValidateCar.validateInt(car_id, 'car_id');
    return ValidateCar.getErrorMessage();
  }

  // validate the query string for getting cars that are used
  static validateViewUnsoldNewCars(status, state) {
    ValidateCar.refresh();
    ValidateCar.isValidStatusQuery(status, 'status');
    ValidateCar.isValidState(state, 'state');
    return ValidateCar.getErrorMessage();
  }

  static validateViewUnsoldCarsByManufacturer(status, manufacturer) {
    ValidateCar.refresh();
    ValidateCar.isValidStatusQuery(status, 'status');
    ValidateCar.validateString(manufacturer, 'manufacturer');
    return ValidateCar.getErrorMessage();
  }

  // validate getting all cars of a user
  static validateViewAllCarsOfOwner(user_id) {
    ValidateCar.refresh();
    ValidateCar.validateInt(user_id, 'onwer id');
    return ValidateCar.getErrorMessage();
  }

  static isValidState(state, field) {
    if (ValidateCar.isEmptyString(state)) {
      ValidateCar.integrateError(field, `No ${field} entered.`);
    } else {
      const str = state.toLowerCase();
      if (str !== 'new' && str !== 'used') {
        ValidateCar.integrateError(field, `Invalid ${field}. Must be [ new ] or [ used ].`);
      }
    }
  }

  static isValidStatus(status, field) {
    if (ValidateCar.isEmptyString(status)) {
      ValidateCar.integrateError(field, `No ${field} entered.`);
    } else {
      const str = status.toLowerCase();
      if (str !== 'available') {
        ValidateCar.integrateError(field, `Invalid ${field}. Must be [ available ].`);
      }
    }
  }

  static isValidPrice(price, field) {
    ValidateCar.validateFloat(price, field);
  }

  static isValidTitle(title, field) {
    const regExp = /^[\w -]+[^_]$/;
    if (!Validator.isEmptyString(title) && !regExp.test(title)) {
      Validator.integrateError(field, `Invalid ${field}.`);
    }
  }

  static isValidManufacturer(manufacturer, field) {
    ValidateCar.validateString(manufacturer, field);
  }

  static isValidModel(model, field) {
    ValidateCar.validateString(model, field);
  }

  static isValidBodyType(body_type, field) {
    if (ValidateCar.isEmptyString(body_type)) {
      ValidateCar.integrateError(field, `No ${field} entered.`);
    }
  }

  static isValidPhoto(car_photo, str) {
    // console.log(myPhoto.photo.length === undefined);
    console.log(car_photo);
    if (car_photo.empty) {
      ValidateCar.integrateError(str, `No ${str} submited.`);
    } /* else if (car_photo.image_url.type !== 'image/jpeg'
    && car_photo.image_url.type !== 'image/png') {
      ValidateCar.integrateError(str, `You didn't submit an ${str} type. jpg/png is accepted.`);
    } */
  }

  static isValidStatusQuery(status, query) {
    if (status !== 'available') {
      ValidateCar.integrateError(query, `The ${query} query string must be [ ?status=available ].`);
    }
  }
}

export default ValidateCar;
