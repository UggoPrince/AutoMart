"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateDeleteCar = exports.validateViewCars = exports.validateViewACar = exports.validateUpdateCarPrice = exports.validateUpdateCarStatus = exports.validateCreateAdvert = void 0;

var _ValidateCar = _interopRequireDefault(require("./validators/ValidateCar"));

var _CarChecker = _interopRequireDefault(require("./database_checkers/CarChecker"));

var _errorHandlers = require("../helpers/errorHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateCreateAdvert =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, state, status, price, title, manufacturer, model, body_type, car_photo, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, state = _req$body.state, status = _req$body.status, price = _req$body.price, title = _req$body.title, manufacturer = _req$body.manufacturer, model = _req$body.model, body_type = _req$body.body_type;
            console.log(req.body);
            car_photo = {};
            if (req.body.img_url) car_photo = {
              empty: false
            };else if (req.files.img_url) car_photo = {
              empty: false
            };else car_photo = {
              empty: true
            };
            result = _ValidateCar["default"].validateCreateAdvertFields(state, status, price, title, manufacturer, model, body_type, car_photo);

            if (result.error) {
              console.log(_ValidateCar["default"].Response());
              res.status(400).send(_ValidateCar["default"].Response());
            } else {
              req.body.owner = req.token.id;
              req.body.email = req.token.email;
              next();
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateCreateAdvert(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateCreateAdvert = validateCreateAdvert;

var validateUpdateCarStatus =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var car_id, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            car_id = req.params.car_id;
            result = _ValidateCar["default"].validateUpdateCarStatusFields(car_id);

            if (!result.error) {
              _context2.next = 6;
              break;
            }

            res.status(400).send(_ValidateCar["default"].Response());
            _context2.next = 20;
            break;

          case 6:
            _context2.next = 8;
            return _CarChecker["default"].checkId(car_id);

          case 8:
            if (_context2.sent) {
              _context2.next = 18;
              break;
            }

            _context2.t0 = console;
            _context2.t1 = car_id;
            _context2.next = 13;
            return _CarChecker["default"].checkId(car_id);

          case 13:
            _context2.t2 = _context2.sent;

            _context2.t0.log.call(_context2.t0, _context2.t1, _context2.t2);

            res.status(404).send({
              status: 404,
              error: "Car with id (".concat(car_id, ") does not exist.")
            });
            _context2.next = 20;
            break;

          case 18:
            req.body.email = req.token.email;
            next();

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validateUpdateCarStatus(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validateUpdateCarStatus = validateUpdateCarStatus;

var validateUpdateCarPrice =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res, next) {
    var price, car_id, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            price = req.body.price;
            car_id = req.params.car_id;
            result = _ValidateCar["default"].validatUpdateCarPriceFields(car_id, price);

            if (!result.error) {
              _context3.next = 7;
              break;
            }

            res.status(400).send(_ValidateCar["default"].Response());
            _context3.next = 15;
            break;

          case 7:
            _context3.next = 9;
            return _CarChecker["default"].checkId(car_id);

          case 9:
            if (_context3.sent) {
              _context3.next = 13;
              break;
            }

            res.status(404).send({
              status: 404,
              error: "Car with id (".concat(car_id, ") does not exist.")
            });
            _context3.next = 15;
            break;

          case 13:
            req.body.email = req.token.email;
            next();

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validateUpdateCarPrice(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.validateUpdateCarPrice = validateUpdateCarPrice;

var validateViewACar =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res, next) {
    var car_id, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            car_id = req.params.car_id;
            result = _ValidateCar["default"].validateViewSpecficCarParams(car_id);

            if (!result.error) {
              _context4.next = 6;
              break;
            }

            res.status(400).send(_ValidateCar["default"].Response());
            _context4.next = 13;
            break;

          case 6:
            _context4.next = 8;
            return _CarChecker["default"].checkId(car_id);

          case 8:
            if (_context4.sent) {
              _context4.next = 12;
              break;
            }

            res.status(404).send({
              status: 404,
              error: "Car with id (".concat(car_id, ") do not exist.")
            });
            _context4.next = 13;
            break;

          case 12:
            next();

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function validateViewACar(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.validateViewACar = validateViewACar;

var validateViewCars = function validateViewCars(req, res, next) {
  var rQuery = req.query;
  var qLength = Object.keys(req.query).length;
  var isZero = qLength === 0;
  var isOne = qLength > 0 && qLength === 1;
  var isTwo = qLength > 0 && qLength === 2;
  var isThree = qLength > 0 && qLength === 3;

  if (isZero) {
    req.qLength = 0;
    next();
  } else if (isOne) {
    if (rQuery.status) {
      // getting all available cars
      var result = _ValidateCar["default"].validateViewUnsoldCarsQuery(rQuery.status);

      if (result.error) {
        res.status(400).send(_ValidateCar["default"].Response());
      } else {
        req.qLength = 1;
        next();
      }
    } else if (rQuery.owner) {
      // getting all cars of a particular owner
      var _result = _ValidateCar["default"].validateViewAllCarsOfOwner(rQuery.owner);

      var userId = parseInt(rQuery.owner, 10);

      if (_result.error) {
        res.status(400).send(_ValidateCar["default"].Response());
      } else if (userId !== req.token.id) {
        res.status(400).send({
          status: 400,
          error: 'invalid owner.'
        });
      } else {
        req.qLength = 1;
        next();
      }
    } else {
      res.status(400).send((0, _errorHandlers.errorInvalidQueryString)());
    }
  } else if (isTwo) {
    if (rQuery.status && rQuery.state) {
      var _result2 = _ValidateCar["default"].validateViewUnsoldNewCars(rQuery.status, rQuery.state);

      if (_result2.error) {
        res.status(400).send(_ValidateCar["default"].Response());
      } else {
        req.qLength = 2;
        next();
      }
    } else if (rQuery.status && rQuery.manufacturer) {
      var _result3 = _ValidateCar["default"].validateViewUnsoldCarsByManufacturer(rQuery.status, rQuery.manufacturer);

      if (_result3.error) {
        res.status(400).send(_ValidateCar["default"].Response());
      } else {
        req.qLength = 2;
        next();
      }
    } else res.status(400).send((0, _errorHandlers.errorInvalidQueryString)());
  } else if (isThree && rQuery.min_price && rQuery.max_price) {
    var _result4 = _ValidateCar["default"].validateViewUnsoldCarsInPriceRange(rQuery.status, rQuery.min_price, rQuery.max_price);

    if (_result4.error) {
      res.status(400).send(_ValidateCar["default"].Response());
    } else {
      req.qLength = 3;
      next();
    }
  } else {
    res.status(400).send((0, _errorHandlers.errorInvalidQueryString)());
  }
};

exports.validateViewCars = validateViewCars;

var validateDeleteCar =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res, next) {
    var car_id, result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            car_id = req.params.car_id;
            result = _ValidateCar["default"].validateDeleteACarParams(car_id);

            if (!result.error) {
              _context5.next = 6;
              break;
            }

            res.status(400).send(_ValidateCar["default"].Response());
            _context5.next = 17;
            break;

          case 6:
            if (req.token.is_admin) {
              _context5.next = 10;
              break;
            }

            res.status(403).send({
              status: 403,
              error: 'You are not an admin. Only admin are allowed to delete an Advert'
            });
            _context5.next = 17;
            break;

          case 10:
            _context5.next = 12;
            return _CarChecker["default"].checkId(car_id);

          case 12:
            if (_context5.sent) {
              _context5.next = 16;
              break;
            }

            res.status(404).send({
              status: 404,
              error: "Car with id (".concat(car_id, ") does not exist.")
            });
            _context5.next = 17;
            break;

          case 16:
            next();

          case 17:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function validateDeleteCar(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

exports.validateDeleteCar = validateDeleteCar;
//# sourceMappingURL=CarsMiddleware.js.map