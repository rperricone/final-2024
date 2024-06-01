const router = require('express').Router(); 
const ticket = require('./ticket');
const activity = require('./activity');
const {auth} = require('./auth')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../services/swagger');
const swagger = require('../services/swagger');

router.use(jsonParser)
function errorHandler(err, req, res, next) {
    console.log('error handler routes hit!', err.message)
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.json({ error: err, stack: err.stack })
    next()
  }
router.use(errorHandler)


// router.use('/api-docs', swaggerUi.serve);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use('/auth', auth)

router.use( ticket);
router.use( activity);
// router.use('/user', user);


module.exports = {router,errorHandler};
