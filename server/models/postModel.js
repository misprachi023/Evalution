const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    id: String,
    device: {
        type: String,
        required: true
    }
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel