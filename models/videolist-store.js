'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

const videolistStore = {

  store: new JsonStore('./models/videolist-store.json', { videolistCollection: [] }),
  collection: 'videolistCollection',

  getAllVideolists() {
    return this.store.findAll(this.collection);
  },

  getVideolist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addVideolist(videolist, response) {
    videolist.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            videolist.picture = result.url;
            response();
          });
        }
      });
    this.store.add(this.collection, videolist);
  },

  removeVideolist(id) {
    const videolist = this.getVideolist(id);
    this.store.remove(this.collection, videolist);
  },

  removeAllVideolists() {
    this.store.removeAll(this.collection);
  },

  addMovie(id, movie) {
    const videolist = this.getVideolist(id);
    videolist.movies.push(movie);
  },

  removeMovie(id, movieId) {
    const videolist = this.getVideolist(id);
    const movies = videolist.movies;
    _.remove(movies, { id: movieId});
  },
  
  editMovie(id, movieId, updatedMovie) {
    const videolist = this.getVideolist(id);
    const movies = videolist.movies;
    const index = movies.findIndex(movie => movie.id === movieId);
    movies[index].title = updatedMovie.title;
    movies[index].actor = updatedMovie.actor;
    movies[index].genre = updatedMovie.genre;
    movies[index].duration = updatedMovie.duration;
  },
  
  getUserVideolists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = videolistStore;