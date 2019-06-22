"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var JWT =
/*#__PURE__*/
function () {
  function JWT() {
    _classCallCheck(this, JWT);
  }

  _createClass(JWT, [{
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(sentToken) {
        var token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _jsonwebtoken["default"].verify(sentToken, "".concat(process.env.tokenSecret), function (err, decode) {
                  if (err) {
                    return {
                      tokenExp: true,
                      error: err
                    };
                  }

                  return {
                    tokenExp: false,
                    decode: decode
                  };
                });

              case 2:
                token = _context.sent;
                return _context.abrupt("return", token);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function verifyToken(_x) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  }, {
    key: "signToken",
    value: function signToken(data) {
      // const time = Math.floor(Date.now() / 1000) + process.env.tokenTime;
      // console.log(time);
      return _jsonwebtoken["default"].sign(data, "".concat(process.env.tokenSecret), {
        expiresIn: process.env.tokenTime
      });
    }
  }]);

  return JWT;
}();

var _default = new JWT();

exports["default"] = _default;
//# sourceMappingURL=JWT.js.map