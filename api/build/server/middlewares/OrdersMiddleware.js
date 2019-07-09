"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUpdateOrderPrice = exports.validatePurchaseOrder = void 0;

var _ValidateOrder = _interopRequireDefault(require("./validators/ValidateOrder"));

var _OrderChecker = _interopRequireDefault(require("./database_checkers/OrderChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validatePurchaseOrder =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, car_id, amount, result, error, errorMessage, car;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, car_id = _req$body.car_id, amount = _req$body.amount;
            result = _ValidateOrder["default"].validateMakeOrderFields(car_id, amount);

            if (!result.error) {
              _context.next = 6;
              break;
            }

            res.status(400).send(_ValidateOrder["default"].Response());
            _context.next = 13;
            break;

          case 6:
            error = false;
            errorMessage = {};
            _context.next = 10;
            return _OrderChecker["default"].checkOrderedCar(car_id);

          case 10:
            car = _context.sent;

            if (car.error) {
              error = true;
              errorMessage.car_id = "Car with id (".concat(car_id, ") does not exist.");
            }

            if (error) {
              res.status(404).send({
                status: 404,
                error: errorMessage
              });
            } else {
              req.body.buyer = req.token.id;
              req.body.carPrice = car.data.price;
              next();
            }

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validatePurchaseOrder(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validatePurchaseOrder = validatePurchaseOrder;

var validateUpdateOrderPrice =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var amount, order_id, result, order;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            amount = req.body.amount;
            order_id = req.params.order_id;
            result = _ValidateOrder["default"].validateUpdateOrderFields(amount, order_id);

            if (!result.error) {
              _context2.next = 7;
              break;
            }

            res.status(400).send(_ValidateOrder["default"].Response());
            _context2.next = 11;
            break;

          case 7:
            _context2.next = 9;
            return _OrderChecker["default"].checkId(order_id);

          case 9:
            order = _context2.sent;

            if (order.error) {
              res.status(404).send({
                status: 404,
                error: "Order with id (".concat(order_id, ") does not exist.")
              });
            } else {
              req.body.old_amount = order.data.amount;
              next();
            }

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function validateUpdateOrderPrice(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.validateUpdateOrderPrice = validateUpdateOrderPrice;
//# sourceMappingURL=OrdersMiddleware.js.map