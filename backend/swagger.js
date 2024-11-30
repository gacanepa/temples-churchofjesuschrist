import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Temples API',
    description: 'Temples of The Church of Jesus Christ of Latter-day Saints',
  },
  host: 'temples-churchofjesuschrist.onrender.com',
  basePath: '/temples',
  produces: ['application/json'],
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const routes = ['./routes/temples.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
