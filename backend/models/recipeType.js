const mongoose = require("mongoose");

const recipeTypeSchema = new mongoose.Schema({
  typeName: {
    type: String,
    required: [true, "typeName is mandatory"],
    trim: true,
  },
  createDate: {
    type: String,
    required: [true, "createDate is mandatory"],
    trim: true,
    default: Date.now(),
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: [true, "createBy is mandatory"],
    trim: true,
  },
});

module.exports = mongoose.model("recipeType", recipeTypeSchema);
