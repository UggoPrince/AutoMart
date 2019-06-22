"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orders = _interopRequireDefault(require("../models/Orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersController =
/*#__PURE__*/
function () {
  function OrdersController() {
    _classCallCheck(this, OrdersController);
  }

  _createClass(OrdersController, [{
    key: "makePurchaseOrder",
    value: function () {
      var _makePurchaseOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var reqBody, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reqBody = req.body;
                _context.next = 3;
                return _Orders["default"].makeOrder(reqBody);

              case 3:
                result = _context.sent;
                result.rows[0].price_offered = result.rows[0].amount;
                delete result.rows[0].amount;
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

      function makePurchaseOrder(_x, _x2) {
        return _makePurchaseOrder.apply(this, arguments);
      }

      return makePurchaseOrder;
    }()
  }, {
    key: "updateOrderPrice",
    value: function () {
      var _updateOrderPrice = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var reqBody, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                reqBody = req.body;
                reqBody.orderId = req.params.order_id;
                _context2.next = 4;
                return _Orders["default"].updatePrice(reqBody);

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

      function updateOrderPrice(_x3, _x4) {
        return _updateOrderPrice.apply(this, arguments);
      }

      return updateOrderPrice;
    }()
  }]);

  return OrdersController;
}();

var _default = new OrdersController();

exports["default"] = _default;
//# sourceMappingURL=OrdersController.js.map