///
/// This file contain the filter applyied to every API route that requires to be logged in
///

const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const tokenChecker = function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	var header = req.headers['authorization']
	token = header.split(" ")[1]

	// if there is no token
	if (!token) {
		return res.status(401).send({ 
			success: false,
			message: 'No token provided.'
		});
	}

	// decode token, verifies secret and checks exp
	jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {			
		if (err) {
			return res.status(403).send({
				success: false,
				message: 'Autenticazione fallita'
			});		
		} else {
			// if everything is good, save to request for use in other routes
			req.User = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker