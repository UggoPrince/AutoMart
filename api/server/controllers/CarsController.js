/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Cars from '../models/Cars';

class CarsController {
  async addCar(req, res) {
    const reqBody = req.body;
    const carPhoto = req.files;

    const result = await Cars.postAdvert(reqBody, carPhoto);
    res.status(201).send({
      status: 201,
      data: result.rows[0],
    });
  }

  async updateCarStatus(req, res) {
    const reqBody = req.body;
    reqBody.carId = req.params.car_id;
    const result = await Cars.updateStatus(reqBody);
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async updateCarPrice(req, res) {
    const reqBody = req.body;
    reqBody.carId = req.params.car_id;
    const result = await Cars.updatePrice(reqBody);
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async getSpecificCar(req, res) {
    const carId = req.params.car_id;
    const result = await Cars.getACar(carId);
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async getCars(req, res) {
    const rQuery = req.query;
    if (req.qLength === 1) {
      const result = await Cars.getCarsByStatusAvailable();
      res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } else if (req.qLength === 3) {
      const result = await Cars.getCarsByStatusAndPriceRange(rQuery.min_price, rQuery.max_price);
      res.status(200).send({
        status: 200,
        data: result.rows,
      });
    }
  }

  async deleteCar(req, res) {
    const carId = req.params.car_id;
    await Cars.deleteAdvert(carId);
    res.status(200).send({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  }
}

export default new CarsController();
