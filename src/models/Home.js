const mongoose = require("mongoose")

const home = mongoose.Schema({
	address: { type: String, unique: true },
	host: String,
    image: String,
    tags: [{type: String}]
})

module.exports = mongoose.model("Home", home);