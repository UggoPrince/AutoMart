/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import Orders from '../models/Orders';
import ordersData from '../database/orders';

class OrdersService {
  constructor() {
    this.orders = ordersData;
    this.carPrice = null;
  }

  getAllOrders() {
    return this.orders.map((data) => {
      const order = new Orders();
      order.id = data.id;
      order.buyer = data.buyer;
      order.car_id = data.buyer;
      order.amount = data.amount;
      order.status = data.status;
      order.created_on = data.created_on;
      return order;
    });
  }

  getOrderById(id) {
    const order = this.getAllOrders()[id];
    return {
      id: order.id,
      car_id: order.car_id,
      status: order.status,
      price: this.carPrice,
      price_offered: order.amount,
    };
  }

  order(buyer, carId, amount, carPrice) {
    this.carPrice = carPrice;
    const allOrders = this.orders.length;
    const id = allOrders + 1;
    const order = {
      id,
      buyer,
      car_id: carId,
      amount,
      status: 'pending',
      created_on: Date.now(),
    };
    this.orders.push(order);
    const index = id - 1;
    return this.getOrderById(index);
  }
}

export default new OrdersService();
