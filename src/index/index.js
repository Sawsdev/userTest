const express = require("express");
const createError = require("http-errors");
const { Response } = require("../common/response");

module.exports.IndexAPI = (app) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    const menu = {
      Register: `https://${req.headers.host}/api/users/register`,
      Login: `https://${req.headers.host}/api/users/login`,
      Restaurants: `https://${req.headers.host}/api/restaurants/nearby - Coming soon`,
    };
    Response.success(res, 200, "Users Nearby Restaruants", menu);
  });
  app.use("/", router);
};

module.exports.NotFoundAPI = (app) => {
  const router = express.Router();
  router.all("*", (req, res) => {
    Response.error(res, new createError.NotFound());
  });
  app.use("/", router);
};
