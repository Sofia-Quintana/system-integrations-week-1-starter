const express = require("express");
const app = express();
const server = require("http").createServer(app);

const content = require("./content/cards.json");

// Middlewares

app.use(express.static("public"));

// Templating engine setup

app.set("view engine", "ejs");

// Enpoints

app.get("/", (req, res) => {
  res.render("index", { content });
});

// Starting server.

server.listen(3030, () => {
  console.log("Listening on port 3030...");
});
