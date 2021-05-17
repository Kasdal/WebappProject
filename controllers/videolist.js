'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const videolistStore = require('../models/videolist-store');
const accounts = require ('./accounts.js');

const videolist = {
  index(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);  
      const videolistId = request.params.id;
      logger.debug('Videolist id = ' + videolistId);
      if (loggedInUser) {
      const viewData = {
        title: 'Videolist',
        videolist: videolistStore.getVideolist(videolistId),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };
      response.render('videolist', viewData);
      }
      else response.redirect('/');
  },
    deleteMovie(request, response) {
    const videolistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug('Deleting Movie' + movieId + 'from Videolist' + videolistId);
    videolistStore.removeMovie(videolistId, movieId);
    response.redirect('/videolist/' + videolistId);
  },
    addMovie(request, response) {
    const videolistId = request.params.id;
    const videolist = videolistStore.getVideolist(videolistId);
    const newMovie = {
      id: uuid(),
      title: request.body.title,
      actor: request.body.actor,
      genre: request.body.genre,
      duration: request.body.duration
    };
    videolistStore.addMovie(videolistId, newMovie);
    response.redirect('/videolist/' + videolistId);
  },  
  updateMovie(request, response) {
    const videolistId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
      title: request.body.title,
      actor: request.body.actor,
      genre: request.body.genre,
      duration: request.body.duration
    };
    videolistStore.editMovie(videolistId, movieId, updatedMovie);
    response.redirect('/videolist/' + videolistId);
  }
};

module.exports = videolist;