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
    const orders = this.getAllOrders();
    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].id === id) {
        return {
          exist: true,
          data: {
            id: orders[i].id,
            car_id: orders[i].car_id,
            status: orders[i].status,
            price: this.carPrice,
            price_offered: orders[i].amount,
          },
        };
      }
    }
    return { exist: false, error: 'no order with this id.' };
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
    return this.getOrderById(id);
  }

  update(id, newAmount) {
    const order = this.getOrderById(id).data;
    const oldAmount = order.price_offered;
    for (let i = 0; i < this.orders.length; i += 1) {
      if (this.orders[i].id === id) {
        this.orders[i].amount = newAmount;
      }
    }
    return {
      id: order.id,
      car_id: order.car_id,
      status: order.status,
      old_price_offered: oldAmount,
      new_price_offered: newAmount,
    };
  }
}

export default new OrdersService();
