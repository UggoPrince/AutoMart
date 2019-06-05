"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _OrdersService = _interopRequireDefault(require("../services/OrdersService"));

var _CarsService = _interopRequireDefault(require("../services/CarsService"));

var _UsersService = _interopRequireDefault(require("../services/UsersService"));

var _ValidateOrder = _interopRequireDefault(require("../helpers/ValidateOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    key: "makeOrder",
    value: function makeOrder(req, res) {
      var _req$body = req.body,
          buyer = _req$body.buyer,
          carId = _req$body.carId,
          amount = _req$body.amount;
      var validator = new _ValidateOrder["default"]();
      var validOrderReq = validator.validateMakeOrderFields(buyer, carId, amount);

      if (validOrderReq.error) {
        res.status(404).send({
          status: 404,
          error: validOrderReq.data
        });
      } else {
        var idErrors = false;
        var idErrorMessages = [];
        var deBuyer = parseInt(buyer, 10);
        var deCar = parseInt(carId, 10);

        if (!_UsersService["default"].getUserById(deBuyer).exist) {
          // -1 because it's an array
          idErrors = true;
          idErrorMessages.push('Invalid buyer. No buyer with such id.');
        }

        if (!_CarsService["default"].getCarById(deCar).exist) {
          // -1 because it's an array
          idErrors = true;
          idErrorMessages.push('Invalid carId. No car with such id.');
        }

        if (idErrors) {
          res.status(404).send({
            status: 404,
            error: idErrorMessages
          });
        } else {
          var carPrice = _CarsService["default"].getCarById(deCar).price;

          var madeOrder = _OrdersService["default"].order(buyer, carId, amount, carPrice);

          res.status(201).send({
            status: 201,
            data: madeOrder
          });
        }
      }
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      var amount = req.body.newAmount;
      var orderId = req.params.order_id;
      var validator = new _ValidateOrder["default"]();
      var validOrderUpdateReq = validator.validateUpdateOrderFields(amount, orderId);

      if (validOrderUpdateReq.error) {
        res.status(404).send({
          status: 404,
          error: validOrderUpdateReq.data
        });
      } else if (!_OrdersService["default"].getOrderById(parseInt(orderId, 10)).exist) {
        res.status(404).send({
          status: 404,
          error: 'Invalid orderId. No order with such id.'
        });
      } else {
        var id = parseInt(orderId, 10);

        var getOrderStatus = _OrdersService["default"].getOrderById(id).data.status;

        var statusError = false;
        var statusErrorMessages = '';

        if (getOrderStatus === 'accepted') {
          statusError = true;
          statusErrorMessages = 'Your order has been accepted and can not be updated anymore';
        } else if (getOrderStatus === 'rejected') {
          statusError = true;
          statusErrorMessages = 'Your order was rejected and can not be updated. Make a new order.';
        }

        if (statusError) {
          res.status(404).send({
            status: 404,
            error: statusErrorMessages
          });
        } else {
          var update = _OrdersService["default"].update(id, amount);

          res.status(200).send({
            status: 200,
            data: update
          });
        }
      }
    }
  }]);

  return OrdersController;
}();

var _default = new OrdersController();

exports["default"] = _default;
//# sourceMappingURL=OrdersController.js.map