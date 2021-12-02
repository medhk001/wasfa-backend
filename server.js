// var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const database = require('./sqlConnection');
require('dotenv').config()
var path = require('path');
const port = process.env.PORT

var app = express();

app.set('view engine', 'ejs');
//express static
app.use("/public", express.static('public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
	//response.sendFile(path.join(__dirname + '/views/index.ejs'));
	response.render('index')
});

app.get('/login', function (request, response) {
	//response.sendFile(path.join(__dirname + '/views/index.ejs'));
	response.render('./Auth/login.ejs')
});

app.post('/submit', function (request, response) {

	var Nom = request.body.Nom;
	var Prenom = request.body.Prenom;
	var Email = request.body.Email;
	var Password = request.body.pwd;
	var Address = request.body.Address;
	var Genre = request.body.Genre;
	var Age = request.body.Age;
	var Type = "Client";
	var GPSX = "11"
	var GPSY = "11"
	console.log(Nom);
	// var dbid={$nom: Nom, $prenom: Prenom, $email: Email, $password: Password, $address: Address, $genre: Genre, $type: Type, $GPS_X: GPSX, $GPS_Y: GPSY, $age: Age};
	var sql = "INSERT INTO `users` (nom, prenom, email, password, address, genre, type, GPS_X, GPS_Y, age) VALUES (Nom, Prenom, Email, Password, Address, Genre, Type, GPS_X, GPS_Y, Age)";
	database.query(sql, function (err, result) {
		if (err) throw err;
		console.log("1 record inserted");
	});
	response.redirect('home');
});

app.get("/sqlstatus", (req, res) => {

	database.ping((err) => {
		if (err) return res.status(500).send("MySQL Server is Down");

		res.send("MySQL Server is Active");
	})
});

app.post('/auth', function (request, response) {
	var username = request.body.email;
	var password = request.body.password;
	console.log(username)
	if (username && password) {
		database.query('SELECT * FROM `users` WHERE email =  "' + username + '" AND password =  "' + password + '"', function (error, results, fields) {
			console.log(results)
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/home', function (request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});


// Server setup
app.listen(port, () => {
	console.log(`Server start on port ${port}`)
})