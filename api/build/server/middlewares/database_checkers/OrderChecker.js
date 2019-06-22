"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orders = _interopRequireDefault(require("../../models/Orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CheckOrder =
/*#__PURE__*/
function () {
  function CheckOrder() {
    _classCallCheck(this, CheckOrder);
  }

  _createClass(CheckOrder, [{
    key: "checkId",
    value: function () {
      var _checkId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(orderId) {
        var order;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Orders["default"].getOrderById(orderId);

              case 2:
                order = _context.sent;

                if (!(order.rowCount > 0)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", {
                  error: false,
                  data: order.rows[0]
                });

              case 5:
                return _context.abrupt("return", {
                  error: true
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkId(_x) {
        return _checkId.apply(this, arguments);
      }

      return checkId;
    }()
  }, {
    key: "checkOrderedCar",
    value: function () {
      var _checkOrderedCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(carId) {
        var car;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Orders["default"].getOrderedCar(carId);

              case 2:
                car = _context2.sent;

                if (!(car.rowCount > 0)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", {
                  error: false,
                  data: car.rows[0]
                });

              case 5:
                return _context2.abrupt("return", {
                  error: true
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function checkOrderedCar(_x2) {
        return _checkOrderedCar.apply(this, arguments);
      }

      return checkOrderedCar;
    }()
  }]);

  return CheckOrder;
}();

var _default = new CheckOrder();

exports["default"] = _default;
//# sourceMappingURL=OrderChecker.js.map