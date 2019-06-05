"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable linebreak-style */
var Orders = function Orders() {
  _classCallCheck(this, Orders);

  this.id = null;
  this.buyer = null; // user id

  this.car_id = null; // car id

  this.amount = null; // price offered

  this.status = 'pending'; // [pending, accepted, or rejected]

  this.created_on = null;
};

exports["default"] = Orders;
//# sourceMappingURL=Orders.js.map