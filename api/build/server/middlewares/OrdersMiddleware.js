"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ValidateOrder = _interopRequireDefault(require("./validators/ValidateOrder"));

var _OrderChecker = _interopRequireDefault(require("./database_checkers/OrderChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersMiddleware =
/*#__PURE__*/
function () {
  function OrdersMiddleware() {
    _classCallCheck(this, OrdersMiddleware);
  }

  _createClass(OrdersMiddleware, [{
    key: "validatePurchaseOrder",
    value: function () {
      var _validatePurchaseOrder = _asyncToGenerator(
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

      function validatePurchaseOrder(_x, _x2, _x3) {
        return _validatePurchaseOrder.apply(this, arguments);
      }

      return validatePurchaseOrder;
    }()
  }, {
    key: "validateUpdateOrderPrice",
    value: function () {
      var _validateUpdateOrderPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var price, order_id, result, order;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                price = req.body.price;
                order_id = req.params.order_id;
                result = _ValidateOrder["default"].validateUpdateOrderFields(price, order_id);

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

      function validateUpdateOrderPrice(_x4, _x5, _x6) {
        return _validateUpdateOrderPrice.apply(this, arguments);
      }

      return validateUpdateOrderPrice;
    }()
  }, {
    key: "validateGetOrders",
    value: function () {
      var _validateGetOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res, next) {
        var rQuery, result, user_id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                rQuery = req.query;
                result = _ValidateOrder["default"].validateGetOrdersOfAUser(rQuery.buyer);
                user_id = parseInt(rQuery.buyer, 10);

                if (result.error) {
                  res.status(400).send(_ValidateOrder["default"].Response());
                } else if (user_id !== req.token.id) {
                  res.status(400).send({
                    status: 400,
                    error: 'invalid buyer.'
                  });
                } else {
                  req.qLength = 1;
                  next();
                }

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function validateGetOrders(_x7, _x8, _x9) {
        return _validateGetOrders.apply(this, arguments);
      }

      return validateGetOrders;
    }()
  }]);

  return OrdersMiddleware;
}();

var _default = new OrdersMiddleware();

exports["default"] = _default;
//# sourceMappingURL=OrdersMiddleware.js.map