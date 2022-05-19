// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors({
  origin: "http://localhost:8081",
  credentials: true
}));

const auth = require("./routes/auth.js")
const listahosting = require("./routes/listahosting.js")
const tokenChecker = require('./routes/tokenChecker.js');
const home = require("./routes/home")
const tour = require("./routes/tour")


// Express app


app.use(express.urlencoded());
app.use(express.json());
app.use("/api/v1/auth", auth);
app.use("/api/v1/lista-hosting", tokenChecker)
app.use("/api/v1/lista-hosting", listahosting)
app.use("/api/v1/home", tokenChecker)
app.use("/api/v1/home", home)
app.use("/api/v1/tour", tokenChecker)
app.use("/api/v1/tour", tour)

app.locals.db = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

.then ( () => {
    
    console.log("Connected to Database");
    // Start server

    app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
      console.log(`Scroccotour server started`)
    });
});

