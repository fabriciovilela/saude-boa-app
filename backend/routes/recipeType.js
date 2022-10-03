const express = require("express");
const router = express.Router();
const recipeType = require("../models/recipeType");
const authService = require("../services/authService");

router.get("/", async (req, res) => {
  try {
    const type = await recipeType.find();
    res.status(200).send(type);
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
    let newRecipeType = new recipeType(req.body);
    newRecipeType.createBy = tokenDec._id;
    newRecipeType.createDate = Date.now();
    await newRecipeType.save();
    return res.status(200).send(newRecipeType);
  } catch (err) {
    return res
      .status(400)
      .send({ error: "Error create recipe type: " + err });
  }
});

router.put("/:typeId", authService.authorize, async (req, res) => {
  try {
    const typeToChange = await recipeType.findById(req.params.typeId);
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == typeToChange.createBy) {
      const updateType = await recipeType.findByIdAndUpdate(
        req.params.typeId,
        req.body,
        { new: true }
      );
      return res.status(200).send(updateType);
    } else {
      return res
        .status(403)
        .send({ error: "Access denied to change this type" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error update type: " + err });
  }
});

router.delete("/:typeId", authService.authorize, async (req, res) => {
  try {
    const typeToDelete = await recipeType.findById(req.params.typeId);
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == typeToDelete.createBy) {
      await recipeType.findByIdAndRemove(req.params.typeId);
      res.status(200).send({ message: "Type has been deleted" });
    } else {
      return res
        .status(403)
        .send({ error: "Access denied to delete this type" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error delete type: " + err });
  }
});

module.exports = router;
