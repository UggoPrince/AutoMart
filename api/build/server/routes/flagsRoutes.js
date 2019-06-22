"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _FlagsController = _interopRequireDefault(require("../controllers/FlagsController"));

var _FlagsMiddleware = _interopRequireDefault(require("../middlewares/FlagsMiddleware"));

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router(); // reports a fraudulent advert


Router.post('/flag', [_AuthMiddleware["default"], _FlagsMiddleware["default"]], _FlagsController["default"].reportAdvert);
var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=flagsRoutes.js.map