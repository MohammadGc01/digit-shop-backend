// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digit Shop Api',
      version: '1.0.0',
      description: 'توضیحات پروژه API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // آدرس اصلی API
      },
    ],
  },
  apis: ['./routes/*.js'], // مسیر فایل‌هایی که قراره مستند شن (با JSDoc)
  components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
security: [{ bearerAuth: [] }],

};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
