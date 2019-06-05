"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Validator2 = _interopRequireDefault(require("./Validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ValidateCar =
/*#__PURE__*/
function (_Validator) {
  _inherits(ValidateCar, _Validator);

  function ValidateCar() {
    _classCallCheck(this, ValidateCar);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValidateCar).call(this));
  }

  _createClass(ValidateCar, [{
    key: "validateCreateAdvertFields",
    value: function validateCreateAdvertFields( // validates the fields that would creat an advert
    owner, state, status, price, title, manufacturer, model, bodyType, photo) {
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
    } // validates the field and url parameter sent to update a car status

  }, {
    key: "validateUpdateCarStatusFields",
    value: function validateUpdateCarStatusFields(carId, newStatus) {
      this.validateInt(carId, 'carId');
      this.isValidNewStatus(newStatus, 'newStatus');
      return this.getErrorMessage();
    } // validates the field and url parameter that updates a car price

  }, {
    key: "validatUpdateCarPriceFields",
    value: function validatUpdateCarPriceFields(carId, newPrice) {
      this.validateInt(carId, 'carId'); // validate car id

      this.isValidPrice(newPrice, 'newPrice'); // validate the new price

      return this.getErrorMessage();
    } // validate the url parameter for car id sent to retrieve a car

  }, {
    key: "validateGetSpecficCar",
    value: function validateGetSpecficCar(carId) {
      this.validateInt(carId, 'carId');
      return this.getErrorMessage();
    } // validate the query string sent for status

  }, {
    key: "validateGetUnsoldCars",
    value: function validateGetUnsoldCars(status) {
      this.isValidStatusQuery(status, 'status');
      return this.getErrorMessage();
    } // validate the query string for getting cars in a certain price range

  }, {
    key: "validateGetUnsoldCarsInPriceRange",
    value: function validateGetUnsoldCarsInPriceRange(status, minPrice, maxPrice) {
      this.isValidStatusQuery(status, 'status');
      this.isValidPrice(minPrice, 'min_price');
      this.isValidPrice(maxPrice, 'max_price');
      return this.getErrorMessage();
    } // validate the query string for getting cars that are used

  }, {
    key: "validate_Get_Unsold_Used_Cars",
    value: function validate_Get_Unsold_Used_Cars(status, state) {
      this.isValidStatusQuery(status, 'status');
      this.isValidState(state, 'state');
      return this.getErrorMessage();
    }
  }, {
    key: "validate_Get_Unsold_Cars_By_Manufacturer",
    value: function validate_Get_Unsold_Cars_By_Manufacturer(status, manufacturer) {
      this.isValidStatusQuery(status, 'status');
      this.validateString(manufacturer, 'manufacturer');
      return this.getErrorMessage();
    } // validate the url parameter for car id sent to delete a car

  }, {
    key: "validateDeleteACar",
    value: function validateDeleteACar(carId) {
      this.validateInt(carId, 'carId');
      return this.getErrorMessage();
    }
  }, {
    key: "isValidOwner",
    value: function isValidOwner(owner, type) {
      this.validateInt(owner, type);
    }
  }, {
    key: "isValidState",
    value: function isValidState(state, field) {
      if (this.isEmptyString(state)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = state.toLowerCase();

        if (str !== 'new' && str !== 'used') {
          this.integrateError(field, "Invalid ".concat(field, ". Must be [ new ] or [ used ]."));
        }
      }
    }
  }, {
    key: "isValidStatus",
    value: function isValidStatus(status, field) {
      if (this.isEmptyString(status)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = status.toLowerCase();

        if (str !== 'available') {
          this.integrateError(field, "Invalid ".concat(field, ". Must be [ available ]."));
        }
      }
    }
  }, {
    key: "isValidNewStatus",
    value: function isValidNewStatus(status, field) {
      if (this.isEmptyString(status)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = status.toLowerCase();

        if (str !== 'sold') {
          this.integrateError(field, "Invalid ".concat(field, ". Must be changed to [ sold ] in order to update the status."));
        }
      }
    }
  }, {
    key: "isValidPrice",
    value: function isValidPrice(price, field) {
      this.validateFloat(price, field);
    }
  }, {
    key: "isValidTitle",
    value: function isValidTitle(title, field) {
      this.validateString(title, field);
    }
  }, {
    key: "isValidManufacturer",
    value: function isValidManufacturer(manufacturer, field) {
      this.validateString(manufacturer, field);
    }
  }, {
    key: "isValidModel",
    value: function isValidModel(model, field) {
      this.validateString(model, field);
    }
  }, {
    key: "isValidBodyType",
    value: function isValidBodyType(bodyType, field) {
      if (this.isEmptyString(bodyType)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = bodyType.toLowerCase();
        var bodyT = [' Convertibles', ' Coupe', ' SUV', ' Hatchback', ' Sedan', ' Wagon', ' Van', ' Truck', ' Trailer truck', ' Tipper truck', ' Bus', ' Motorbike'];

        if (str !== 'convertibles' && str !== 'coupe' && str !== 'suv' && str !== 'hatchback' && str !== 'sedan' && str !== 'wagon' && str !== 'van' && str !== 'truck' && str !== 'trailer truck' && str !== 'tipper truck' && str !== 'bus' && str !== 'motorbike') {
          this.integrateError(field, "Invalid ".concat(field, ". Each should be one of these: ").concat(bodyT));
        }
      }
    }
  }, {
    key: "isValidPhoto",
    value: function isValidPhoto(myPhoto, str) {
      // console.log(myPhoto.photo.length === undefined);
      if (!myPhoto.photo) {
        this.integrateError(str, "No ".concat(str, " submited."));
      } else if (myPhoto.photo.type !== 'image/jpeg' && myPhoto.photo.type !== 'image/png') {
        this.integrateError(str, "You didn't submit an ".concat(str, " type. jpg/png is accepted."));
      }
    }
  }, {
    key: "isValidStatusQuery",
    value: function isValidStatusQuery(status, query) {
      if (status !== 'available') {
        this.integrateError(query, "The ".concat(query, " query string must be the [ ?status=available ]."));
      }
    }
  }]);

  return ValidateCar;
}(_Validator2["default"]);

var _default = ValidateCar;
exports["default"] = _default;
//# sourceMappingURL=ValidateCar.js.map