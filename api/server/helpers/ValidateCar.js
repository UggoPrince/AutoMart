/* eslint-disable linebreak-style */
/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import Validator from './Validator';

class ValidateCar extends Validator {
  constructor() {
    super();
  }

  validateCreateAdvertFields( // validates the fields that would creat an advert
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
    return this.getErrorMessage();
  }

  // validates the field and url parameter sent to update a car status
  validateUpdateCarStatusFields(carId, newStatus) {
    this.validateInt(carId, 'carId');
    this.isValidNewStatus(newStatus, 'newStatus');
    return this.getErrorMessage();
  }

  // validates the field and url parameter that updates a car price
  validatUpdateCarPriceFields(carId, newPrice) {
    this.validateInt(carId, 'carId'); // validate car id
    this.isValidPrice(newPrice, 'newPrice'); // validate the new price
    return this.getErrorMessage();
  }

  // validate the url parameter for car id sent to retrieve a car
  validateGetSpecficCar(carId) {
    this.validateInt(carId, 'carId');
    return this.getErrorMessage();
  }

  // validate the query string sent for status
  validateGetUnsoldCars(status) {
    this.isValidStatusQuery(status, 'status');
    return this.getErrorMessage();
  }

  // validate the query string for getting cars in a certain price range
  validateGetUnsoldCarsInPriceRange(status, minPrice, maxPrice) {
    this.isValidStatusQuery(status, 'status');
    this.isValidPrice(minPrice, 'min_price');
    this.isValidPrice(maxPrice, 'max_price');
    return this.getErrorMessage();
  }

  // validate the query string for getting cars that are used
  validate_Get_Unsold_Used_Cars(status, state) {
    this.isValidStatusQuery(status, 'status');
    this.isValidState(state, 'state');
    return this.getErrorMessage();
  }

  validate_Get_Unsold_Cars_By_Manufacturer(status, manufacturer) {
    this.isValidStatusQuery(status, 'status');
    this.validateString(manufacturer, 'manufacturer');
    return this.getErrorMessage();
  }

  // validate the url parameter for car id sent to delete a car
  validateDeleteACar(carId) {
    this.validateInt(carId, 'carId');
    return this.getErrorMessage();
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

  isValidStatusQuery(status, query) {
    if (status !== 'available') {
      this.integrateError(query, `The ${query} query string must be the [ ?status=available ].`);
    }
  }
}

export default ValidateCar;
