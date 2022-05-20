const mongoose = require("mongoose")

const tour = mongoose.Schema({

    name: String,
	owner: String,
    people: Number,
    start: Number,
    end: Number,
    cities: [{type: String}],
    homes: [{type: String}],
    likes:Number,
    completed: Number,
    booked: Number,
    nights_remaining: Number
})

module.exports = mongoose.model("Tour", tour);