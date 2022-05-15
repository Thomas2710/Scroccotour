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
		
			res.status(200);
			res.cookie('jwt', token, {httpOnly:true, maxAge: 86400*3});
			res.json({
				success: true,
				message: 'Auth token sent',
				username: user.username,
				id: user._id,
				self: "api/v1/auth/" + user._id
			});
			
		}
		
		else{
			res.status(400);
			res.json({ success: false, message: 'Autenticazione fallita' });
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
		
		res.status(200);
		res.json({ success: true, message: 'Registrazione effettuata.' });
	}
	catch(err){
		res.status(400)
		res.json({ success: false, message: 'Registratione fallita' });
	}
    
})



module.exports = router
