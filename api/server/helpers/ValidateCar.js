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

  validateUpdateCarStatusFields(carId, newStatus) {
    this.validateInt(carId, 'carId');
    this.isValidNewStatus(newStatus, 'newStatus');
    return { error: this.error, data: this.errorMessages };
  }

  validateString(str, field) {
    const regExp = /^[\w ]+[^_]$/;
    if (this.isEmptyString(str)) {
      this.integrateError(field, `No ${field} entered.`);
    } else if (!regExp.test(str)) {
      this.integrateError(field, `Invalid ${field}.`);
    }
  }

  isValidOwner(owner, type) {
    this.validateInt(owner, type);
  }

  isValidState(state, field) {
    if (this.isEmptyString(state)) {
      this.integrateError(field, `No ${field} entered.`);
    } else {
      const str = state.toLowerCase();
      if (str !== 'new' && str !== 'used') {
        this.integrateError(field, `Invalid ${field}. Must be [ new ] or [ used ].`);
      }
    }
  }

  isValidStatus(status, field) {
    if (this.isEmptyString(status)) {
      this.integrateError(field, `No ${field} entered.`);
    } else {
      const str = status.toLowerCase();
      if (str !== 'available') {
        this.integrateError(field, `Invalid ${field}. Must be [ available ].`);
      }
    }
  }

  isValidNewStatus(status, field) {
    if (this.isEmptyString(status)) {
      this.integrateError(field, `No ${field} entered.`);
    } else {
      const str = status.toLowerCase();
      if (str !== 'sold') {
        this.integrateError(field, `Invalid ${field}. Must be changed to [ sold ] in order to update the status.`);
      }
    }
  }

  isValidPrice(price, field) {
    this.validateFloat(price, field);
  }

  isValidTitle(title, field) {
    this.validateString(title, field);
  }

  isValidManufacturer(manufacturer, field) {
    this.validateString(manufacturer, field);
  }

  isValidModel(model, field) {
    this.validateString(model, field);
  }

  isValidBodyType(bodyType, field) {
    if (this.isEmptyString(bodyType)) {
      this.integrateError(field, `No ${field} entered.`);
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
        this.integrateError(field, `Invalid ${field}. Each should be one of these: ${bodyT}`);
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
