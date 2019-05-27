/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import ordersService from '../services/OrdersService';
import carsService from '../services/CarsService';
import usersService from '../services/UsersService';
import Validator from '../helpers/ValidateOrder';

class OrdersController {
  makeOrder(req, res) {
    const {
      buyer, carId, amount,
    } = req.body;

    const validator = new Validator();
    const validOrderReq = validator.validateMakeOrderFields(buyer, carId, amount);

    if (validOrderReq.error) {
      res.status(404).send({
        status: 404,
        error: validOrderReq.data,
      });
    } else {
      let idErrors = false;
      const idErrorMessages = [];
      if (!usersService.getAllUsers()[parseInt(buyer, 10) - 1]) { // -1 because it's an array
        idErrors = true;
        idErrorMessages.push('Invalid buyer.');
      }
      if (!carsService.getAllCars()[parseInt(carId, 10) - 1]) { // -1 because it's an array
        idErrors = true;
        idErrorMessages.push('Invalid carId');
      }
      if (idErrors) {
        res.status(404).send({
          status: 404,
          error: idErrorMessages,
        });
      } else {
        const i = carId - 1;
        const carPrice = carsService.getCarById(i).price;
        const madeOrder = ordersService.order(buyer, carId, amount, carPrice);
        res.status(201).send({
          status: 201,
          data: madeOrder,
        });
      }
    }
  }
}

export default new OrdersController();
