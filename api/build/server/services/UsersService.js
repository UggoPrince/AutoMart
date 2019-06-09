"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Users = _interopRequireDefault(require("../models/Users"));

var _users = _interopRequireDefault(require("../database/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersService =
/*#__PURE__*/
function () {
  function UsersService() {
    _classCallCheck(this, UsersService);

    this.users = _users["default"];
  }

  _createClass(UsersService, [{
    key: "getAllUsers",
    value: function getAllUsers() {
      return this.users.map(function (data) {
        var user = new _Users["default"]();
        user.id = data.id;
        user.firstname = data.firstname;
        user.lastname = data.lastname;
        user.email = data.email;
        user.password = data.password;
        user.address = data.address;
        user.is_admin = data.is_admin;
        user.phone_number = data.phone_number;
        return user;
      });
    }
  }, {
    key: "getUserById",
    value: function getUserById(id) {
      var users = this.getAllUsers();

      for (var i = 0; i < users.length; i += 1) {
        if (users[i].id === id) {
          return {
            exist: true,
            data: {
              token: '45erkjherht45495783',
              id: users[i].id,
              fisrtname: users[i].fisrtname,
              lastname: users[i].lastname,
              email: users[i].email,
              password: users[i].password,
              address: users[i].address,
              is_admin: users[i].is_admin,
              phone_number: users[i].phone_number
            }
          };
        }
      }

      return {
        exist: false,
        error: 'no such user with this id.'
      };
    }
  }, {
    key: "signin",
    value: function signin(email, password) {
      var valid = true;

      for (var i = 0; i < this.users.length; i += 1) {
        if (this.users[i].email === email && this.users[i].password === password) {
          return {
            valid: valid,
            user: this.getUserById(this.users[i].id)
          };
        }
      }

      return {
        valid: false,
        error: 'Invalid password.'
      };
    }
  }, {
    key: "signup",
    value: function signup(fisrtname, lastname, email, password, address, phoneNumber) {
      var allUsers = this.users.length;
      var id = allUsers + 1;
      var user = {
        id: id,
        fisrtname: fisrtname,
        lastname: lastname,
        email: email,
        password: password,
        address: address,
        is_admin: false,
        phone_number: phoneNumber
      };
      this.users.push(user);
      return this.getUserById(id);
    }
  }, {
    key: "emailExist",
    value: function emailExist(email) {
      for (var i = 0; i < this.users.length; i += 1) {
        if (this.users[i].email === email) return true;
      }

      return false;
    }
  }]);

  return UsersService;
}();

var _default = new UsersService();

exports["default"] = _default;
//# sourceMappingURL=UsersService.js.map