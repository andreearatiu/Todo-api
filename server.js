var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedToDo;

	todos.forEach (function (todo) {
		if(todoId === todo.id) {
			matchedToDo = todo;
		}
	});

	if(matchedToDo) {
		res.json(matchedToDo);
	} else {
		res.status(404).send();
	}
	
});

//POST /todos
app.post('/todos', function (req,res) {
	var reqBody = req.body;
	reqBody.id = todoNextId++;

	todos.push(reqBody);
	res.json(reqBody);
})

app.listen(PORT, function () {
	console.log('Express listening on port: ' + PORT + '!');
});