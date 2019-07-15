/* eslint-disable linebreak-style */
export const createTables = `
    CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(60) NOT NULL UNIQUE,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            password VARCHAR NOT NULL,
            address VARCHAR NOT NULL,
            is_admin BOOLEAN DEFAULT false
        );
    CREATE TABLE IF NOT EXISTS
        cars(
            id SERIAL PRIMARY KEY,
            owner INT REFERENCES users (id),
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            state VARCHAR(4) NOT NULL,
            CONSTRAINT car_state CHECK(state = 'new' OR state = 'used'),
            status VARCHAR NOT NULL DEFAULT 'available',
            CONSTRAINT car_status CHECK(status = 'available' OR status = 'sold'),
            price DECIMAL NOT NULL,
            title VARCHAR DEFAULT NULL,
            manufacturer VARCHAR NOT NULL,
            model VARCHAR NOT NULL,
            body_type VARCHAR(30) NOT NULL,
            image_url VARCHAR
        );
    CREATE TABLE IF NOT EXISTS
        orders(
            id SERIAL PRIMARY KEY,
            buyer INT REFERENCES users (id),
            car_id INT REFERENCES cars (id) ON DELETE CASCADE,
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            amount DECIMAL NOT NULL,
            status VARCHAR NOT NULL DEFAULT 'pending',
            CONSTRAINT order_status CHECK(status = 'pending' OR
                status = 'accepted' OR status = 'rejected')
        );
    CREATE TABLE IF NOT EXISTS
        flags(
            id SERIAL PRIMARY KEY,
            car_id INT REFERENCES cars (id),
            created_on TIMESTAMP NOT NULL DEFAULT NOW(),
            reason VARCHAR NOT NULL,
            description VARCHAR NOT NULL
        );`;
export const dropTables = 'DROP TABLE IF EXISTS users, cars, orders, flags;';

export const seedUsers = `INSERT INTO users (
    first_name, last_name, email, password, address, is_admin
    ) VALUES
    ('john', 'doe', 'johndoe@gmail.com', 'doe123456', 'no 55 ikorodu road', true),
    ('sarah', 'conoh', 'sarahconoh@gmail.com', 'conoh123456', 'no 56 ibadan road', false),
    ('brian', 'emeka', 'brianemeka@gmail.com', 'emeka123456', 'no 10 rumuokoro road', false);`;

export const seedCars = `INSERT INTO cars (
    owner, state, status, price, title, manufacturer, model, body_type, image_url
    ) VALUES
    (1, 'new', 'sold', 15000000.00, 'Brand new G-Wagon', 'mercedes', 'g-wagon', 'SUV',
    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624490/c1.jpg'),
    (1, 'new', 'available', 6000000.00, 'New venza on sale.', 'toyota', 'venza', 'SUV',
    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624479/c9.jpg'),
    (1, 'used', 'available', 9000000.00, 'Ford truck. Buy now while still available.', 'toyota',
    'Fond Pickup Truck', 'Truck', 'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558617991/c14.png'),
    (2, 'used', 'sold', 14000000.00, 'Belgium Mack for sale.', 'Mack', 'Mack 209', 'Trailer',
    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624761/c8.jpg'),
    (2, 'new', 'available', 16000000.00, 'New Mercedes truck', 'Mercedes', 'Mercedes 455', 'Trailer',
    'https://res.cloudinary.com/dya3r9cfe/image/upload/v1558624904/c2.jpg');`;
