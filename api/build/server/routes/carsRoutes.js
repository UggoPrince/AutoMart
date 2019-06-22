"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

var _CarsController = _interopRequireDefault(require("../controllers/CarsController"));

var _CarsMiddleware = require("../middlewares/CarsMiddleware");

var _AuthMiddleware = _interopRequireDefault(require("../middlewares/AuthMiddleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router();

var multipartMiddleware = (0, _connectMultiparty["default"])(); // add a car

Router.post('/car', [_AuthMiddleware["default"], multipartMiddleware, _CarsMiddleware.validateCreateAdvert], _CarsController["default"].addCar); // update car status

Router.patch('/car/:car_id/status', [_AuthMiddleware["default"], _CarsMiddleware.validateUpdateCarStatus], _CarsController["default"].updateCarStatus); // update the price of a car

Router.patch('/car/:car_id/price', [_AuthMiddleware["default"], _CarsMiddleware.validateUpdateCarPrice], _CarsController["default"].updateCarPrice); // view a specific car

Router.get('/car/:car_id', [_AuthMiddleware["default"], _CarsMiddleware.validateViewACar], _CarsController["default"].getSpecificCar); // get cars

Router.get('/car', [_AuthMiddleware["default"], _CarsMiddleware.validateViewCars], _CarsController["default"].getCars); // delete a car

Router["delete"]('/car/:car_id', [_AuthMiddleware["default"], _CarsMiddleware.validateDeleteCar], _CarsController["default"].deleteCar);
var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=carsRoutes.js.map