const mongoose = require("mongoose")

const user = mongoose.Schema({
	username: { type: String, unique: true },
	password: String,
	email: {type: String, unique: true},
	km_percorsi: Number,
	voto_host: Number,
	voto_guest: Number,
	meta_preferita: String,
	paesi_visitati: Number,
	tour_completati: Number,
	guest_accolti: Number
})

module.exports = mongoose.model("User", user);