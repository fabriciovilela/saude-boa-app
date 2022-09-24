const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is mandatory'],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    preparationTime: {
        type: Number,
        trim: true,
        required: [true,'preparationTime is mandatory'],
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true,'createBy is mandatory'],
        trim: true
    },
    createDate: {
        type: String,
        required: [true,'createDate is mandatory'],
        trim: true,
        default: Date.now()
    },
});

module.exports = mongoose.model("recipes", recipeSchema); 