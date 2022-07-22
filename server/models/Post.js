const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    username: {type: String},
    email: {type: String},
    password: {type: String}

});

module.exports = mongoose.model("posts", postSchema);