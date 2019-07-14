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

    return _possibleConstructorReturn(this, _getPrototypeOf(ValidateCar).apply(this, arguments));
  }

  _createClass(ValidateCar, null, [{
    key: "validateCreateAdvertFields",
    value: function validateCreateAdvertFields( // validates the fields that would creat an advert
    state, status, price, title, manufacturer, model, body_type, photo) {
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
    } // validates the field and url parameter sent to update a car status

  }, {
    key: "validateUpdateCarStatusFields",
    value: function validateUpdateCarStatusFields(car_id) {
      ValidateCar.refresh();
      ValidateCar.validateInt(car_id, 'car_id');
      return ValidateCar.getErrorMessage();
    } // validates the field and url parameter that updates a car price

  }, {
    key: "validatUpdateCarPriceFields",
    value: function validatUpdateCarPriceFields(car_id, price) {
      ValidateCar.refresh();
      ValidateCar.validateInt(car_id, 'car_id'); // validate car id

      ValidateCar.isValidPrice(price, 'price'); // validate the new price

      return ValidateCar.getErrorMessage();
    } // validate the url parameter for car id sent to retrieve a car

  }, {
    key: "validateViewSpecficCarParams",
    value: function validateViewSpecficCarParams(car_id) {
      ValidateCar.refresh();
      ValidateCar.validateInt(car_id, 'car_id');
      return ValidateCar.getErrorMessage();
    } // validate the query string sent for status

  }, {
    key: "validateViewUnsoldCarsQuery",
    value: function validateViewUnsoldCarsQuery(status) {
      ValidateCar.refresh();
      ValidateCar.isValidStatusQuery(status, 'status');
      return ValidateCar.getErrorMessage();
    } // validate the query string for getting cars in a certain price range

  }, {
    key: "validateViewUnsoldCarsInPriceRange",
    value: function validateViewUnsoldCarsInPriceRange(status, min_price, max_price) {
      ValidateCar.refresh();
      ValidateCar.isValidStatusQuery(status, 'status');
      ValidateCar.isValidPrice(min_price, 'min_price');
      ValidateCar.isValidPrice(max_price, 'max_price');
      return ValidateCar.getErrorMessage();
    } // validate the url parameter for car id sent to delete a car

  }, {
    key: "validateDeleteACarParams",
    value: function validateDeleteACarParams(car_id) {
      ValidateCar.refresh();
      ValidateCar.validateInt(car_id, 'car_id');
      return ValidateCar.getErrorMessage();
    } // validate the query string for getting cars that are used

  }, {
    key: "validateViewUnsoldNewCars",
    value: function validateViewUnsoldNewCars(status, state) {
      ValidateCar.refresh();
      ValidateCar.isValidStatusQuery(status, 'status');
      ValidateCar.isValidState(state, 'state');
      return ValidateCar.getErrorMessage();
    }
  }, {
    key: "validateViewUnsoldCarsByManufacturer",
    value: function validateViewUnsoldCarsByManufacturer(status, manufacturer) {
      ValidateCar.refresh();
      ValidateCar.isValidStatusQuery(status, 'status');
      ValidateCar.validateString(manufacturer, 'manufacturer');
      return ValidateCar.getErrorMessage();
    } // validate getting all cars of a user

  }, {
    key: "validateViewAllCarsOfOwner",
    value: function validateViewAllCarsOfOwner(user_id) {
      ValidateCar.refresh();
      ValidateCar.validateInt(user_id, 'onwer id');
      return ValidateCar.getErrorMessage();
    }
  }, {
    key: "isValidState",
    value: function isValidState(state, field) {
      if (ValidateCar.isEmptyString(state)) {
        ValidateCar.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = state.toLowerCase();

        if (str !== 'new' && str !== 'used') {
          ValidateCar.integrateError(field, "Invalid ".concat(field, ". Must be [ new ] or [ used ]."));
        }
      }
    }
  }, {
    key: "isValidStatus",
    value: function isValidStatus(status, field) {
      if (ValidateCar.isEmptyString(status)) {
        ValidateCar.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = status.toLowerCase();

        if (str !== 'available') {
          ValidateCar.integrateError(field, "Invalid ".concat(field, ". Must be [ available ]."));
        }
      }
    }
  }, {
    key: "isValidPrice",
    value: function isValidPrice(price, field) {
      ValidateCar.validateFloat(price, field);
    }
  }, {
    key: "isValidTitle",
    value: function isValidTitle(title, field) {
      var regExp = /^[\w -]+[^_]$/;

      if (!_Validator2["default"].isEmptyString(title) && !regExp.test(title)) {
        _Validator2["default"].integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "isValidManufacturer",
    value: function isValidManufacturer(manufacturer, field) {
      ValidateCar.validateString(manufacturer, field);
    }
  }, {
    key: "isValidModel",
    value: function isValidModel(model, field) {
      ValidateCar.validateString(model, field);
    }
  }, {
    key: "isValidBodyType",
    value: function isValidBodyType(body_type, field) {
      if (ValidateCar.isEmptyString(body_type)) {
        ValidateCar.integrateError(field, "No ".concat(field, " entered."));
      } else {
        var str = body_type.toLowerCase();
        var bodyT = [' Convertibles', ' Coupe', ' SUV', ' Hatchback', ' Sedan', ' Wagon', ' Van', ' Truck', ' Trailer truck', ' Tipper truck', ' Bus', ' Motorbike'];

        if (str !== 'convertibles' && str !== 'coupe' && str !== 'suv' && str !== 'hatchback' && str !== 'sedan' && str !== 'wagon' && str !== 'van' && str !== 'truck' && str !== 'trailer truck' && str !== 'tipper truck' && str !== 'bus' && str !== 'motorbike') {
          ValidateCar.integrateError(field, "Invalid ".concat(field, ". Each should be one of these: ").concat(bodyT));
        }
      }
    }
  }, {
    key: "isValidPhoto",
    value: function isValidPhoto(car_photo, str) {
      // console.log(myPhoto.photo.length === undefined);
      if (!car_photo.image_url) {
        ValidateCar.integrateError(str, "No ".concat(str, " submited."));
      } else if (car_photo.image_url.type !== 'image/jpeg' && car_photo.image_url.type !== 'image/png') {
        ValidateCar.integrateError(str, "You didn't submit an ".concat(str, " type. jpg/png is accepted."));
      }
    }
  }, {
    key: "isValidStatusQuery",
    value: function isValidStatusQuery(status, query) {
      if (status !== 'available') {
        ValidateCar.integrateError(query, "The ".concat(query, " query string must be [ ?status=available ]."));
      }
    }
  }]);

  return ValidateCar;
}(_Validator2["default"]);

var _default = ValidateCar;
exports["default"] = _default;
//# sourceMappingURL=ValidateCar.js.map