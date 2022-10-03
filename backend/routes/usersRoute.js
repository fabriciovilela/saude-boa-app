const express = require("express");
const router = express.Router();
const md5 = require("md5");
const usersModel = require("../models/usersModel");
const recipesModel = require("../models/recipesModel");
const config = require("../config");
const authService = require("../services/authService");

router.post("/", async (req, res) => {
  try {
    let newUser = new usersModel(req.body);
    newUser.password = md5(req.body.password + config.saltKey);
    newUser.registrationDate = Date.now();
    
    await newUser.save();

    const token = await authService.generateToken({
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    });

    return res.status(200).send({
      Token: token,
      data: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    return res.status(400).send({error:"Error create user: " + err});
  }
});

router.delete("/",authService.authorize, async (req, res) => {
  try {
    const token = req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    //-------------Fazer um loop deletando todas as receitas criadas pelo usuario que esta sendo deletado
    await usersModel.findByIdAndRemove(tokenDec._id);
    res.status(200).send({message:"User has been deleted"});
  } catch (err) {
    return res.status(400).send({error:"Error delete user: " + err});
  }
});

module.exports = router;