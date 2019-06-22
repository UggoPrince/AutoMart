"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ValidateFlag = _interopRequireDefault(require("./validators/ValidateFlag"));

var _FlagChecker = _interopRequireDefault(require("./database_checkers/FlagChecker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateReportAdvert =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, carId, reason, description, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, carId = _req$body.carId, reason = _req$body.reason, description = _req$body.description;
            result = _ValidateFlag["default"].validateReportAdvertFields(carId, reason, description);

            if (!result.error) {
              _context.next = 6;
              break;
            }

            res.status(400).send({
              status: 400,
              error: _ValidateFlag["default"].Response()
            });
            _context.next = 13;
            break;

          case 6:
            _context.next = 8;
            return _FlagChecker["default"].checkFlaggedCar(carId);

          case 8:
            if (_context.sent) {
              _context.next = 12;
              break;
            }

            res.status(404).send({
              status: 404,
              error: "Car with id (".concat(carId, ") does not exist.")
            });
            _context.next = 13;
            break;

          case 12:
            next();

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateReportAdvert(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = validateReportAdvert;
exports["default"] = _default;
//# sourceMappingURL=FlagsMiddleware.js.map