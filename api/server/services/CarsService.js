/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
import cloudiner from 'cloudinary';
import dotenv from 'dotenv';
import Cars from '../models/Cars';
import carsData from '../database/cars';

dotenv.config();
const cloudinary = cloudiner.v2;
// cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CarsService {
  constructor() {
    this.cars = carsData;
    this.userEmail = null;
  }

  getAllCars() {
    return this.cars.map((data) => {
      const car = new Cars();
      car.id = data.id;
      car.owner = data.owner;
      car.created_on = data.created_on;
      car.state = data.state;
      car.status = data.status;
      car.price = data.price;
      car.title = data.title;
      car.manufacturer = data.manufacturer;
      car.model = data.model;
      car.body_type = data.body_type;
      car.photo = data.photo;
      return car;
    });
  }

  getCarById(id) {
    const car = this.getAllCars()[id];
    return {
      id: car.id,
      email: this.userEmail,
      created_on: car.created_on,
      manufacturer: car.manufacturer,
      model: car.model,
      body_type: car.body_type,
      state: car.state,
      status: car.status,
      price: car.price,
      title: car.title,
      photo: car.photo,
    };
  }

  async createAdvert(
    owner, state, status, price, title, manufacturer, model, bodyType, myPhoto, ownerEmail,
  ) {
    this.userEmail = ownerEmail;
    const filePath = myPhoto.photo.path;
    const uploadedImg = await cloudinary.uploader.upload(filePath, {
      folder: process.env.CLOUDINARY_AUTOMART_FOLDER,
      use_filename: true,
    }, (err, result) => result);
    const allCars = this.cars.length;
    const id = allCars + 1;
    const car = {
      id,
      owner,
      created_on: Date.now(),
      state,
      status,
      price,
      title,
      manufacturer,
      model,
      body_type: bodyType,
      photo: uploadedImg.url,
    };
    this.cars.push(car);
    const index = id - 1;
    return this.getCarById(index);
  }
}

export default new CarsService();
