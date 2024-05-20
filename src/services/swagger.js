const swaggerJsdoc = require('swagger-jsdoc');
const { description } = require('../../doc/ticket/GET_id_ticket_payload_response copy');

const options = {
  definition: {
    openapi: '3.0.0',
    host: `homeowner.tplinkdns.com`,
    info: {
      title: 'Poop Squad API',
      version: '1.0.1',
      description:
        'This is the API for the Poop Squad',
    },
  },
  apis: ['./src/routes/*.js'], // files containing annotations as above
};

module.exports = swaggerJsdoc(options);