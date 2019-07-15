"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Cars = _interopRequireDefault(require("../models/Cars"));

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
        var reqBody, car_photo, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reqBody = req.body;
                car_photo = '';

                if (req.body.img_url) {
                  car_photo = {
                    str: true,
                    image: req.body.img_url
                  };
                } else {
                  car_photo = {
                    str: false,
                    image: req.files
                  };
                }

                _context.next = 5;
                return _Cars["default"].postAdvert(reqBody, car_photo);

              case 5:
                result = _context.sent;
                res.status(201).send({
                  status: 201,
                  data: result.rows[0]
                });

              case 7:
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
    key: "updateCarStatus",
    value: function () {
      var _updateCarStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var reqBody, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                reqBody = req.body;
                reqBody.car_id = req.params.car_id;
                _context2.next = 4;
                return _Cars["default"].updateStatus(reqBody);

              case 4:
                result = _context2.sent;
                res.status(200).send({
                  status: 200,
                  data: result.rows[0]
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateCarStatus(_x3, _x4) {
        return _updateCarStatus.apply(this, arguments);
      }

      return updateCarStatus;
    }()
  }, {
    key: "updateCarPrice",
    value: function () {
      var _updateCarPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var reqBody, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                reqBody = req.body;
                reqBody.car_id = req.params.car_id;
                _context3.next = 4;
                return _Cars["default"].updatePrice(reqBody);

              case 4:
                result = _context3.sent;
                res.status(200).send({
                  status: 200,
                  data: result.rows[0]
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateCarPrice(_x5, _x6) {
        return _updateCarPrice.apply(this, arguments);
      }

      return updateCarPrice;
    }()
  }, {
    key: "getSpecificCar",
    value: function () {
      var _getSpecificCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var car_id, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                car_id = req.params.car_id;
                _context4.next = 3;
                return _Cars["default"].getCarById(car_id);

              case 3:
                result = _context4.sent;
                res.status(200).send({
                  status: 200,
                  data: result.rows[0]
                });

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getSpecificCar(_x7, _x8) {
        return _getSpecificCar.apply(this, arguments);
      }

      return getSpecificCar;
    }()
  }, {
    key: "getCars",
    value: function () {
      var _getCars = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var rQuery, result, _result, _result2, _result3, _result4;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                rQuery = req.query;

                if (!(req.qLength === 0)) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 4;
                return _Cars["default"].getAllCars();

              case 4:
                result = _context5.sent;
                res.status(200).send({
                  status: 200,
                  data: result.rows
                });
                _context5.next = 40;
                break;

              case 8:
                if (!(req.qLength === 1 && rQuery.status)) {
                  _context5.next = 15;
                  break;
                }

                _context5.next = 11;
                return _Cars["default"].getCarsByStatusAvailable();

              case 11:
                _result = _context5.sent;
                res.status(200).send({
                  status: 200,
                  data: _result.rows
                });
                _context5.next = 40;
                break;

              case 15:
                if (!(req.qLength === 1 && rQuery.owner)) {
                  _context5.next = 22;
                  break;
                }

                _context5.next = 18;
                return _Cars["default"].getCarByOwner(req.token.id);

              case 18:
                _result2 = _context5.sent;
                res.status(200).send({
                  status: 200,
                  data: _result2.rows
                });
                _context5.next = 40;
                break;

              case 22:
                if (!(req.qLength === 2)) {
                  _context5.next = 35;
                  break;
                }

                _result3 = '';

                if (!rQuery.state) {
                  _context5.next = 28;
                  break;
                }

                _context5.next = 27;
                return _Cars["default"].getCarsByStatusAndState('state', rQuery.state);

              case 27:
                _result3 = _context5.sent;

              case 28:
                if (!rQuery.manufacturer) {
                  _context5.next = 32;
                  break;
                }

                _context5.next = 31;
                return _Cars["default"].getCarsByStatusAndManufacturer('manufacturer', rQuery.manufacturer);

              case 31:
                _result3 = _context5.sent;

              case 32:
                res.status(200).send({
                  status: 200,
                  data: _result3.rows
                });
                _context5.next = 40;
                break;

              case 35:
                if (!(req.qLength === 3)) {
                  _context5.next = 40;
                  break;
                }

                _context5.next = 38;
                return _Cars["default"].getCarsByStatusAndPriceRange(rQuery.min_price, rQuery.max_price);

              case 38:
                _result4 = _context5.sent;
                res.status(200).send({
                  status: 200,
                  data: _result4.rows
                });

              case 40:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function getCars(_x9, _x10) {
        return _getCars.apply(this, arguments);
      }

      return getCars;
    }()
  }, {
    key: "deleteCar",
    value: function () {
      var _deleteCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(req, res) {
        var car_id;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                car_id = req.params.car_id;
                _context6.next = 3;
                return _Cars["default"].deleteAdvert(car_id);

              case 3:
                res.status(200).send({
                  status: 200,
                  data: 'Car Ad successfully deleted'
                });

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deleteCar(_x11, _x12) {
        return _deleteCar.apply(this, arguments);
      }

      return deleteCar;
    }()
  }]);

  return CarsController;
}();

var _default = new CarsController();

exports["default"] = _default;
//# sourceMappingURL=CarsController.js.map