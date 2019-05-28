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
        idErrorMessages.push('Invalid buyer. No buyer with such id.');
      }
      if (!carsService.getAllCars()[parseInt(carId, 10) - 1]) { // -1 because it's an array
        idErrors = true;
        idErrorMessages.push('Invalid carId. No car with such id.');
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

  updateOrder(req, res) {
    const amount = req.body.newAmount;
    const orderId = req.params.order_id;
    const validator = new Validator();
    const validOrderUpdateReq = validator.validateUpdateOrderFields(amount, orderId);

    if (validOrderUpdateReq.error) {
      res.status(404).send({
        status: 404,
        error: validOrderUpdateReq.data,
      });
    } else if (!ordersService.getAllOrders()[orderId - 1]) { // -1 because it's an array
      res.status(404).send({
        status: 404,
        error: 'Invalid orderId. No order with such id.',
      });
    } else {
      const id = orderId - 1;
      const getOrderStatus = ordersService.getOrderById(id).status;
      let statusError = false;
      let statusErrorMessages = '';
      if (getOrderStatus === 'accepted') {
        statusError = true;
        statusErrorMessages = 'Your order has been accepted and can not be updated anymore';
      } else if (getOrderStatus === 'rejected') {
        statusError = true;
        statusErrorMessages = 'Your order was rejected and can not be updated. Make a new order.';
      }

      if (statusError) {
        res.status(404).send({
          status: 404,
          error: statusErrorMessages,
        });
      } else {
        const update = ordersService.update(id, amount);
        res.status(200).send({
          status: 200,
          data: update,
        });
      }
    }
  }
}

export default new OrdersController();
