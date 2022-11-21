const express = require("express");
const { Storage } = require("@google-cloud/storage");
const router = express.Router();
const recipesModel = require("../models/recipesModel");
const authService = require("../services/authService");

const storage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_KEY),
  projectId: "univesp-receitas",
});

const imagesBucket = storage.bucket("recipes-photos");

router.get("/", async (req, res) => {
  try {
    let recipes = await recipesModel
      .find()
      .sort({ createDate: -1 })
      .skip(req.query.page * req.query.perPage - req.query.perPage)
      .limit(req.query.perPage)
      .populate("createBy", "name")
      .populate("recipeType", "typeName")
      .populate("recipeCategory", "categoryName");
    res.status(200).send(recipes);
  } catch (err) {
    return res.status(400).send({ error: "Error listing recipe: " + err });
  }
});

router.get("/filter/:categorieId/:typeId", async (req, res) => {
  try {
    let recipes = await recipesModel
      .find({
        recipeCategory: req.params.categorieId,
        recipeType: req.params.typeId,
      })
      .sort({ createDate: -1 })
      .skip(req.query.page * req.query.perPage - req.query.perPage)
      .limit(req.query.perPage)
      .populate("createBy", "name")
      .populate("recipeType", "typeName")
      .populate("recipeCategory", "categoryName");
    res.status(200).send(recipes);
  } catch (err) {
    return res.status(400).send({ error: "Error listing recipe: " + err });
  }
});

router.get("/filter/:typeId", async (req, res) => {
  try {
    let recipes = await recipesModel
      .find({
        recipeType: req.params.typeId,
      })
      .sort({ createDate: -1 })
      .skip(req.query.page * req.query.perPage - req.query.perPage)
      .limit(req.query.perPage)
      .populate("createBy", "name")
      .populate("recipeType", "typeName")
      .populate("recipeCategory", "categoryName");
    res.status(200).send(recipes);
  } catch (err) {
    return res.status(400).send({ error: "Error listing recipe: " + err });
  }
});

router.get("/myrecipes", async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);

    let recipes = await recipesModel
      .find({
        createBy: tokenDec._id,
      })
      .sort({ createDate: -1 })
      .skip(req.query.page * req.query.perPage - req.query.perPage)
      .limit(req.query.perPage)
      .populate("createBy", "name")
      .populate("recipeType", "typeName")
      .populate("recipeCategory", "categoryName");

    res.status(200).send(recipes);
  } catch (err) {
    return res.status(400).send({ error: "Error listing recipe: " + err });
  }
});

router.post("/", authService.authorize, async (req, res) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);

    let newRecipe = new recipesModel({ ...req.body, image: null });
    newRecipe.createBy = tokenDec._id;
    newRecipe.createDate = Date.now();
    newRecipe.image = null;
    await newRecipe.save();

    if (req.body.image != null) {
      let temp64Image = req.body.image;
      let base64Data = temp64Image
        .replace(/^data:image\/png;base64,/, "")
        .replace(/^data:image\/jpeg;base64,/, "");
      var bufferData = Buffer.from(base64Data, "base64");
      await imagesBucket.file(newRecipe._id + ".jpeg").save(bufferData);
    }

    return res.status(200).send(newRecipe);
  } catch (err) {
    return res.status(400).send({ error: "Error create recipe: " + err });
  }
});

router.get("/:recipeId", async (req, res) => {
  try {
    const recipe = await recipesModel
      .findById(req.params.recipeId)
      .populate("createBy", "name")
      .populate("recipeType", "typeName")
      .populate("recipeCategory", "categoryName");
    res.status(200).send(recipe);
  } catch (err) {
    return res.status(400).send({ error: "Error listing recipe: " + err });
  }
});

router.put("/:recipeId", authService.authorize, async (req, res) => {
  try {
    const recipeToChange = await recipesModel.findById(req.params.recipeId);
    const imageLink = req.body.image != null ? req.params.recipeId + (Date.parse(new Date()))/1000 + ".jpeg" : req.body.image;
    console.log(imageLink);
    const token =
      req.body.token || req.query.token || req.headers["x-acess-token"];
    const tokenDec = await authService.decodeToken(token);
    if (tokenDec._id == recipeToChange.createBy) {
      const updateRecipe = await recipesModel.findByIdAndUpdate(
        req.params.recipeId,
        { ...req.body, image: "https://storage.googleapis.com/recipes-photos/" + imageLink },
        { new: true }
      );
      if (req.body.image != null) {
        let temp64Image = req.body.image;
        let base64Data = temp64Image
          .replace(/^data:image\/png;base64,/, "")
          .replace(/^data:image\/jpeg;base64,/, "")
          .replace(/^data:image\/jpg;base64,/, "");
        var bufferData = Buffer.from(base64Data, "base64");
        await imagesBucket.file(imageLink).save(bufferData);
      }
      return res.status(200).send(updateRecipe);
    } else {
      return res
        .status(403)
        .send({ error: "Access denied to change this recipe" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error update recipe: " + err });
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
      res.status(200).send({ message: "Recipe has been deleted" });
    } else {
      return res
        .status(403)
        .send({ error: "Access denied to delete this recipe" });
    }
  } catch (err) {
    return res.status(400).send({ error: "Error delete recipe: " + err });
  }
});

module.exports = router;
