module.exports = app => {

  const UrlShortens = require("../controller/UrlShortenController");

  app.route("/api/item/:code")
      .get(UrlShortens.get_item_code);

  app.route("/api/item")
      .post(UrlShortens.save_url_shorten);

};