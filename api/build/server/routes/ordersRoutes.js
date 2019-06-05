"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _OrdersController = _interopRequireDefault(require("../controllers/OrdersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router();

Router.post('/order/', _OrdersController["default"].makeOrder); // makes a purchase order

Router.patch('/order/:order_id/price', _OrdersController["default"].updateOrder); // update a purchase order

var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=ordersRoutes.js.map