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
    const cars = this.getAllCars();
    for (let i = 0; i < cars.length; i += 1) {
      if (cars[i].id === id) {
        return {
          exist: true,
          data: {
            id: cars[i].id,
            email: this.userEmail,
            created_on: cars[i].created_on,
            manufacturer: cars[i].manufacturer,
            model: cars[i].model,
            body_type: cars[i].body_type,
            state: cars[i].state,
            status: cars[i].status,
            price: cars[i].price,
            title: cars[i].title,
            photo: cars[i].photo,
          },
        };
      }
    }
    return { exist: false, error: 'no such car with this id.' };
  }

  getCarOwner(id) {
    const cars = this.getAllCars();
    for (let i = 0; i < cars.length; i += 1) {
      if (cars[i].id === id) return cars[i].owner;
    }
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
    return this.getCarById(id);
  }

  updater(carId, field, newField) {
    const cars = this.getAllCars();
    for (let i = 0; i < cars.length; i += 1) {
      if (cars[i].id === carId) {
        this.cars[i][field] = newField;
        return i;
      }
    }
  }

  updateStatus(carId, newStatus, email) {
    const i = this.updater(carId, 'status', newStatus);
    return {
      id: this.cars[i].id,
      email,
      created_on: this.cars[i].created_on,
      manufacturer: this.cars[i].manufacturer,
      model: this.cars[i].model,
      price: this.cars[i].price,
      state: this.cars[i].state,
      status: this.cars[i].status,
    };
  }

  updatePrice(carId, newPrice, email) {
    const i = this.updater(carId, 'price', newPrice);
    return {
      id: this.cars[i].id,
      email,
      created_on: this.cars[i].created_on,
      manufacturer: this.cars[i].manufacturer,
      model: this.cars[i].model,
      price: this.cars[i].price,
      state: this.cars[i].state,
      status: this.cars[i].status,
    };
  }
}

export default new CarsService();
