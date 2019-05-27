/* eslint-disable linebreak-style */
export default class Orders {
  constructor() {
    this.id = null;
    this.buyer = null; // user id
    this.car_id = null; // car id
    this.amount = null; // price offered
    this.status = 'pending'; // [pending, accepted, or rejected]
    this.created_on = null;
  }
}
