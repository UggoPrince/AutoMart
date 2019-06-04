/* eslint-disable linebreak-style */
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'REST API Documentation for AutoMart', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This documentation has all the datails on how to consume this api such as'
    + ' registering an account, creating a car advert and more.'
    + ' Note: all endpoints should be prefixed with "/api/v1/"', // short description of the app
  },
};
const dir = path.join(__dirname, '..', '/');

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [`${dir}/**/*.yaml`],
};
// initialize swagger-jsdoc
export default swaggerJSDoc(options);
