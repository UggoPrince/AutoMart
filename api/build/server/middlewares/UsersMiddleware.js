"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUserSignin = exports.validateUserSignup = void 0;

var _ValidateUser = _interopRequireDefault(require("./validators/ValidateUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var validateUserSignup = function validateUserSignup(req, res, next) {
  var _req$body = req.body,
      first_name = _req$body.first_name,
      last_name = _req$body.last_name,
      email = _req$body.email,
      password = _req$body.password,
      address = _req$body.address;

  var result = _ValidateUser["default"].validateSignupFields(first_name, last_name, email, password, address);

  if (result.error) {
    res.status(400).send(_ValidateUser["default"].Response());
  } else {
    next();
  }
};

exports.validateUserSignup = validateUserSignup;

var validateUserSignin =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body2, email, password, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
            result = _ValidateUser["default"].validateSigninFields(email, password);

            if (result.error) {
              res.status(400).send(_ValidateUser["default"].Response());
            } else {
              next();
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function validateUserSignin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.validateUserSignin = validateUserSignin;
//# sourceMappingURL=UsersMiddleware.js.map