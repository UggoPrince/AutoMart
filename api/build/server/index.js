"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerDef = _interopRequireDefault(require("./swaggerDocs/config/swaggerDef"));

var _usersRoutes = _interopRequireDefault(require("./routes/usersRoutes"));

var _carsRoutes = _interopRequireDefault(require("./routes/carsRoutes"));

var _ordersRoutes = _interopRequireDefault(require("./routes/ordersRoutes"));

var _flagsRoutes = _interopRequireDefault(require("./routes/flagsRoutes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
// Set up express app
var app = (0, _express["default"])(); // Log request to console

app.use((0, _morgan["default"])('dev')); // produce api documentation

app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(_swaggerDef["default"]);
});
app.use('/api/v1/api-docs', _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swaggerDef["default"])); // HOME PAGE

app.get('/', function (req, res) {
  res.status(200).send('<h1>Welcome to AutoMart API.</h1>' + '<span>Here is the documentation of version 1.0' + ' <a href="https://automarter.herokuapp.com/api/v1/api-docs/" target="blank">' + 'automarter.herokuapp.com/api/v1/api-docs/</a></span>');
}); // Parse incoming request data

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].json({
  type: 'application/json'
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/api/v1/', _usersRoutes["default"]);
app.use('/api/v1/', _carsRoutes["default"]);
app.use('/api/v1/', _ordersRoutes["default"]);
app.use('/api/v1/', _flagsRoutes["default"]);
app.use(function (req, res) {
  res.status(404).json('Not Found');
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=index.js.map