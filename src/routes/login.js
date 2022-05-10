const express = require("express")
const User = require("../models/User") // new
const router = express.Router()

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
			res.status(200)
			res.send("Login effettuato")
		}
		else{
			res.status(400)
			res.send("Username o password errati")
		}
	
})

router.post("/register", async (req, res) => {
	try{
    const u = new User({
		username: req.body.username,
		password: req.body.password.hashCode(),
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
