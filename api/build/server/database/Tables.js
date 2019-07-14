"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedCars = exports.seedUsers = exports.dropTables = exports.createTables = void 0;

/* eslint-disable linebreak-style */
var createTables = "\n    CREATE TABLE IF NOT EXISTS\n        users(\n            id SERIAL PRIMARY KEY,\n            email VARCHAR(60) NOT NULL UNIQUE,\n            first_name VARCHAR(100) NOT NULL,\n            last_name VARCHAR(100) NOT NULL,\n            password VARCHAR NOT NULL,\n            address VARCHAR NOT NULL,\n            phone_number VARCHAR DEFAULT NULL,\n            is_admin BOOLEAN DEFAULT false\n        );\n    CREATE TABLE IF NOT EXISTS\n        cars(\n            id SERIAL PRIMARY KEY,\n            owner INT REFERENCES users (id),\n            created_on TIMESTAMP NOT NULL DEFAULT NOW(),\n            state VARCHAR(4) NOT NULL,\n            CONSTRAINT car_state CHECK(state = 'new' OR state = 'used'),\n            status VARCHAR NOT NULL DEFAULT 'available',\n            CONSTRAINT car_status CHECK(status = 'available' OR status = 'sold'),\n            price DECIMAL NOT NULL,\n            title VARCHAR DEFAULT NULL,\n            manufacturer VARCHAR NOT NULL,\n            model VARCHAR NOT NULL,\n            body_type VARCHAR(30) NOT NULL,\n            image_url VARCHAR\n        );\n    CREATE TABLE IF NOT EXISTS\n        orders(\n            id SERIAL PRIMARY KEY,\n            buyer INT REFERENCES users (id),\n            car_id INT REFERENCES cars (id),\n            created_on TIMESTAMP NOT NULL DEFAULT NOW(),\n            amount DECIMAL NOT NULL,\n            status VARCHAR NOT NULL DEFAULT 'pending',\n            CONSTRAINT order_status CHECK(status = 'pending' OR\n                status = 'accepted' OR status = 'rejected')\n        );\n    CREATE TABLE IF NOT EXISTS\n        flags(\n            id SERIAL PRIMARY KEY,\n            car_id INT REFERENCES cars (id),\n            created_on TIMESTAMP NOT NULL DEFAULT NOW(),\n            reason VARCHAR NOT NULL,\n            description VARCHAR NOT NULL\n        );";
exports.createTables = createTables;
var dropTables = 'DROP TABLE IF EXISTS users, cars, orders, flags;';
exports.dropTables = dropTables;
var seedUsers = "INSERT INTO users (\n    first_name, last_name, email, password, address, is_admin, phone_number\n    ) VALUES\n    ('john', 'doe', 'johndoe@gmail.com', 'doe123456', 'no 55 ikorodu road', true, '07012345678'),\n    ('sarah', 'conoh', 'sarahconoh@gmail.com', 'conoh123456', 'no 56 ibadan road', false, '07011223344'),\n    ('brian', 'emeka', 'brianemeka@gmail.com', 'emeka123456', 'no 10 rumuokoro road', false,'07022338899');";
exports.seedUsers = seedUsers;
var seedCars = "INSERT INTO cars (\n    owner, state, status, price, title, manufacturer, model, body_type, image_url\n    ) VALUES\n    (1, 'new', 'sold', 15000000.00, 'Brand new G-Wagon', 'mercedes', 'g-wagon', 'SUV',\n    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624490/c1.jpg'),\n    (1, 'new', 'available', 6000000.00, 'New venza on sale.', 'toyota', 'venza', 'SUV',\n    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624479/c9.jpg'),\n    (1, 'used', 'available', 9000000.00, 'Ford truck. Buy now while still available.', 'toyota',\n    'Fond Pickup Truck', 'Truck', 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558617991/c14.png'),\n    (2, 'used', 'sold', 14000000.00, 'Belgium Mack for sale.', 'Mack', 'Mack 209', 'Trailer',\n    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624761/c8.jpg'),\n    (2, 'new', 'available', 16000000.00, 'New Mercedes truck', 'Mercedes', 'Mercedes 455', 'Trailer',\n    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624904/c2.jpg');";
exports.seedCars = seedCars;
//# sourceMappingURL=Tables.js.map