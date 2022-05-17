const mongoose = require("mongoose")

const home = mongoose.Schema({

	address: String,
    city: String,
    beds: Number,
    start: Number,
    end: Number,
	host: String,
    image: String,
    tags: [{type: String}]
})

module.exports = mongoose.model("Home", home);