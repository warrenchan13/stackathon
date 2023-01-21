const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

// static middleware
app.use(express.static(path.join(__dirname, ".."))); // or '../public'

// Send index.html for any requests that don't match one of our API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
