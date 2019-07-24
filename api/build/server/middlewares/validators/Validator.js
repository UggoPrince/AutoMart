"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var error = false;
var errorMessages = {};

var Validator =
/*#__PURE__*/
function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "integrateError",
    value: function integrateError(field, message) {
      error = true;
      errorMessages[field] = message;
    }
  }, {
    key: "isEmptyString",
    value: function isEmptyString(str) {
      var space = /^\s*$/;

      if (str === '' || str === null || str === undefined || space.test(str)) {
        return true;
      }

      return false;
    }
  }, {
    key: "validateInt",
    value: function validateInt(_int, field) {
      var intRegExp = /^\d+$/;

      if (Validator.isEmptyString(_int)) {
        Validator.integrateError(field, "No ".concat(field, " entered."));
      } else if (!intRegExp.test(_int) || _int === '0') {
        Validator.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "validateFloat",
    value: function validateFloat(_float, field) {
      var regExp = /^\d+(.{1}[\d]+)?$/;

      if (Validator.isEmptyString(_float)) {
        Validator.integrateError(field, "No ".concat(field, " entered."));
      } else if (!regExp.test(_float) || _float === '0' || _float === '0.0') {
        Validator.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "validateString",
    value: function validateString(str, field) {
      var regExp = /^[\w -.]+[^_]$/;

      if (Validator.isEmptyString(str)) {
        Validator.integrateError(field, "No ".concat(field, " entered."));
      } else if (!regExp.test(str)) {
        Validator.integrateError(field, "Invalid ".concat(field, "."));
      }
    }
  }, {
    key: "getErrorMessage",
    value: function getErrorMessage() {
      return {
        error: error,
        data: errorMessages
      };
    }
  }, {
    key: "Response",
    value: function Response() {
      return {
        status: 400,
        error: errorMessages
      };
    }
  }, {
    key: "refresh",
    value: function refresh() {
      error = false;
      errorMessages = {};
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports["default"] = _default;
//# sourceMappingURL=Validator.js.map