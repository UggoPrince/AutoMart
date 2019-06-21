/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import cloudiner from 'cloudinary';
import dotenv from 'dotenv';
import Database from '../database/Database';

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
    const {
      id, created_on, state, status, price, title, manufacturer, model, body_type, photos,
    } = result.rows[0];
    result.rows[0] = {
      id,
      email: carData.email,
      created_on,
      state,
      status,
      price,
      title,
      manufacturer,
      model,
      body_type,
      photos,
    };
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

  async getCarById(id) {
    const queryString = `SELECT * FROM cars WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }

  async getACar(id) {
    const result = await this.getCarById(id);
    return result;
  }

  async getAllCars() {
    const queryString = 'SELECT * FROM cars;';
    const result = await db.query(queryString);
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

  async getCarsByStatusAndState(field, state) {
    const queryString = `SELECT * FROM cars WHERE status = 'available'
      AND ${field} = '${state}';`;
    const result = db.query(queryString);
    return result;
  }

  async getCarsByStatusAndManufacturer(field, manufacturer) {
    const queryString = `SELECT * FROM cars WHERE status = 'available'
      AND ${field} ~* '${manufacturer}';`;
    const result = db.query(queryString);
    return result;
  }

  async updater(carId, field, value, ownerEmail) {
    const queryString = `UPDATE cars SET ${field} = '${value}'
    WHERE id = '${carId}' RETURNING *;`;
    const result = await db.query(queryString);
    const {
      // eslint-disable-next-line no-unused-vars
      id, created_on, state, status, price, title, manufacturer, model, body_type, photos,
    } = result.rows[0];
    result.rows[0] = {
      id,
      email: ownerEmail,
      created_on,
      state,
      status,
      price,
      title,
      manufacturer,
      model,
      body_type,
      photos,
    };
    return result;
  }

  async updateStatus(carData) {
    const carStatus = carData.newStatus.toLowerCase();
    const result = await this.updater(carData.carId, 'status', carStatus, carData.email);
    return result;
  }

  async updatePrice(carData) {
    const result = await this.updater(carData.carId, 'price', carData.newPrice, carData.email);
    return result;
  }

  async deleteAdvert(carId) {
    const queryString = `DELETE FROM cars WHERE id ='${carId}';`;
    const result = await db.query(queryString);
    return result;
  }
}

export default new Cars();
