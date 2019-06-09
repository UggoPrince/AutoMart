"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Flags = _interopRequireDefault(require("../models/Flags"));

var _flags = _interopRequireDefault(require("../database/flags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlagsService =
/*#__PURE__*/
function () {
  function FlagsService() {
    _classCallCheck(this, FlagsService);

    this.flags = _flags["default"];
  }

  _createClass(FlagsService, [{
    key: "getAllFlags",
    value: function getAllFlags() {
      return this.flags.map(function (data) {
        var flag = new _Flags["default"]();
        flag.id = data.id;
        flag.car_id = data.car_id;
        flag.created_on = data.created_on;
        flag.reason = data.reason;
        flag.description = data.description;
        return flag;
      });
    }
  }, {
    key: "report",
    value: function report(carId, reason, description) {
      var allFlags = this.flags.length;
      var id = allFlags + 1;
      var i = id - 1;
      var flag = {
        id: id,
        car_id: carId,
        created_on: Date.now(),
        reason: reason,
        description: description
      };
      this.flags.push(flag);
      var reportData = this.getAllFlags();
      return {
        id: reportData[i].id,
        car_id: reportData[i].car_id,
        reason: reportData[i].reason,
        description: reportData[i].description
      };
    }
  }]);

  return FlagsService;
}();

var _default = new FlagsService();

exports["default"] = _default;
//# sourceMappingURL=FlagsService.js.map