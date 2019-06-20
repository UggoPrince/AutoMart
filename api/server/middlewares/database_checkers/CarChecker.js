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

  async checkCarOwner(ownerId) {
    const owner = await Cars.getCarOwner(ownerId);
    if (owner.rowCount > 0) return { error: false, email: owner.rows[0].email };
    return { error: true };
  }
}

export default new CarCheck();
