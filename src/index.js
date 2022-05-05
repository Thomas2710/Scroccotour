// Imports
const express = require('express');
const cors = require('cors');

// Express app
const app = express();
app.use(cors());

// Hello World
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start server
app.listen(process.env.PORT || 8080, '0.0.0.0', () => {
  console.log(`Scroccotour server started`)
})