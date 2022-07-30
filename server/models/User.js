
const mongoose = require("mongoose");

// model to save a user to the database

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: {type: String},
    email: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("users", userSchema);