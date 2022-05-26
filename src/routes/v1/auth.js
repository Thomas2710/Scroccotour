///
/// This files contains the backend APIs regarding the login and register functionalities
///

const express = require("express")
const User = require("../../models/User") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

//Simple hashing function for strings
String.prototype.hashCode = function() {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
//Route that returns user information as well as the jwt token
//Returns the user and token information if the login succeded
router.post("/login", async (req, res) => {
		const user = await User.findOne({ username: req.body.username , password: req.body.password.hashCode()})
		if (user != null){

			var payload = {
				user: user,
				id: user._id,
				// other data encrypted in the token	
			}
			var options = {
				expiresIn: 86400 // expires in 24 hours
			}
			var token = jwt.sign(payload, process.env.JWT_KEY, options);
			res.cookie('jwt', token, {httpOnly:false, maxAge: 86400*3});
			res.status(200)
			res.json({
				success: true,
				message: 'Auth token sent',
				token: token,
				user: user,
				id: user._id,
				self: "api/v1/auth/" + user._id
			});
			
		}
		
		else{
			res.status(400)
			res.json({ success: false, message: 'Autenticazione fallita' });
		}
})
//Route that insert the new user in the database
//Returns some status json for frontend purposes
router.post("/register", async (req, res) => {
	try{
    const u = new User({
		username: req.body.username,
		password: req.body.password.hashCode(),
		email: req.body.email,
		km_percorsi: 0,
		voto_host: 5,
		voto_guest: 5,
		meta_preferita: "Nessuna",
		paesi_visitati: 0,
		tour_completati:0,
		guest_accolti:0
	})
	await u.save()
	res.status(200)
	res.json({ success: true, message: 'Registrazione effettuata.' });
	
	}
	catch{
		res.status(400)
		res.json({ success: false, message: 'Registratione fallita' });
	}
    
})


module.exports = router
