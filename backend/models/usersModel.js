const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'name is mandatory'],
        trim: true,
    },
    email: {
        type: String,
        required: [true,'email is mandatory'],
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Enter a valid email']
    },
    password: {
        type: String,
        required: [true,'password is mandatory'],
        trim: true,
    },
    registrationDate: {
        type: String,
        required: [true,'registrationDate is mandatory'],
        trim: true,
        default: Date.now()
    },
});

module.exports = mongoose.model("users", userSchema);