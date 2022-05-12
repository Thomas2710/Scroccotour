const express = require("express")
const User = require("../models/User") // new
const router = express.Router()
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


String.prototype.hashCode = function() {
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

router.post("/login", async (req, res) => {
		const user = await User.findOne({ username: req.body.username , password: req.body.password.hashCode()})
		if (user != null){

			var payload = {
				username: user.username,
				id: user._id,
				// other data encrypted in the token	
			}
			var options = {
				expiresIn: 86400 // expires in 24 hours
			}
			var token = jwt.sign(payload, process.env.JWT_KEY, options);
			
			res.json({
				success: true,
				message: 'Auth token sent',
				token: token,
				username: user.username,
				id: user._id,
				self: "api/v1/auth" + user._id
			});
			
		}
		
		else{
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		}
})

router.post("/register", async (req, res) => {
	try{
    const u = new User({
		username: req.body.username,
		password: req.body.password.hashCode(),
		email: req.body.email,
	})
	await u.save()
	res.status(200)
	res.send("Utente creato")
	
	}
	catch{
		res.status(400)
		res.send("Username già esistente")
	}
    
})


module.exports = router
