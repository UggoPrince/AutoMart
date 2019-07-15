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
  async postAdvert(carData, car_photo) {
    // check if user for this car exist
    let img = '';
    if (car_photo.str) img = car_photo.image;
    else if (!car_photo.str) {
      const uploadedImg = await this.uploadImage(car_photo.image);
      img = uploadedImg.url;
    }
    const queryString = `
      INSERT INTO cars (
        owner, state, status, price, title, manufacturer, model, body_type, image_url
        )
      VALUES (
        '${carData.owner}', '${carData.state}', '${carData.status}',
        '${carData.price}', '${carData.title}', '${carData.manufacturer}',
        '${carData.model}', '${carData.body_type}', '${img}'
      )
      RETURNING *;
    `;
    const result = await db.query(queryString);
    const {
      id, created_on, state, status, price, title, manufacturer, model, body_type, image_url,
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
      image_url,
    };
    return result;
  }

  async uploadImage(car_photo) {
    const filePath = car_photo.img_url.path;
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

  async getCarByOwner(owner) {
    const queryString = `SELECT * FROM cars WHERE owner = ${owner};`;
    const result = await db.query(queryString);
    return result;
  }

  /* async getACar(id) {
    const result = await this.getCarById(id);
    return result;
  } */

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

  async updater(car_id, field, value, ownerEmail) {
    const queryString = `UPDATE cars SET ${field} = '${value}'
    WHERE id = '${car_id}' RETURNING *;`;
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
    const result = await this.updater(carData.car_id, 'status', 'sold', carData.email);
    return result;
  }

  async updatePrice(carData) {
    const result = await this.updater(carData.car_id, 'price', carData.price, carData.email);
    return result;
  }

  async deleteAdvert(car_id) {
    const queryString = `DELETE FROM cars WHERE id ='${car_id}';`;
    const result = await db.query(queryString);
    return result;
  }
}

export default new Cars();
