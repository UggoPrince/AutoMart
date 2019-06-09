"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router();

Router.post('/auth/signup', _UsersController["default"].addUser); // signup a user

Router.post('/auth/signin', _UsersController["default"].getUser); // signin a user

var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=usersRoutes.js.map