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
            phone_number VARCHAR NOT NULL,
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
            title VARCHAR NOT NULL,
            manufacturer VARCHAR NOT NULL,
            model VARCHAR NOT NULL,
            body_type VARCHAR(30) NOT NULL,
            photos VARCHAR []
        );
    CREATE TABLE IF NOT EXISTS
        orders(
            id SERIAL PRIMARY KEY,
            buyer INT REFERENCES users (id),
            car_id INT REFERENCES cars (id),
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
