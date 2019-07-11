"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Database = _interopRequireDefault(require("../database/Database"));

var _Cars = _interopRequireDefault(require("./Cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = new _Database["default"]();

var Orders =
/*#__PURE__*/
function () {
  function Orders() {
    _classCallCheck(this, Orders);
  }

  _createClass(Orders, [{
    key: "makeOrder",
    value: function () {
      var _makeOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(orderData) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "\n      INSERT INTO orders (buyer, car_id, amount)\n      VALUES ('".concat(orderData.buyer, "', '").concat(orderData.car_id, "', '").concat(orderData.amount, "')\n      RETURNING id, car_id, created_on, status, amount;");
                _context.next = 3;
                return db.query(queryString);

              case 3:
                result = _context.sent;
                result.rows[0].price = orderData.price;
                return _context.abrupt("return", result);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function makeOrder(_x) {
        return _makeOrder.apply(this, arguments);
      }

      return makeOrder;
    }()
  }, {
    key: "getOrderedCar",
    value: function () {
      var _getOrderedCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var car;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Cars["default"].getCarById(id);

              case 2:
                car = _context2.sent;
                return _context2.abrupt("return", car);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getOrderedCar(_x2) {
        return _getOrderedCar.apply(this, arguments);
      }

      return getOrderedCar;
    }()
  }, {
    key: "getOrderById",
    value: function () {
      var _getOrderById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(id) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                queryString = "SELECT * FROM orders WHERE id = '".concat(id, "';");
                _context3.next = 3;
                return db.query(queryString);

              case 3:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getOrderById(_x3) {
        return _getOrderById.apply(this, arguments);
      }

      return getOrderById;
    }()
  }, {
    key: "getOrderByBuyer",
    value: function () {
      var _getOrderByBuyer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(buyer) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                queryString = "\n      SELECT orders.id, car_id, orders.created_on, amount, orders.status,\n      cars.state car_state, cars.status car_status, cars.price car_price, title,\n      manufacturer, model, body_type, photos\n      FROM cars FULL JOIN orders ON cars.id = orders.car_id\n      WHERE orders.buyer=".concat(buyer, ";");
                _context4.next = 3;
                return db.query(queryString);

              case 3:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function getOrderByBuyer(_x4) {
        return _getOrderByBuyer.apply(this, arguments);
      }

      return getOrderByBuyer;
    }()
  }, {
    key: "updatePrice",
    value: function () {
      var _updatePrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(orderData) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                queryString = "\n    UPDATE orders SET amount = '".concat(orderData.amount, "'\n    WHERE id = '").concat(orderData.order_id, "' AND status = 'pending'\n    RETURNING id, car_id, status, amount;");
                _context5.next = 3;
                return db.query(queryString);

              case 3:
                result = _context5.sent;
                return _context5.abrupt("return", result);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function updatePrice(_x5) {
        return _updatePrice.apply(this, arguments);
      }

      return updatePrice;
    }()
  }]);

  return Orders;
}();

var _default = new Orders();

exports["default"] = _default;
//# sourceMappingURL=Orders.js.map