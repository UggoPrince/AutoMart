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
