"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Cars = _interopRequireDefault(require("../../models/Cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CarCheck =
/*#__PURE__*/
function () {
  function CarCheck() {
    _classCallCheck(this, CarCheck);

    this.owner_id = '';
  }

  _createClass(CarCheck, [{
    key: "checkId",
    value: function () {
      var _checkId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(car_id) {
        var car;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Cars["default"].getCarById(car_id);

              case 2:
                car = _context.sent;

                if (!(car.rowCount > 0)) {
                  _context.next = 6;
                  break;
                }

                this.owner_id = car.rows[0].owner;
                return _context.abrupt("return", true);

              case 6:
                return _context.abrupt("return", false);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function checkId(_x) {
        return _checkId.apply(this, arguments);
      }

      return checkId;
    }()
  }]);

  return CarCheck;
}();

var _default = new CarCheck();

exports["default"] = _default;
//# sourceMappingURL=CarChecker.js.map