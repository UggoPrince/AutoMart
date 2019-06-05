"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _connectMultiparty = _interopRequireDefault(require("connect-multiparty"));

var _CarsController = _interopRequireDefault(require("../controllers/CarsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable linebreak-style */
var Router = _express["default"].Router();

var multipartMiddleware = (0, _connectMultiparty["default"])();
Router.post('/car', multipartMiddleware, _CarsController["default"].addCar); // add a car

Router.patch('/car/:car_id/status', _CarsController["default"].updateCarStatus); // update car status

Router.patch('/car/:car_id/price', _CarsController["default"].updateCarPrice); // update the price of a car

Router.get('/car/:car_id', _CarsController["default"].getACar); // get a specific car

Router.get('/car', _CarsController["default"].getCars); // get cars

Router["delete"]('/car/:car_id', _CarsController["default"].deleteCar); // delete a car

var _default = Router;
exports["default"] = _default;
//# sourceMappingURL=carsRoutes.js.map