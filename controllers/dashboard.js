"use strict";

// import all required modules
const logger = require("../utils/logger");
const uuid = require("uuid");
const accounts = require("./accounts.js");

const videolistStore = require("../models/videolist-store.js");

// create dashboard object
const dashboard = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      const viewData = {
        title: "Videolist Dashboard",
        videolists: videolistStore.getUserVideolists(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName
      };
      logger.info("about to render" + viewData.videolists);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteVideolist(request, response) {
    const videolistId = request.params.id;
    logger.debug("Deleting Videolist" + videolistId);
    videolistStore.removeVideolist(videolistId);
    response.redirect("/dashboard");
  },

  addVideolist(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newVideoList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      picture: request.files.picture,
      date: date,
      movies: []
    };
    logger.debug("Creating a new Videolist" + newVideoList);
    videolistStore.addVideolist(newVideoList, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;
