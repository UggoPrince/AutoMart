/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import carsService from '../services/CarsService';
import Validator from '../helpers/ValidateCar';
import usersService from '../services/UsersService';

class CarsController {
  async addCar(req, res) {
    const {
      owner, state, status, price, title, manufacturer, model, bodyType,
    } = req.body;
    const myPhoto = req.files;

    const validator = new Validator();
    const validCarReq = validator.validateCreateAdvertFields(
      owner, state, status, price, title, manufacturer, model, bodyType, myPhoto,
    );

    if (validCarReq.error) {
      res.status(404).send({
        status: 404,
        error: validCarReq.data,
      });
    } else if (!usersService.getUserById(parseInt(owner, 10)).exist) {
      res.status(404).send({
        status: 404,
        error: 'Invalid owner',
      });
    } else {
      const ownerId = parseInt(owner, 10);
      const ownerEmail = usersService.getUserById(ownerId).data.email;
      const addedCar = await carsService.createAdvert(
        owner, state, status, price, title, manufacturer, model, bodyType, myPhoto, ownerEmail,
      );
      res.status(201).send({
        status: 201,
        data: addedCar.data,
      });
    }
  }

  getACar(req, res) {
    const carId = req.params.car_id;
    const validator = new Validator();
    const validGetCarReq = validator.validateGetSpecficCar(carId);
    if (validGetCarReq.error) {
      res.status(404).send({
        status: 404,
        error: validGetCarReq.data,
      });
    } else if (!carsService.getCarById(parseInt(carId, 10)).exist) {
      res.status(404).send({
        status: 404,
        error: 'Invalid carId. There is no car with this id.',
      });
    } else {
      const id = parseInt(carId, 10);
      const { car } = carsService.getCarById(id);
      res.status(200).send({
        status: 200,
        data: car,
      });
    }
  }

  getCars(req, res) {
    const rQuery = req.query;
    const qLength = Object.keys(req.query).length;
    const validator = new Validator();
    const isOne = qLength > 0 && qLength === 1;
    const isThree = qLength > 0 && qLength === 3;

    if (isOne) { // process request for getting unsold cars only
      const validQuery = validator.validateGetUnsoldCars(rQuery.status);
      if (validQuery.error) {
        res.status(404).send({
          status: 404,
          error: validQuery.data,
        });
      } else {
        const unsoldCars = carsService.getCarsByStatus(rQuery.status);
        res.status(200).send({
          status: 200,
          data: unsoldCars,
        });
      }
    } else if (isThree) { // process request for getting unsold cars on a certain price range
      const validQuery = validator.validateGetUnsoldCarsInPriceRange(
        rQuery.status, rQuery.min_price, rQuery.max_price,
      );
      if (validQuery.error) {
        res.status(404).send({
          status: 404,
          error: validQuery.data,
        });
      } else {
        const unsoldCarsInPriceRange = carsService.getCarsByStatusAndPriceRange(
          rQuery.status, rQuery.min_price, rQuery.max_price,
        );
        res.status(200).send({
          status: 200,
          data: unsoldCarsInPriceRange,
        });
      }
    } else {
      res.status(404).send({
        status: 404,
        error: 'The query string (with its value) is not valid.',
      });
    }
  }

  updateCarStatus(req, res) {
    const { newStatus } = req.body;
    const carId = req.params.car_id;
    const validator = new Validator();
    const validUpdateReq = validator.validateUpdateCarStatusFields(carId, newStatus);
    if (validUpdateReq.error) {
      res.status(404).send({
        status: 404,
        error: validUpdateReq.data,
      });
    } else if (!carsService.getCarById(parseInt(carId, 10)).exist) {
      res.status(404).send({
        status: 404,
        error: 'Invalid carId. There is no car with this id.',
      });
    } else {
      const id = parseInt(carId, 10);
      const carOwner = carsService.getCarOwner(id);
      const ownerEmail = usersService.getUserById(carOwner).data.email;
      const newStatusUpdate = carsService.updateStatus(id, newStatus, ownerEmail);
      res.status(200).send({
        status: 200,
        data: newStatusUpdate,
      });
    }
  }

  updateCarPrice(req, res) {
    const { newPrice } = req.body;
    const carId = req.params.car_id;
    const validator = new Validator();
    const validUpdateCarPriceReq = validator.validatUpdateCarPriceFields(carId, newPrice);
    if (validUpdateCarPriceReq.error) {
      res.status(404).send({
        status: 404,
        error: validUpdateCarPriceReq.data,
      });
    } else if (!carsService.getCarById(parseInt(carId, 10)).exist) {
      res.status(404).send({
        status: 404,
        error: 'Invalid carId. There is no car with this id.',
      });
    } else {
      const id = parseInt(carId, 10);
      const carOwner = carsService.getCarOwner(id);
      const ownerEmail = usersService.getUserById(carOwner).data.email;
      const newPriceUpdate = carsService.updatePrice(id, newPrice, ownerEmail);
      res.status(200).send({
        status: 200,
        data: newPriceUpdate,
      });
    }
  }
}

export default new CarsController();
