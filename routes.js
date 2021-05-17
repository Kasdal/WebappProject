'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();


// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const videolist = require('./controllers/videolist.js');
const accounts = require ('./controllers/accounts.js');
const contact = require("./controllers/contact.js");

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get("/contact", contact.index);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/videolist/:id', videolist.index);

router.get('/videolist/:id/deleteMovie/:movieid', videolist.deleteMovie);
router.post('/videolist/:id/addmovie', videolist.addMovie);

router.get('/dashboard/deletevideolist/:id', dashboard.deleteVideolist);
router.post('/dashboard/addvideolist', dashboard.addVideolist);

router.post('/videolist/:id/updatemovie/:movieid', videolist.updateMovie);

// export router module
module.exports = router;

