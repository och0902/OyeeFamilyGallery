'use strict';

const express = require('express');
const router = express.Router();
const ctrl = require('./ctrl.js');

// Get the login page
router.get('/', ctrl.output.login);
// Get the register page
router.get('/register', ctrl.output.register)
// Get home page for family page
router.get('/home', ctrl.output.home);
// Get page for father
router.get('/home/dad', ctrl.output.dad);
// Get page for mother
router.get('/home/mom', ctrl.output.mom);
// Get page for brother
router.get('/home/brother', ctrl.output.brother);
// Get page for sister
router.get('/home/sister', ctrl.output.sister);
// Get page for oyee
router.get('/home/oyee', ctrl.output.oyee);
// Get logout page
router.get('/logout', ctrl.output.logout);


// Post login data
router.post('/login', ctrl.process.login);
// Post register data
router.post('/register', ctrl.process.register);


module.exports = router;