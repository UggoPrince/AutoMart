/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
import cloudiner from 'cloudinary';
import dotenv from 'dotenv';
import Database from '../database/Database';
import Users from './Users';

dotenv.config();
const cloudinary = cloudiner.v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const db = new Database();

class Cars {
  async postAdvert(carData, carPhoto) {
    // check if user for this car exist
    const uploadedImg = await this.uploadImage(carPhoto);
    const queryString = `
      INSERT INTO cars (
        owner, state, status, price, title, manufacturer, model, body_type, photos
        )
      VALUES (
        '${carData.owner}', '${carData.state}', '${carData.status}',
        '${carData.price}', '${carData.title}', '${carData.manufacturer}',
        '${carData.model}', '${carData.bodyType}', '{${uploadedImg.url}}'
      )
      RETURNING *;
    `;
    const result = await db.query(queryString);
    result.rows[0].owner = carData.email;
    result.rows[0].email = result.rows[0].owner;
    delete result.rows[0].owner;
    return result;
  }

  async uploadImage(carPhoto) {
    const filePath = carPhoto.photo.path;
    const uploadedImg = await cloudinary.uploader.upload(filePath, {
      folder: process.env.CLOUDINARY_AUTOMART_FOLDER,
      use_filename: true,
    }, (err, result) => result);
    return uploadedImg;
  }

  async getCarOwner(id) {
    const result = await Users.getUserById(id);
    return result;
  }

  async getCarById(id) {
    const queryString = `SELECT * FROM cars WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }

  async getACar(id) {
    const result = await this.getCarById(id);
    return result;
  }

  async getCarsByStatusAvailable() {
    const queryString = 'SELECT * FROM cars WHERE status = \'available\';';
    const result = db.query(queryString);
    return result;
  }

  async getCarsByStatusAndPriceRange(min, max) {
    const queryString = `SELECT * FROM cars WHERE status = 'available'
      AND price BETWEEN ${min} AND ${max};`;
    const result = db.query(queryString);
    return result;
  }

  async updater(carId, field, value) {
    const car = await this.getCarById(carId);
    const owner = await this.getCarOwner(car.rows[0].owner);
    const queryString = `UPDATE cars SET ${field} = '${value}'
    WHERE id = '${carId}' RETURNING *;`;
    const result = await db.query(queryString);
    result.rows[0].owner = owner.rows[0].email;
    return result;
  }

  async updateStatus(carData) {
    const carStatus = carData.newStatus.toLowerCase();
    const result = await this.updater(carData.carId, 'status', carStatus);
    return result;
  }

  async updatePrice(carData) {
    const result = await this.updater(carData.carId, 'price', carData.newPrice);
    return result;
  }

  async deleteAdvert(carId) {
    const queryString = `DELETE FROM cars WHERE id ='${carId}';`;
    const result = await db.query(queryString);
    return result;
  }
}

export default new Cars();
