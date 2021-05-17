'use strict';

// import all required modules
const logger = require('../utils/logger');

// create contact object
const contact = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    // display confirmation message in log
    logger.info('contact rendering');
    
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the Movie - Hub App!',
    };
    
    // render the contact view and pass through the data
    response.render('contact', viewData);
  },
};

// export the contact module
module.exports = contact;