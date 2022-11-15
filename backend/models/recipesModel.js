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
    image: {
        type: String,
        trim: true,
    },
    createDate: {
        type: String,
        required: [true,'createDate is mandatory'],
        trim: true,
        default: Date.now()
    },
    ingredients: {
        type: [String],
        trim: true,
    },
    preparation: [
    {
        position: {
            type: Number,
            trim: true,
            required: [true,'Instruction position is mandatory'],
        },
        instruction: {
            type: String,
            trim: true,
        },
    },
    ],
    preparationTime: {
        type: Number,
        trim: true,
        required: [true,'preparationTime is mandatory'],
    },
    credit: {
        type: String,
        trim: true,
    },
    yield: {
        type: String,
        trim: true,
        required: [true,'yield is mandatory'],
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true,'createBy is mandatory'],
        trim: true
    },
    recipeType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipeType',
        required: [true,'recipeType is mandatory'],
        trim: true
    },
    recipeCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipeCategory',
        required: [true,'recipeCategory is mandatory'],
        trim: true
    },
});

module.exports = mongoose.model("recipes", recipeSchema);