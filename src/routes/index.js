const router = require('express').Router(); 
const ticket = require('./ticket');
const activity = require('./activity');
const user = require('./user');
router.use( ticket);
router.use('/activity', activity);
router.use('/user', user);


module.exports = router;
