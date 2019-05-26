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
    } else if (!usersService.getAllUsers()[parseInt(owner, 10) - 1]) { // -1 because it's an array
      res.status(404).send({
        status: 404,
        error: 'Invalid owner',
      });
    } else {
      const ownerId = owner - 1;
      const ownerEmail = usersService.getUserById(ownerId).email;
      const addedCar = await carsService.createAdvert(
        owner, state, status, price, title, manufacturer, model, bodyType, myPhoto, ownerEmail,
      );
      res.status(201).send({
        status: 201,
        data: addedCar,
      });
    }
  }
}

export default new CarsController();
