/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import Cars from '../models/Cars';

class CarsController {
  async addCar(req, res) {
    const reqBody = req.body;
    const carPhoto = req.files;

    const ownerEmail = await Cars.getOwnerEmailById(reqBody.owner);
    if (ownerEmail.rowCount === 0) {
      res.status(400).send({
        status: 400,
        error: `User with id (${reqBody.id}) do not exist.`,
      });
    } else {
      const result = await Cars.postAdvert(reqBody, carPhoto);
      result.rows[0].owner = ownerEmail.rows[0].email;
      res.status(201).send({
        status: 201,
        data: result.rows[0],
      });
    }
  }
}

export default new CarsController();
