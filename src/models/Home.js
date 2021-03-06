const mongoose = require("mongoose")

const home = mongoose.Schema({

	address: String,
    city: String,
    beds: Number,
    start: Number,
    end: Number,
	host: String,
    image: String,
    bookings: [{guest: String, start: Number, end: Number}],
    tags: [{type: String}]
})

module.exports = mongoose.model("Home", home);