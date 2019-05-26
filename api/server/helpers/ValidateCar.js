/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
import Validator from './Validator';

class ValidateCar extends Validator {
  constructor() {
    super();
  }

  validateCreateAdvertFields(
    owner, state, status, price, title, manufacturer, model, bodyType, photo,
  ) {
    this.isValidOwner(owner, 'owner'); // validate owner
    this.isValidState(state, 'state'); // validate state
    this.isValidStatus(status, 'status'); // validate status
    this.isValidPrice(price, 'price'); // validate price
    this.isValidTitle(title, 'title'); // validate title
    this.isValidManufacturer(manufacturer, 'manufacturer'); // validate manufacturer
    this.isValidModel(model, 'model'); // validate model
    this.isValidBodyType(bodyType, 'bodyType'); // validate body_type
    this.isValidPhoto(photo, 'image'); // validate photo
    return { error: this.error, data: this.errorMessages };
  }

  validateInt(int, type) {
    const intRegExp = /^\d+$/;
    if (this.isEmptyString(int)) {
      this.integrateError(type, `No ${type} entered.`);
    } else if (!intRegExp.test(int) || int === '0') {
      this.integrateError(type, `Invalid ${type}.`);
    }
  }

  validateString(str, type) {
    const regExp = /^[\w ]+[^_]$/;
    if (this.isEmptyString(str)) {
      this.integrateError(type, `No ${type} entered.`);
    } else if (!regExp.test(str)) {
      this.integrateError(type, `Invalid ${type}.`);
    }
  }

  isValidOwner(owner, type) {
    this.validateInt(owner, type);
  }

  isValidState(state, type) {
    if (this.isEmptyString(state)) {
      this.integrateError(type, `No ${type} entered.`);
    } else {
      const str = state.toLowerCase();
      if (str !== 'new' && str !== 'used') {
        this.integrateError(type, `Invalid ${type}. Must be [ new ] or [ used ].`);
      }
    }
  }

  isValidStatus(status, type) {
    if (this.isEmptyString(status)) {
      this.integrateError(type, `No ${type} entered.`);
    } else {
      const str = status.toLowerCase();
      if (str !== 'available') {
        this.integrateError(type, `Invalid ${type}. Must be [ available ].`);
      }
    }
  }

  isValidPrice(price, type) {
    this.validateInt(price, type);
  }

  isValidTitle(title, type) {
    this.validateString(title, type);
  }

  isValidManufacturer(manufacturer, type) {
    this.validateString(manufacturer, type);
  }

  isValidModel(model, type) {
    this.validateString(model, type);
  }

  isValidBodyType(bodyType, type) {
    if (this.isEmptyString(bodyType)) {
      this.integrateError(type, `No ${type} entered.`);
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
        this.integrateError(type, `Invalid ${type}. Each should be one of these: ${bodyT}`);
      }
    }
  }

  isValidPhoto(myPhoto, str) {
    // console.log(myPhoto.photo.length === undefined);
    if (!myPhoto.photo) {
      this.integrateError(str, `No ${str} submited.`);
    } else if (myPhoto.photo.type !== 'image/jpeg' && myPhoto.photo.type !== 'image/png') {
      this.integrateError(str, `You didn't submit an ${str} type. jpg/png is accepted.`);
    }
  }
}

export default ValidateCar;
