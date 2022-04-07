const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const { addTask, deleteTask, updateTask } = require('./services/storageService');
const { response } = require("express");
let toDoList = [];

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Templating engine setup
app.set("view engine", "ejs");

// Enpoints

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/to-do', (request, response) => {
  console.log(toDoList);
  response.status(200).json(toDoList);
});

app.post('/to-do', (request, response) => {
  try {
    console.log(request.body);
    toDoList = addTask(toDoList, request.body);
    response.status(200).json({ response: 'successfully added'});
  } catch(error) {
    console.log(error);
    response.status(400).json({ response: 'Bad request'});
  }
});

app.delete('/to-do', (request, response) => {
  try {
    toDoList = deleteTask(toDoList, request.body.id);
    response.status(200).json({ response: 'successfully deleted'});
  } catch(error) {
    console.error(error);
    response.status(404).json({ response: 'task not found'});
  }
});

app.put('/to-do', (request, response) => {
  try {
    toDoList = updateTask(request.body);
    response.status(200).json({ response: 'successfully updated'});
  } catch(error) {
    console.error(error);
    response.status(404).json({ response: 'task not found'});
  }
});

// Starting server.

server.listen(3030, () => {
  console.log("Listening on port 3030...");
});
