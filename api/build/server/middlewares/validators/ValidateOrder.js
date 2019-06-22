"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Validator2 = _interopRequireDefault(require("./Validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ValidateOrder =
/*#__PURE__*/
function (_Validator) {
  _inherits(ValidateOrder, _Validator);

  function ValidateOrder() {
    _classCallCheck(this, ValidateOrder);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValidateOrder).apply(this, arguments));
  }

  _createClass(ValidateOrder, null, [{
    key: "validateMakeOrderFields",
    value: function validateMakeOrderFields(carId, amount) {
      ValidateOrder.refresh();
      ValidateOrder.isValidCarId(carId, 'carId'); // validate car id

      ValidateOrder.isValidAmount(amount, 'amount'); // validate buyer's price

      return ValidateOrder.getErrorMessage();
    }
  }, {
    key: "validateUpdateOrderFields",
    value: function validateUpdateOrderFields(newAmount, orderId) {
      ValidateOrder.isValidAmount(newAmount, 'newAmount'); // validate the new price that's to update old price

      ValidateOrder.isValidOrderId(orderId, 'orderId'); // validate the order's id

      return ValidateOrder.getErrorMessage();
    }
  }, {
    key: "isValidCarId",
    value: function isValidCarId(carId, field) {
      ValidateOrder.validateInt(carId, field);
    }
  }, {
    key: "isValidAmount",
    value: function isValidAmount(amount, field) {
      ValidateOrder.validateFloat(amount, field);
    }
  }, {
    key: "isValidOrderId",
    value: function isValidOrderId(orderId, field) {
      this.validateInt(orderId, field);
    }
  }]);

  return ValidateOrder;
}(_Validator2["default"]);

var _default = ValidateOrder;
exports["default"] = _default;
//# sourceMappingURL=ValidateOrder.js.map