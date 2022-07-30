const mongoose = require("mongoose");

// model to save the post to the database

const Schema = mongoose.Schema;

let postSchema = new Schema ({
    username: {type: String},
    datetime: {type: String},
    title: {type:String},
    post: {type: String},
    code: {type: String},
    comments: {type: Array},
    likeCount: {type: Number}
});

module.exports = mongoose.model("posts", postSchema);