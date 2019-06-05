"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FlagsService = _interopRequireDefault(require("../services/FlagsService"));

var _CarsService = _interopRequireDefault(require("../services/CarsService"));

var _ValidateFlag = _interopRequireDefault(require("../helpers/ValidateFlag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlagsController =
/*#__PURE__*/
function () {
  function FlagsController() {
    _classCallCheck(this, FlagsController);
  }

  _createClass(FlagsController, [{
    key: "reportAdvert",
    value: function reportAdvert(req, res) {
      var _req$body = req.body,
          carId = _req$body.carId,
          reason = _req$body.reason,
          description = _req$body.description;
      var validator = new _ValidateFlag["default"]();
      var validFlagReq = validator.validateReportAdvertFields(carId, reason, description);

      if (validFlagReq.error) {
        res.status(404).send({
          status: 404,
          error: validFlagReq.data
        });
      } else if (!_CarsService["default"].getCarById(parseInt(carId, 10)).exist) {
        res.status(404).send({
          status: 404,
          error: 'Invalid carId. There is no car with this id.'
        });
      } else {
        var report = _FlagsService["default"].report(carId, reason, description);

        res.status(201).send({
          status: 201,
          data: report
        });
      }
    }
  }]);

  return FlagsController;
}();

var _default = new FlagsController();

exports["default"] = _default;
//# sourceMappingURL=FlagsController.js.map