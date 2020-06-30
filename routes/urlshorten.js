
const contollers = require('../controller/urlshorten.controller')
module.exports = app => {
  app.get('/', contollers.getHome)
  app.get("/api/item/:code", contollers.findOneShortUrl);
  app.get("/:code", contollers.findOneShortUrl2);
  app.post("/api/item", contollers.createShortUrlV2);
};