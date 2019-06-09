"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _UsersService = _interopRequireDefault(require("../services/UsersService"));

var _ValidateUser = _interopRequireDefault(require("../helpers/ValidateUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    key: "getUser",
    value: function getUser(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          password = _req$body.password;
      var validator = new _ValidateUser["default"]();
      var validUserReq = validator.validateSigninFields(email, password);

      if (validUserReq.error) {
        res.status(404).send({
          status: 404,
          error: validUserReq.data
        });
      } else if (!_UsersService["default"].emailExist(email)) {
        res.status(404).send({
          status: 404,
          error: 'You don\'t have an account. Sign up now!'
        });
      } else {
        var userData = _UsersService["default"].signin(email, password);

        if (userData.valid) {
          res.status(200).send({
            status: 200,
            data: userData.user.data
          });
        } else {
          res.status(404).send({
            status: 404,
            error: 'Your email/password is incorrect.'
          });
        }
      }
    }
  }, {
    key: "addUser",
    value: function addUser(req, res) {
      var _req$body2 = req.body,
          firstname = _req$body2.firstname,
          lastname = _req$body2.lastname,
          email = _req$body2.email,
          password = _req$body2.password,
          address = _req$body2.address,
          phoneNumber = _req$body2.phoneNumber;
      var validator = new _ValidateUser["default"]();
      var validUserReq = validator.validateSignupFields(firstname, lastname, email, password, address, phoneNumber);

      if (validUserReq.error) {
        res.status(404).send({
          status: 404,
          error: validUserReq.data
        });
      } else if (_UsersService["default"].emailExist(email)) {
        res.status(404).send({
          status: 404,
          error: 'You already have an account. Sign in.'
        });
      } else {
        var addedUser = _UsersService["default"].signup(firstname, lastname, email, password, address, phoneNumber);

        res.status(201).send({
          status: 201,
          data: addedUser.data
        });
      }
    }
  }]);

  return UsersController;
}();

var _default = new UsersController();

exports["default"] = _default;
//# sourceMappingURL=UsersController.js.map