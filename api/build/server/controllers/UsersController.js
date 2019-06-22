"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Users = _interopRequireDefault(require("../models/Users"));

var _JWT = _interopRequireDefault(require("../authentication/JWT"));

var _errorHandlers = require("../helpers/errorHandlers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "addUser",
    value: function () {
      var _addUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var reqBody, result, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reqBody = req.body;
                reqBody.isAdmin = false;
                _context.next = 4;
                return _Users["default"].signup(reqBody);

              case 4:
                result = _context.sent;

                if (result.name && result.name === 'error' && result.detail === "Key (email)=(".concat(reqBody.email, ") already exists.")) {
                  res.status(400).send({
                    status: 400,
                    error: (0, _errorHandlers.errorEmailDuplicate)()
                  });
                } else {
                  token = UsersController.prepareToken(result.rows[0]);
                  result.rows[0].token = token;
                  res.status(201).send({
                    status: 201,
                    data: result.rows[0]
                  });
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addUser(_x, _x2) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "getUser",
    value: function () {
      var _getUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var reqBody, result, token;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                reqBody = req.body;
                _context2.next = 3;
                return _Users["default"].signin(reqBody);

              case 3:
                result = _context2.sent;

                if (result.rowCount === 0) {
                  res.status(400).send({
                    status: 400,
                    error: (0, _errorHandlers.errorNoAccount)()
                  });
                } else if (result.rows[0].password !== reqBody.password) {
                  res.status(400).send({
                    status: 400,
                    error: (0, _errorHandlers.errorInvalidEmailPass)()
                  });
                } else {
                  token = UsersController.prepareToken(result.rows[0]);
                  result.rows[0].token = token;
                  res.status(200).send({
                    status: 200,
                    data: result.rows[0]
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getUser(_x3, _x4) {
        return _getUser.apply(this, arguments);
      }

      return getUser;
    }()
  }], [{
    key: "prepareToken",
    value: function prepareToken(userData) {
      var tokenData = {
        id: userData.id,
        email: userData.email,
        isAdmin: userData.is_admin
      };

      var token = _JWT["default"].signToken(tokenData);

      return token;
    }
  }]);

  return UsersController;
}();

var _default = new UsersController();

exports["default"] = _default;
//# sourceMappingURL=UsersController.js.map