// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const login = require("./routes/login.js")
// Express app
const app = express();
app.use(cors());



app.locals.db = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("Connected to Database");
    // Start server
    const app = express()
		app.use(express.urlencoded())
    app.use(express.json())
		app.use("/login", login)
    app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
      console.log(`Scroccotour server started`)
    });
});
