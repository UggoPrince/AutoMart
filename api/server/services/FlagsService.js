/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import Flags from '../models/Flags';
import flagsData from '../database/flags';

class FlagsService {
  constructor() {
    this.flags = flagsData;
  }

  getAllFlags() {
    return this.flags.map((data) => {
      const flag = new Flags();
      flag.id = data.id;
      flag.car_id = data.car_id;
      flag.created_on = data.created_on;
      flag.reason = data.reason;
      flag.description = data.description;
      return flag;
    });
  }

  report(carId, reason, description) {
    const allFlags = this.flags.length;
    const id = allFlags + 1;
    const i = id - 1;
    const flag = {
      id,
      car_id: carId,
      created_on: Date.now(),
      reason,
      description,
    };
    this.flags.push(flag);
    const reportData = this.getAllFlags();
    return {
      id: reportData[i].id,
      car_id: reportData[i].car_id,
      reason: reportData[i].reason,
      description: reportData[i].description,
    };
  }
}

export default new FlagsService();
