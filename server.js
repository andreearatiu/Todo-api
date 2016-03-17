var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [ {
	id: 1,
	description: 'Pick up dad',
	completed: false
}, {
	id: 2, 
	description: 'Buy phone today',
	completed: false
}, {
	id: 3,
	description: 'Love Tudori',
	completed: true
}];

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
		res.status(404).send('This id does not exist !');
	}
	
});

app.listen(PORT, function () {
	console.log('Express listening on port: ' + PORT + '!');
});