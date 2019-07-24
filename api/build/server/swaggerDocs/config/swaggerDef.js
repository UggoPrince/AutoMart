"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'REST API Documentation for AutoMart',
    // Title of the documentation
    version: '1.0.0',
    // Version of the app
    description: 'This documentation has all the datails on how to consume this api such as' + ' registering an account, creating a car advert and more.' + ' Note: all endpoints should be prefixed with "/api/v1/"' // short description of the app

  }
};

var dir = _path["default"].join(__dirname, '..', '/'); // options for the swagger docs


var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["".concat(dir, "/**/*.yaml")]
}; // initialize swagger-jsdoc

var _default = (0, _swaggerJsdoc["default"])(options);

exports["default"] = _default;
//# sourceMappingURL=swaggerDef.js.map