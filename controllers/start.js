'use strict';

// import all required modules
const logger = require('../utils/logger');
const videolistStore = require('../models/videolist-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    
    if(loggedInUser){
      
      const videolists = videolistStore.getAllVideolists();
      let numVideolists = videolists.length;
      let numMovies = 0;
      for (let i in videolists) {
        numMovies = numMovies + videolists[i].movies.length;
      }

      const viewData = {
        title: 'Welcome to the Movie - Hub!',
        totalVideolists: numVideolists,
        totalMovies: numMovies,
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;