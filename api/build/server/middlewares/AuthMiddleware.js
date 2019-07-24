"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _errorHandlers = require("../helpers/errorHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var AuthMiddleware =
/*#__PURE__*/
function () {
  function AuthMiddleware() {
    _classCallCheck(this, AuthMiddleware);
  }

  _createClass(AuthMiddleware, [{
    key: "signToken",
    value: function signToken(data) {
      return _jsonwebtoken["default"].sign(data, "".concat(process.env.tokenSecret), {
        expiresIn: process.env.tokenTime
      });
    }
  }, {
    key: "authenticate",
    value: function () {
      var _authenticate = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var sentToken, token, jwt;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                sentToken = req.get('Authorization');
                token = '';

                if (sentToken) {
                  _context.next = 6;
                  break;
                }

                res.status(401).send((0, _errorHandlers.errorNoHeader)());
                _context.next = 11;
                break;

              case 6:
                token = sentToken.slice(7, sentToken.length);
                _context.next = 9;
                return AuthMiddleware.verifyToken(token);

              case 9:
                jwt = _context.sent;

                if (jwt.tokenExp) {
                  res.status(401).send((0, _errorHandlers.errorExpiredToken)());
                } else {
                  req.token = jwt.decode;
                  next();
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function authenticate(_x, _x2, _x3) {
        return _authenticate.apply(this, arguments);
      }

      return authenticate;
    }()
  }], [{
    key: "verifyToken",
    value: function () {
      var _verifyToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(sentToken) {
        var token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
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
                token = _context2.sent;
                return _context2.abrupt("return", token);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function verifyToken(_x4) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);

  return AuthMiddleware;
}();

var _default = new AuthMiddleware();

exports["default"] = _default;
//# sourceMappingURL=AuthMiddleware.js.map