/* eslint-disable camelcase */
import Cars from '../../models/Cars';

class CarCheck {
  constructor() {
    this.owner_id = '';
  }

  async checkId(car_id) {
    const car = await Cars.getCarById(car_id);
    if (car.rowCount > 0) {
      this.owner_id = car.rows[0].owner;
      return true;
    }
    return false;
  }
}

export default new CarCheck();
