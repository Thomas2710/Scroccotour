// Imports
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Express app
const app = express();
app.use(cors());

// Hello World
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.locals.db = mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then ( () => {
    
    console.log("Connected to Database");
    // Start server
    app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
      console.log(`Scroccotour server started`)
    });
});
