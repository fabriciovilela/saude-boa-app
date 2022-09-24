const express = require("express");
const router = express.Router();
const recipesModel = require("../models/recipesModel");
const authService = require("../services/authService");

router.get("/", async (req, res) => {
  try {
    const recipes = await recipesModel.find();
    res.status(200).send(recipes);
  } catch (err) {
    return res.status(400).send("Error listing recipe: " + err);
  }
});

router.post("/", authService.authorize, async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    let newRecipe = new recipesModel(req.body);
    newRecipe.createBy = tokenDec._id;
    newRecipe.createDate = Date.now();
    await newRecipe.save();
    return res.status(200).send(newRecipe);
  } catch (err) {
    return res.status(400).send("Error create recipe: " + err);
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await recipesModel.findById(req.params.recipeId);
    res.status(200).send(recipe);
  } catch (err) {
    return res.status(400).send("Error listing recipe: " + err);
  }
});

router.put("/:recipeId", authService.authorize, async (req, res) => {
  try {
    const recipeToChange = await recipesModel.findById(req.params.recipeId);
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == recipeToChange.createBy) {
      const updateRecipe = await recipesModel.findByIdAndUpdate(
        req.params.recipeId,
        req.body,
        { new: true }
      );
      return res.status(200).send(updateRecipe);
    } else {
      return res.status(403).send("Access denied to change this recipe");
    }
  } catch (err) {
    return res.status(400).send("Error update recipe: " + err);
  }
});

router.delete("/:recipeId", authService.authorize, async (req, res) => {
  try {
    const recipeToDelete = await recipesModel.findById(req.params.recipeId);
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == recipeToDelete.createBy) {
      await recipesModel.findByIdAndRemove(req.params.recipeId);
      res.status(200).send("Recipe has been deleted");
    } else {
      return res.status(403).send("Access denied to delete this recipe");
    }
  } catch (err) {
    return res.status(400).send("Error delete recipe: " + err);
  }
});

module.exports = router;
