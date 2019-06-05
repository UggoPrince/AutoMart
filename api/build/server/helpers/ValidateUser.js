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

var ValidateUser =
/*#__PURE__*/
function (_Validator) {
  _inherits(ValidateUser, _Validator);

  function ValidateUser() {
    _classCallCheck(this, ValidateUser);

    return _possibleConstructorReturn(this, _getPrototypeOf(ValidateUser).call(this));
  }

  _createClass(ValidateUser, [{
    key: "validateSigninFields",
    value: function validateSigninFields(email, password) {
      this.isValidEmail(email, 'email'); // validate email

      this.isValidPassword(password, 'password'); // validate password

      return this.getErrorMessage();
    }
  }, {
    key: "validateSignupFields",
    value: function validateSignupFields(firstname, lastname, email, password, address, phoneNumber) {
      this.isValidName(firstname, 'firstname'); // validate firstname

      this.isValidName(lastname, 'lastname'); // validate lastname

      this.isValidAddress(address, 'address'); // validate address

      this.isValidEmail(email, 'email'); // validate email

      this.isValidPhoneNumber(phoneNumber, 'phone_number'); // validate phone number

      this.isValidPassword(password, 'password'); // validate password

      return this.getErrorMessage();
    }
  }, {
    key: "isValidName",
    value: function isValidName(name, field) {
      var nameRegExp = /^(?=.*[A-Za-z])+\w+[^_]$/;

      if (this.isEmptyString(name)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else if (!nameRegExp.test(name)) {
        this.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "isValidAddress",
    value: function isValidAddress(address, field) {
      var addRegExp = /^[a-zA-Z0-9\s,.'-]{3,}$/;

      if (this.isEmptyString(address)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else if (!addRegExp.test(address)) {
        this.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "isValidEmail",
    value: function isValidEmail(email, field) {
      var emailRegExp = /^(([^<>()\\[\]\\.,;:@"\x00-\x20\x7F]|\\.)+|("""([^\x0A\x0D"\\]|\\\\)+"""))@(([a-z]|#\d+?)([a-z0-9-]|#\d+?)*([a-z0-9]|#\d+?)\.)+([a-z]{2,4})$/i;

      if (this.isEmptyString(email)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else if (!emailRegExp.test(email)) {
        this.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "isValidPassword",
    value: function isValidPassword(password, field) {
      var passRegExp = /^(?=.*[A-Za-z])+(?=.*\d)[A-Za-z\d]{8,}$/; // /^[A-Za-z]\w{8,}$/;

      if (this.isEmptyString(password)) {
        this.integrateError(field, "".concat(field, " must have a letter, number and atleast 8 characters long."));
      } else if (!passRegExp.test(password)) {
        this.integrateError(field, "Invalid ".concat(field, ". password must have a letter, number and atleast 8 characters long."));
      }
    }
  }, {
    key: "isValidPhoneNumber",
    value: function isValidPhoneNumber(phoneNumber, field) {
      var telRegExp = /^(\+\d{1,3} ?)?(\(\d{1,5}\)|\d{1,5}) ?\d{3}?\d{0,7}( (x|xtn|ext|extn|pax|pbx|extension)?\.? ?\d{2-5})?$/i;

      if (this.isEmptyString(phoneNumber)) {
        this.integrateError(field, "No ".concat(field, " entered."));
      } else if (!telRegExp.test(phoneNumber)) {
        this.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }]);

  return ValidateUser;
}(_Validator2["default"]);

var _default = ValidateUser;
exports["default"] = _default;
//# sourceMappingURL=ValidateUser.js.map