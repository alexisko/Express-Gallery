// PACKAGES
const express = require('express');

// FILES
const PORT = process.env.PORT || 8080;

// EXPRESS
const app = express();

// SERVER
const server = app.listen(PORT, () => {
  console.log(`SERVER: Listening on ${PORT}`);
});