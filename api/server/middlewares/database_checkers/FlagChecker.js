/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import Flags from '../../models/Flags';

class FlagChecker {
  async checkFlaggedCar(car_id) {
    const car = await Flags.getFlaggedCar(car_id);
    if (car.rowCount > 0) return true;
    return false;
  }
}

export default new FlagChecker();
