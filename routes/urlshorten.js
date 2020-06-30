const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';
const contollers = require('../controller/urlshorten.controller')
module.exports = app => {
  app.get('/', contollers.getHome)
  app.get("/api/item/:code", contollers.findOneShortUrl);
  app.post("/api/item", contollers.createShortUrl);
};