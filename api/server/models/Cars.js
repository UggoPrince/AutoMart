/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
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
    return result;
  }

  async getOwnerEmailById(id) {
    const queryString = `SELECT email FROM users WHERE id = '${id}';`;
    const result = await db.query(queryString);
    return result;
  }

  async getCarById(id) {
    const queryString = `SELECT * FROM cars WHERE id = '${id}';`;
    const result = await db.query(queryString);
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
}

export default new Cars();
