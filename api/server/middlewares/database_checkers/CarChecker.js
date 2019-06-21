/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Cars from '../../models/Cars';

class CarCheck {
  constructor() {
    this.ownerId = '';
  }

  async checkId(carId) {
    const car = await Cars.getCarById(carId);
    if (car.rowCount > 0) {
      this.ownerId = car.rows[0].owner;
      return true;
    }
    return false;
  }
}

export default new CarCheck();
