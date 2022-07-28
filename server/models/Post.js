const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    username: {type: String},
    title: {type:String},
    post: {type: String},
    comments: {type: Array}
});

module.exports = mongoose.model("posts", postSchema);