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
	guest_accolti: Number,
	recensioni_come_host: [{type: Object}],
	recensioni_come_guest: [{type: Object}],
	tour_preferiti: [{type : String}],
})

module.exports = mongoose.model("User", user);