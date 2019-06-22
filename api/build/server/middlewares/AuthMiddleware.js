"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _JWT = _interopRequireDefault(require("../authentication/JWT"));

var _errorHandlers = require("../helpers/errorHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var authenticate =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var sentToken, jwt;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sentToken = req.get('Authentication');

            if (sentToken) {
              _context.next = 5;
              break;
            }

            res.status(401).send((0, _errorHandlers.errorNoHeader)());
            _context.next = 9;
            break;

          case 5:
            _context.next = 7;
            return _JWT["default"].verifyToken(sentToken);

          case 7:
            jwt = _context.sent;

            if (jwt.tokenExp) {
              res.status(401).send((0, _errorHandlers.errorExpiredToken)());
            } else {
              req.token = jwt.decode;
              next();
            }

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var _default = authenticate;
exports["default"] = _default;
//# sourceMappingURL=AuthMiddleware.js.map