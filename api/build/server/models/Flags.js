"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Database = _interopRequireDefault(require("../database/Database"));

var _Cars = _interopRequireDefault(require("./Cars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var db = new _Database["default"]();

var Flags =
/*#__PURE__*/
function () {
  function Flags() {
    _classCallCheck(this, Flags);
  }

  _createClass(Flags, [{
    key: "report",
    value: function () {
      var _report = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(flagData) {
        var queryString, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryString = "INSERT INTO flags (car_id, reason, description)\n      VALUES (".concat(flagData.carId, ", '").concat(flagData.reason, "', '").concat(flagData.description, "')\n      RETURNING id, car_id, reason, description;");
                _context.next = 3;
                return db.query(queryString);

              case 3:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function report(_x) {
        return _report.apply(this, arguments);
      }

      return report;
    }()
  }, {
    key: "getFlaggedCar",
    value: function () {
      var _getFlaggedCar = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(id) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Cars["default"].getCarById(id);

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getFlaggedCar(_x2) {
        return _getFlaggedCar.apply(this, arguments);
      }

      return getFlaggedCar;
    }()
  }]);

  return Flags;
}();

var _default = new Flags();

exports["default"] = _default;
//# sourceMappingURL=Flags.js.map