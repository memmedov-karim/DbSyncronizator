const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const setupMiddlewares = (app) => {
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  function logMiddleware(req, res, next) {
    console.log(
      `[${req.method}] ${req.url} ${req.ip} ${req.protocol} ${req.headers}`
    );
    next();
  }

  app.use(logMiddleware);
};
module.exports = { setupMiddlewares };
