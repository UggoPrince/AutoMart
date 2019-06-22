"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _OrdersController = _interopRequireDefault(require("../controllers/OrdersController"));

var _OrdersMiddleware = require("../middlewares/OrdersMiddleware");

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router(); // makes a purchase order


Router.post('/order/', [_AuthMiddleware["default"], _OrdersMiddleware.validatePurchaseOrder], _OrdersController["default"].makePurchaseOrder); // update a purchase order's price

Router.patch('/order/:order_id/price', [_AuthMiddleware["default"], _OrdersMiddleware.validateUpdateOrderPrice], _OrdersController["default"].updateOrderPrice);
var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=ordersRoutes.js.map