const mongoose = require("mongoose")

const user = mongoose.Schema({
	username: { type: String, unique: true },
	password: String,
})

module.exports = mongoose.model("User", user);