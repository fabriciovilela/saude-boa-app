const mongoose = require("mongoose");

const recipeCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "categoryName is mandatory"],
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

module.exports = mongoose.model("recipeCategory", recipeCategorySchema);
