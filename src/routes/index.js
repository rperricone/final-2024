const router = require('express').Router(); 
const ticket = require('./ticket');
const activity = require('./activity');
const auth = require('./auth')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
// const user = require('../models/user');
router.use(jsonParser)
router.use('/auth', auth)
router.use( ticket);
router.use( activity);
// router.use('/user', user);


module.exports = router;
