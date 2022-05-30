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

// V1 routes
const auth_v1 = require("./routes/v1/auth.js")
const listahosting_v1 = require("./routes/v1/listahosting.js")
const home_v1 = require("./routes/v1/home")
const tour_v1 = require("./routes/v1/tour")
const reviews_v1 = require("./routes/v1/reviews")

// V2 routes
const auth_v2 = require("./routes/v2/auth.js")
const listahosting_v2 = require("./routes/v2/listahosting.js")
const home_v2 = require("./routes/v2/home")
const tour_v2 = require("./routes/v2/tour")

const tokenChecker = require('./common/tokenChecker.js');

// Express app
app.use(express.urlencoded());
app.use(express.json());

// V1
app.use("/api/v1/auth", auth_v1);
app.use("/api/v1/lista-hosting", tokenChecker)
app.use("/api/v1/lista-hosting", listahosting_v1)
app.use("/api/v1/home", tokenChecker)
app.use("/api/v1/home", home_v1)
app.use("/api/v1/tour", tokenChecker)
app.use("/api/v1/tour", tour_v1)
app.use("/api/v1/reviews", tokenChecker)
app.use("/api/v1/reviews", reviews_v1)

// V2
app.use("/api/v2/auth", auth_v2);
app.use("/api/v2/lista-hosting", tokenChecker)
app.use("/api/v2/lista-hosting", listahosting_v2)
app.use("/api/v2/home", tokenChecker)
app.use("/api/v2/home", home_v2)
app.use("/api/v2/tour", tokenChecker)
app.use("/api/v2/tour", tour_v2)

app.locals.db = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

.then ( () => {
    
    console.log("Connected to Database");
    // Start server
    if (process.env.NODE_ENV !== 'test') {
      app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
        console.log(`Scroccotour server started`)
      });
    }
    
    
});

module.exports = app;