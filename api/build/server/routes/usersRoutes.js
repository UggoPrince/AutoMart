"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UsersController = _interopRequireDefault(require("../controllers/UsersController"));

var _UsersMiddleware = _interopRequireDefault(require("../middlewares/UsersMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Router = _express["default"].Router();

Router.post('/auth/signup', _UsersMiddleware["default"].validateUserSignup, _UsersController["default"].addUser); // signup a user

Router.post('/auth/signin', _UsersMiddleware["default"].validateUserSignin, _UsersController["default"].getUser); // login a user

var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=usersRoutes.js.map