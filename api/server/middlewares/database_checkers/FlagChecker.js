/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Flags from '../../models/Flags';

class FlagChecker {
  async checkFlaggedCar(carId) {
    const car = await Flags.getFlaggedCar(carId);
    if (car.rowCount > 0) return true;
    return false;
  }
}

export default new FlagChecker();
