"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Flags = _interopRequireDefault(require("../../models/Flags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlagChecker =
/*#__PURE__*/
function () {
  function FlagChecker() {
    _classCallCheck(this, FlagChecker);
  }

  _createClass(FlagChecker, [{
    key: "checkFlaggedCar",
    value: function () {
      var _checkFlaggedCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(carId) {
        var car;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Flags["default"].getFlaggedCar(carId);

              case 2:
                car = _context.sent;

                if (!(car.rowCount > 0)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", true);

              case 5:
                return _context.abrupt("return", false);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function checkFlaggedCar(_x) {
        return _checkFlaggedCar.apply(this, arguments);
      }

      return checkFlaggedCar;
    }()
  }]);

  return FlagChecker;
}();

var _default = new FlagChecker();

exports["default"] = _default;
//# sourceMappingURL=FlagChecker.js.map