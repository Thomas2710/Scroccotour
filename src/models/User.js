const mongoose = require("mongoose")

const user = mongoose.Schema({
	username: { type: String, unique: true },
	password: String,
	email: {type: String, unique: true}
})

module.exports = mongoose.model("User", user);