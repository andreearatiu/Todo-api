var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

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
	var matchedToDo = _.findWhere(todos, {id: todoId});

	if(matchedToDo) {
		res.json(matchedToDo);
	} else {
		res.status(404).send();
	}
	
});

//POST /todos
app.post('/todos', function (req,res) {
	var reqBody = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(reqBody.completed) && _.isString(reqBody.description) || reqBody.description.trim().length === 0){
		return res.status(400).send();
	}
	reqBody.id = todoNextId++;
	//set body.description to be trimmed value
	reqBody.description = reqBody.description.trim();

	todos.push(reqBody);
	res.json(reqBody);
});

//DELETE /todos/:id
app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId});

	if(matchedTodo) {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	} else {
		res.status(400).json({"error" : "no todo found with that id"});
	}
});

app.listen(PORT, function () {
	console.log('Express listening on port: ' + PORT + '!');
});