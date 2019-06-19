/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import Validator from './Validator';

class ValidateCar extends Validator {
  static createAdvertFields( // validates the fields that would creat an advert
    owner, state, status, price, title, manufacturer, model, bodyType, photo,
  ) {
    ValidateCar.refresh();
    ValidateCar.isValidOwner(owner, 'owner'); // validate owner
    ValidateCar.isValidState(state, 'state'); // validate state
    ValidateCar.isValidStatus(status, 'status'); // validate status
    ValidateCar.isValidPrice(price, 'price'); // validate price
    ValidateCar.isValidTitle(title, 'title'); // validate title
    ValidateCar.isValidManufacturer(manufacturer, 'manufacturer'); // validate manufacturer
    ValidateCar.isValidModel(model, 'model'); // validate model
    ValidateCar.isValidBodyType(bodyType, 'bodyType'); // validate body_type
    ValidateCar.isValidPhoto(photo, 'image'); // validate photo
    return ValidateCar.getErrorMessage();
  }

  static isValidOwner(owner, type) {
    ValidateCar.validateInt(owner, type);
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
    ValidateCar.validateString(title, field);
  }

  static isValidManufacturer(manufacturer, field) {
    ValidateCar.validateString(manufacturer, field);
  }

  static isValidModel(model, field) {
    ValidateCar.validateString(model, field);
  }

  static isValidBodyType(bodyType, field) {
    if (ValidateCar.isEmptyString(bodyType)) {
      ValidateCar.integrateError(field, `No ${field} entered.`);
    } else {
      const str = bodyType.toLowerCase();
      const bodyT = [' Convertibles', ' Coupe',
        ' SUV', ' Hatchback',
        ' Sedan', ' Wagon',
        ' Van', ' Truck',
        ' Trailer truck', ' Tipper truck',
        ' Bus', ' Motorbike',
      ];
      if (str !== 'convertibles' && str !== 'coupe'
      && str !== 'suv' && str !== 'hatchback'
      && str !== 'sedan' && str !== 'wagon'
      && str !== 'van' && str !== 'truck'
      && str !== 'trailer truck' && str !== 'tipper truck'
      && str !== 'bus' && str !== 'motorbike') {
        ValidateCar.integrateError(field, `Invalid ${field}. Each should be one of these: ${bodyT}`);
      }
    }
  }

  static isValidPhoto(myPhoto, str) {
    // console.log(myPhoto.photo.length === undefined);
    if (!myPhoto.photo) {
      ValidateCar.integrateError(str, `No ${str} submited.`);
    } else if (myPhoto.photo.type !== 'image/jpeg' && myPhoto.photo.type !== 'image/png') {
      ValidateCar.integrateError(str, `You didn't submit an ${str} type. jpg/png is accepted.`);
    }
  }
}

export default ValidateCar;
