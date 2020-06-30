const mongoose = require("mongoose");
const validUrl = require("valid-url");
const UrlShorten = mongoose.model("UrlShorten");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';

exports.getHome = (req, res, next) => {
  var originalUrl;
  const item = UrlShorten.findOne({ originalUrl: originalUrl });
  res.render('landing', { items: item });
}

exports.findOneShortUrl = async (req, res) => {
  // (/api/item/:code)
  const urlCode = req.params.code;
  const item = await UrlShorten.findOne({ urlCode: urlCode });
  if (item) {
    return res.redirect(item.originalUrl);
  } else {
    return res.redirect(errorUrl);
  }
}
exports.findOneShortUrlV2 = async (req, res) => {
  //(/:code)
  const urlCode = req.params.code;
  const item = await UrlShorten.findOne({ urlCode: urlCode });
  if (item) {
    return res.redirect(item.originalUrl);
  } else {
    return res.redirect(errorUrl);
  }
}
exports.createShortUrlV2 = async (req, res, next) => {
  const appbaseUrl = req.protocol + "://" + req.get('host');
  const { originalUrl } = req.body;
  const urlCode = shortid.generate();
  const updatedAt = new Date();
  if (validUrl.isUri(originalUrl)) {
    try {
      const item = await UrlShorten.findOne({ originalUrl: originalUrl });
      if (item) {
        return res.status(200).render('results', { items: item });
      } else {
        shortUrl = appbaseUrl + "/" + urlCode;
        const item = new UrlShorten({
          originalUrl,
          shortUrl,
          urlCode,
          updatedAt
        });
        await item.save();
        return res.status(200).render('results', { items: item });
      }
    } catch (error) {
      return res.status(500).json("server error");
    }
  } else {
    return res.status(401).json("Invalid Original Url");
  }

}

exports.createShortUrl = async (req, res, next) => {
  const appbaseUrl = req.protocol + "://" + req.get('host');
  const { originalUrl } = req.body;
  const shortBaseUrl = "http://ibeFx";
  const urlCode = shortid.generate();
  const updatedAt = new Date();
  if (validUrl.isUri(originalUrl)) {
    try {
      const item = await UrlShorten.findOne({ originalUrl: originalUrl });
      if (item) {
        res.status(200).render('results', { items: item });
      } else {
        shortUrl = shortBaseUrl + "." + urlCode;
        const item = new UrlShorten({
          originalUrl,
          shortUrl,
          urlCode,
          updatedAt
        });
        await item.save();
        res.status(200).render('results', { items: item });
      }
    } catch (err) {
      res.status(401).json("Invalid User Id");
    }
  } else {
    return res.status(401).json("Invalid Original Url");
  }
}