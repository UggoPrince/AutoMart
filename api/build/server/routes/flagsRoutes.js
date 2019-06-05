"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _FlagsController = _interopRequireDefault(require("../controllers/FlagsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router();

Router.post('/flag', _FlagsController["default"].reportAdvert); // reports a fraudulent advert

var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=flagsRoutes.js.map