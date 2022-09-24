const express = require("express");
const router = express.Router();
const authService = require("../services/authService");
const usersModel = require("../models/usersModel");
const md5 = require("md5");
const config = require('../config');

router.post("/", async (req, res) => {
  try {
    const loginUser = await usersModel.findOne({
      email: req.body.email,
      password: md5(req.body.password + config.saltKey),
    });

    if (!loginUser) {
      res.status(404).send("Username or password is invalid");
      return;
    }

    const token = await authService.generateToken({
      _id: loginUser._id,
      email: loginUser.email,
      name: loginUser.name,
    });

    res.status(200).send({
      Token: token,
      data: {
        _id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        roles: loginUser.roles,
      },
    });
  } catch (err) {
    res.status(500).send("Failed to authenticate user: " + err);
  }
});

router.post("/refresh-token", async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const data = await authService.decodeToken(token);
    const loginUser = await usersModel.findById(data._id);
    if (!loginUser) {
      res.status(404).send("User not found");
      return;
    }
    const tokenData = await authService.generateToken({
      _id: loginUser._id,
      email: loginUser.email,
      name: loginUser.name,
      roles: loginUser.roles,
    });
    res.status(200).send({
      Token: tokenData,
      data: {
        _id: loginUser._id,
        name: loginUser.name,
        email: loginUser.email,
        roles: loginUser.roles,
      },
    });
  } catch (err) {
    res.status(500).send("Failed to authenticate user: " + err);
  }
});

module.exports = router;
