const express = require("express");
const router = express.Router();
const recipeCategory = require("../models/recipeCategory");
const authService = require("../services/authService");

router.get("/", async (req, res) => {
  try {
    const recipeCategories = await recipeCategory.find();
    res.status(200).send(recipeCategories);
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error listing recipe categories: " + err });
  }
});

router.post("/", authService.authorize, async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    let newRecipeCategory = new recipeCategory(req.body);
    newRecipeCategory.createBy = tokenDec._id;
    newRecipeCategory.createDate = Date.now();
    await newRecipeCategory.save();
    return res.status(200).send(newRecipeCategory);
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error create recipe category: " + err });
  }
});

router.put("/:categoryId", authService.authorize, async (req, res) => {
  try {
    const categoryToChange = await recipeCategory.findById(
      req.params.categoryId
    );
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == categoryToChange.createBy) {
      const updateCategory = await recipeCategory.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
      );
      return res.status(200).send(updateCategory);
    } else {
      return res
        .status(403)
        .send({ error: "Access denied to change this category" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error update category: " + err });
  }
});

router.delete("/:categoryId", authService.authorize, async (req, res) => {
  try {
    const categoryToDelete = await recipeCategory.findById(
      req.params.categoryId
    );
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == categoryToDelete.createBy) {
      await recipeCategory.findByIdAndRemove(req.params.categoryId);
      res.status(200).send({ message: "Category has been deleted" });
    } else {
      return res
        .status(403)
        .send({ error: "Access denied to delete this category" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error delete category: " + err });
  }
});

module.exports = router;