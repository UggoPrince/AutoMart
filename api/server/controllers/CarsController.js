/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */

import Cars from '../models/Cars';

class CarsController {
  async addCar(req, res) {
    const reqBody = req.body;
    const car_photo = req.files;

    const result = await Cars.postAdvert(reqBody, car_photo);
    res.status(201).send({
      status: 201,
      data: result.rows[0],
    });
  }

  async updateCarStatus(req, res) {
    const reqBody = req.body;
    reqBody.car_id = req.params.car_id;
    const result = await Cars.updateStatus(reqBody);
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async updateCarPrice(req, res) {
    const reqBody = req.body;
    reqBody.car_id = req.params.car_id;
    const result = await Cars.updatePrice(reqBody);
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async getSpecificCar(req, res) {
    const { car_id } = req.params;
    const result = await Cars.getCarById(car_id);
    res.status(200).send({
      status: 200,
      data: result.rows[0],
    });
  }

  async getCars(req, res) {
    const rQuery = req.query;
    if (req.qLength === 0) {
      const result = await Cars.getAllCars();
      res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } else if (req.qLength === 1 && rQuery.status) {
      const result = await Cars.getCarsByStatusAvailable();
      res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } else if (req.qLength === 1 && rQuery.owner) {
      const result = await Cars.getCarByOwner(req.token.id);
      res.status(200).send({
        status: 200,
        data: result.rows,
      });
    } else if (req.qLength === 2) {
      let result = '';
      if (rQuery.state) { result = await Cars.getCarsByStatusAndState('state', rQuery.state); }
      if (rQuery.manufacturer) {
        result = await Cars.getCarsByStatusAndManufacturer('manufacturer', rQuery.manufacturer);
      }
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
    const { car_id } = req.params;
    await Cars.deleteAdvert(car_id);
    res.status(200).send({
      status: 200,
      data: 'Car Ad successfully deleted',
    });
  }
}

export default new CarsController();
