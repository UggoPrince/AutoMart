"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Orders = _interopRequireDefault(require("../models/Orders"));

var _orders = _interopRequireDefault(require("../database/orders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrdersService =
/*#__PURE__*/
function () {
  function OrdersService() {
    _classCallCheck(this, OrdersService);

    this.orders = _orders["default"];
    this.carPrice = null;
  }

  _createClass(OrdersService, [{
    key: "getAllOrders",
    value: function getAllOrders() {
      return this.orders.map(function (data) {
        var order = new _Orders["default"]();
        order.id = data.id;
        order.buyer = data.buyer;
        order.car_id = data.buyer;
        order.amount = data.amount;
        order.status = data.status;
        order.created_on = data.created_on;
        return order;
      });
    }
  }, {
    key: "getOrderById",
    value: function getOrderById(id) {
      var orders = this.getAllOrders();

      for (var i = 0; i < orders.length; i += 1) {
        if (orders[i].id === id) {
          return {
            exist: true,
            data: {
              id: orders[i].id,
              car_id: orders[i].car_id,
              status: orders[i].status,
              price: this.carPrice,
              price_offered: orders[i].amount
            }
          };
        }
      }

      return {
        exist: false,
        error: 'no order with this id.'
      };
    }
  }, {
    key: "order",
    value: function order(buyer, carId, amount, carPrice) {
      this.carPrice = carPrice;
      var allOrders = this.orders.length;
      var id = allOrders + 1;
      var order = {
        id: id,
        buyer: buyer,
        car_id: carId,
        amount: amount,
        status: 'pending',
        created_on: Date.now()
      };
      this.orders.push(order);
      return this.getOrderById(id);
    }
  }, {
    key: "update",
    value: function update(id, newAmount) {
      var order = this.getOrderById(id).data;
      var oldAmount = order.price_offered;

      for (var i = 0; i < this.orders.length; i += 1) {
        if (this.orders[i].id === id) {
          this.orders[i].amount = newAmount;
        }
      }

      return {
        id: order.id,
        car_id: order.car_id,
        status: order.status,
        old_price_offered: oldAmount,
        new_price_offered: newAmount
      };
    }
  }]);

  return OrdersService;
}();

var _default = new OrdersService();

exports["default"] = _default;
//# sourceMappingURL=OrdersService.js.map