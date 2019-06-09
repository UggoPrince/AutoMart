"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CarsService = _interopRequireDefault(require("../services/CarsService"));

var _ValidateCar = _interopRequireDefault(require("../helpers/ValidateCar"));

var _UsersService = _interopRequireDefault(require("../services/UsersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CarsController =
/*#__PURE__*/
function () {
  function CarsController() {
    _classCallCheck(this, CarsController);
  }

  _createClass(CarsController, [{
    key: "addCar",
    value: function () {
      var _addCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, owner, state, status, price, title, manufacturer, model, bodyType, myPhoto, validator, validCarReq, ownerId, ownerEmail, addedCar;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, owner = _req$body.owner, state = _req$body.state, status = _req$body.status, price = _req$body.price, title = _req$body.title, manufacturer = _req$body.manufacturer, model = _req$body.model, bodyType = _req$body.bodyType;
                myPhoto = req.files;
                validator = new _ValidateCar["default"]();
                validCarReq = validator.validateCreateAdvertFields(owner, state, status, price, title, manufacturer, model, bodyType, myPhoto);

                if (!validCarReq.error) {
                  _context.next = 8;
                  break;
                }

                res.status(404).send({
                  status: 404,
                  error: validCarReq.data
                });
                _context.next = 18;
                break;

              case 8:
                if (_UsersService["default"].getUserById(parseInt(owner, 10)).exist) {
                  _context.next = 12;
                  break;
                }

                res.status(404).send({
                  status: 404,
                  error: 'Invalid owner'
                });
                _context.next = 18;
                break;

              case 12:
                ownerId = parseInt(owner, 10);
                ownerEmail = _UsersService["default"].getUserById(ownerId).data.email;
                _context.next = 16;
                return _CarsService["default"].createAdvert(owner, state, status, price, title, manufacturer, model, bodyType, myPhoto, ownerEmail);

              case 16:
                addedCar = _context.sent;
                res.status(201).send({
                  status: 201,
                  data: addedCar.data
                });

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addCar(_x, _x2) {
        return _addCar.apply(this, arguments);
      }

      return addCar;
    }()
  }, {
    key: "getACar",
    value: function getACar(req, res) {
      var carId = req.params.car_id;
      var validator = new _ValidateCar["default"]();
      var validGetCarReq = validator.validateGetSpecficCar(carId);

      if (validGetCarReq.error) {
        res.status(404).send({
          status: 404,
          error: validGetCarReq.data
        });
      } else if (!_CarsService["default"].getCarById(parseInt(carId, 10)).exist) {
        res.status(404).send({
          status: 404,
          error: 'Invalid carId. There is no car with this id.'
        });
      } else {
        var id = parseInt(carId, 10);

        var _carsService$getCarBy = _CarsService["default"].getCarById(id),
            car = _carsService$getCarBy.car;

        res.status(200).send({
          status: 200,
          data: car
        });
      }
    }
  }, {
    key: "getCars",
    value: function getCars(req, res) {
      var rQuery = req.query;
      var qLength = Object.keys(req.query).length;
      var validator = new _ValidateCar["default"]();
      var isZero = qLength === 0;
      var isOne = qLength > 0 && qLength === 1;
      var isTwo = qLength > 0 && qLength === 2;
      var isThree = qLength > 0 && qLength === 3;

      if (isZero) {
        // process request for admin view all car adverts
        var allCars = _CarsService["default"].getAllCars();

        res.status(200).send({
          status: 200,
          data: allCars
        });
      } else if (isOne) {
        // process request for getting unsold cars only
        var validQuery = validator.validateGetUnsoldCars(rQuery.status);

        if (validQuery.error) {
          res.status(404).send({
            status: 404,
            error: validQuery.data
          });
        } else {
          var unsoldCars = _CarsService["default"].getCarsByStatus(rQuery.status);

          res.status(200).send({
            status: 200,
            data: unsoldCars
          });
        }
      } else if (isTwo) {
        // process request for getting new and used unsold cars
        if (rQuery.state) {
          var _validQuery = validator.validate_Get_Unsold_Used_Cars(rQuery.status, rQuery.state);

          if (_validQuery.error) {
            res.status(404).send({
              status: 404,
              error: _validQuery.data
            });
          } else {
            var _unsoldCars = _CarsService["default"].getCarsByStatusAndState(rQuery.status, 'state', rQuery.state);

            res.status(200).send({
              status: 200,
              data: _unsoldCars
            });
          }
        } else if (rQuery.manufacturer) {
          // process request for getting unsold cars by manufacturer
          var _validQuery2 = validator.validate_Get_Unsold_Cars_By_Manufacturer(rQuery.status, rQuery.manufacturer);

          if (_validQuery2.error) {
            res.status(404).send({
              status: 404,
              error: _validQuery2.data
            });
          } else {
            var _unsoldCars2 = _CarsService["default"].getCarsByStatusAndManufacturer(rQuery.status, 'manufacturer', rQuery.manufacturer);

            res.status(200).send({
              status: 200,
              data: _unsoldCars2
            });
          }
        } else {
          res.status(404).send({
            status: 404,
            error: 'The query string (with its value) is not valid.'
          });
        }
      } else if (isThree) {
        // process request for getting unsold cars on a certain price range
        var _validQuery3 = validator.validateGetUnsoldCarsInPriceRange(rQuery.status, rQuery.min_price, rQuery.max_price);

        if (_validQuery3.error) {
          res.status(404).send({
            status: 404,
            error: _validQuery3.data
          });
        } else {
          var unsoldCarsInPriceRange = _CarsService["default"].getCarsByStatusAndPriceRange(rQuery.status, rQuery.min_price, rQuery.max_price);

          res.status(200).send({
            status: 200,
            data: unsoldCarsInPriceRange
          });
        }
      } else {
        res.status(404).send({
          status: 404,
          error: 'The query string (with its value) is not valid.'
        });
      }
    }
  }, {
    key: "updateCarStatus",
    value: function updateCarStatus(req, res) {
      var newStatus = req.body.newStatus;
      var carId = req.params.car_id;
      var validator = new _ValidateCar["default"]();
      var validUpdateReq = validator.validateUpdateCarStatusFields(carId, newStatus);

      if (validUpdateReq.error) {
        res.status(404).send({
          status: 404,
          error: validUpdateReq.data
        });
      } else if (!_CarsService["default"].getCarById(parseInt(carId, 10)).exist) {
        res.status(404).send({
          status: 404,
          error: 'Invalid carId. There is no car with this id.'
        });
      } else {
        var id = parseInt(carId, 10);

        var carOwner = _CarsService["default"].getCarOwner(id);

        var ownerEmail = _UsersService["default"].getUserById(carOwner).data.email;

        var newStatusUpdate = _CarsService["default"].updateStatus(id, newStatus, ownerEmail);

        res.status(200).send({
          status: 200,
          data: newStatusUpdate
        });
      }
    }
  }, {
    key: "updateCarPrice",
    value: function updateCarPrice(req, res) {
      var newPrice = req.body.newPrice;
      var carId = req.params.car_id;
      var validator = new _ValidateCar["default"]();
      var validUpdateCarPriceReq = validator.validatUpdateCarPriceFields(carId, newPrice);

      if (validUpdateCarPriceReq.error) {
        res.status(404).send({
          status: 404,
          error: validUpdateCarPriceReq.data
        });
      } else if (!_CarsService["default"].getCarById(parseInt(carId, 10)).exist) {
        res.status(404).send({
          status: 404,
          error: 'Invalid carId. There is no car with this id.'
        });
      } else {
        var id = parseInt(carId, 10);

        var carOwner = _CarsService["default"].getCarOwner(id);

        var ownerEmail = _UsersService["default"].getUserById(carOwner).data.email;

        var newPriceUpdate = _CarsService["default"].updatePrice(id, newPrice, ownerEmail);

        res.status(200).send({
          status: 200,
          data: newPriceUpdate
        });
      }
    }
  }, {
    key: "deleteCar",
    value: function deleteCar(req, res) {
      var carId = req.params.car_id;
      var validator = new _ValidateCar["default"]();
      var validDeleteCarReq = validator.validateDeleteACar(carId);

      if (validDeleteCarReq.error) {
        res.status(404).send({
          status: 404,
          data: validDeleteCarReq.data
        });
      } else if (!_CarsService["default"].getCarById(parseInt(carId, 10)).exist) {
        res.status(404).send({
          status: 404,
          error: 'Invalid carId. There is no car with this id.'
        });
      } else {
        var id = parseInt(carId, 10);

        _CarsService["default"]["delete"](id);

        res.status(200).send({
          status: 200,
          data: 'Car Ad successfully deleted'
        });
      }
    }
  }]);

  return CarsController;
}();

var _default = new CarsController();

exports["default"] = _default;
//# sourceMappingURL=CarsController.js.map