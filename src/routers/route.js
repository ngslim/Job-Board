const express = require('express');

const siteRouter = require('./site');
const jobRouter = require('./job');
const authRouter = require('./auth');

module.exports = function (app) {
  app.use((req, res, next) => {
    if (req.path.substr(-1) === '/' && req.path.length > 1) {
      const query = req.url.slice(req.path.length);
      const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
      res.redirect(301, safepath + query);
    } else {
      next();
    }
  });

  app.use('/explore', jobRouter);
  app.use('/', authRouter);
  app.use('/', siteRouter);
};
