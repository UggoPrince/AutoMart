"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Cars = _interopRequireDefault(require("../models/Cars"));

var _cars = _interopRequireDefault(require("../database/cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var cloudinary = _cloudinary["default"].v2; // cloudinary configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var CarsService =
/*#__PURE__*/
function () {
  function CarsService() {
    _classCallCheck(this, CarsService);

    this.cars = _cars["default"];
    this.userEmail = null;
  }

  _createClass(CarsService, [{
    key: "getAllCars",
    value: function getAllCars() {
      return this.cars.map(function (data) {
        var car = new _Cars["default"]();
        car.id = data.id;
        car.owner = data.owner;
        car.created_on = data.created_on;
        car.state = data.state;
        car.status = data.status;
        car.price = data.price;
        car.title = data.title;
        car.manufacturer = data.manufacturer;
        car.model = data.model;
        car.body_type = data.body_type;
        car.photo = data.photo;
        return car;
      });
    }
  }, {
    key: "getCarById",
    value: function getCarById(id) {
      var cars = this.getAllCars();

      for (var i = 0; i < cars.length; i += 1) {
        if (cars[i].id === id) {
          return {
            exist: true,
            data: {
              id: cars[i].id,
              email: this.userEmail,
              created_on: cars[i].created_on,
              manufacturer: cars[i].manufacturer,
              model: cars[i].model,
              body_type: cars[i].body_type,
              state: cars[i].state,
              status: cars[i].status,
              price: cars[i].price,
              title: cars[i].title,
              photo: cars[i].photo
            },
            car: cars[i]
          };
        }
      }

      return {
        exist: false,
        error: 'no such car with this id.'
      };
    }
  }, {
    key: "getCarOwner",
    value: function getCarOwner(id) {
      var cars = this.getAllCars();

      for (var i = 0; i < cars.length; i += 1) {
        if (cars[i].id === id) return cars[i].owner;
      }
    }
  }, {
    key: "getCarsByStatus",
    value: function getCarsByStatus(status) {
      var unsoldCars = [];

      for (var i = 0; i < this.cars.length; i += 1) {
        if (this.cars[i].status === status) {
          unsoldCars.push(this.cars[i]);
        }
      }

      return unsoldCars;
    }
  }, {
    key: "getCarsByStatusAndPriceRange",
    value: function getCarsByStatusAndPriceRange(status, minPrice, maxPrice) {
      var unsoldCarsInPriceRange = [];

      for (var i = 0; i < this.cars.length; i += 1) {
        var car = this.cars[i];

        if (car.status === status && car.price >= minPrice && car.price <= maxPrice) {
          unsoldCarsInPriceRange.push(this.cars[i]);
        }
      }

      return unsoldCarsInPriceRange;
    }
  }, {
    key: "getCarsByStatusAndState",
    value: function getCarsByStatusAndState(status, field, state) {
      var unsoldCars = [];

      for (var i = 0; i < this.cars.length; i += 1) {
        var car = this.cars[i];

        if (car.status === status && car[field] === state) {
          unsoldCars.push(this.cars[i]);
        }
      }

      return unsoldCars;
    }
  }, {
    key: "getCarsByStatusAndManufacturer",
    value: function getCarsByStatusAndManufacturer(status, field, manufacturer) {
      return this.getCarsByStatusAndState(status, field, manufacturer);
    }
  }, {
    key: "createAdvert",
    value: function () {
      var _createAdvert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(owner, state, status, price, title, manufacturer, model, bodyType, myPhoto, ownerEmail) {
        var filePath, uploadedImg, allCars, id, car;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.userEmail = ownerEmail;
                filePath = myPhoto.photo.path;
                _context.next = 4;
                return cloudinary.uploader.upload(filePath, {
                  folder: process.env.CLOUDINARY_AUTOMART_FOLDER,
                  use_filename: true
                }, function (err, result) {
                  return result;
                });

              case 4:
                uploadedImg = _context.sent;
                allCars = this.cars.length;
                id = allCars + 1;
                car = {
                  id: id,
                  owner: owner,
                  created_on: Date.now(),
                  state: state,
                  status: status,
                  price: price,
                  title: title,
                  manufacturer: manufacturer,
                  model: model,
                  body_type: bodyType,
                  photo: uploadedImg.url
                };
                this.cars.push(car);
                return _context.abrupt("return", this.getCarById(id));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createAdvert(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10) {
        return _createAdvert.apply(this, arguments);
      }

      return createAdvert;
    }()
  }, {
    key: "updater",
    value: function updater(carId, field, newField) {
      var cars = this.getAllCars();

      for (var i = 0; i < cars.length; i += 1) {
        if (cars[i].id === carId) {
          this.cars[i][field] = newField;
          return i;
        }
      }
    }
  }, {
    key: "updateStatus",
    value: function updateStatus(carId, newStatus, email) {
      var i = this.updater(carId, 'status', newStatus);
      return {
        id: this.cars[i].id,
        email: email,
        created_on: this.cars[i].created_on,
        manufacturer: this.cars[i].manufacturer,
        model: this.cars[i].model,
        price: this.cars[i].price,
        state: this.cars[i].state,
        status: this.cars[i].status
      };
    }
  }, {
    key: "updatePrice",
    value: function updatePrice(carId, newPrice, email) {
      var i = this.updater(carId, 'price', newPrice);
      return {
        id: this.cars[i].id,
        email: email,
        created_on: this.cars[i].created_on,
        manufacturer: this.cars[i].manufacturer,
        model: this.cars[i].model,
        price: this.cars[i].price,
        state: this.cars[i].state,
        status: this.cars[i].status
      };
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      for (var i = 0; i < this.cars.length; i += 1) {
        if (this.cars[i].id === id) {
          this.cars.splice(i, 1);
          break;
        }
      }
    }
  }]);

  return CarsService;
}();

var _default = new CarsService();

exports["default"] = _default;
//# sourceMappingURL=CarsService.js.map