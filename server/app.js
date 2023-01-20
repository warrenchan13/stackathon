const express = require("express");
const path = require("path");
const app = express();

// static middleware
app.use(express.static(path.join(__dirname, ".."))); // or '../public'

// Send index.html for any requests that don't match one of our API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
