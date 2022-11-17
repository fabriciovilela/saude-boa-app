require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || "8000";
const mongoose = require("mongoose");
const config = require("./config");
const bodyParser = require("body-parser");
const cors = require('cors');


mongoose
  .connect(config.mongoDbConnectionString)
  .then(() => {
    console.log("MongoDb success connect");
    
  })
  .catch((err) => {
    console.log("MongoDb error connect: " + err);
  });

app.use(cors());

app.use(
  bodyParser.json({
    limit: "5mb",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "x-acess-token,content-type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", false);
  next();
});

const recipes = require("./routes/recipesRoute");
const user = require("./routes/usersRoute");
const authenticate = require("./routes/authenticateRoute");
const recipeCategories = require("./routes/recipeCategory");
const recipeType = require("./routes/recipeType");

app.use("/recipes", recipes);
app.use("/user", user);
app.use("/authenticate", authenticate);
app.use("/category", recipeCategories);
app.use("/type",recipeType);

app.listen(port, () => {
  console.log("Server online on url: http://localhost:" + port);
});
