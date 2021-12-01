var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').config()
var path = require('path');

var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_Login,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_Name
});

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

app.get('/login/submit', function (request, response) {
	// response.render('./Auth/login.ejs')
	// sign_up.addEventListener('click', function () {
		const nom = document.getElementById('nom');
		const prenom = document.getElementById('prenom');
		// const address = document.getElementById('address');
		// const age = document.getElementById('age');
		// const genre = document.getElementById('genre');
		const email = document.getElementById('email');
		const password = document.getElementById('password');

		console.log(nom.value);
		var Nom = nom.value;
		var Prenom = prenom.value;
		var Email = email.value;
		var Password = password.value;

		connection.connect(function (err) {
			if (err) throw err;
			console.log("Connected!");
			var sql = "INSERT INTO customers (nom, prenom, email, password) VALUES (Nom, Prenom, Email, Password)";
			con.query(sql, function (err, result) {
				if (err) throw err;
				console.log("1 record inserted");
			});
		});
	// });
	response.redirect('home');
});

// sign_in.addEventListener('click', function () {


// });


app.post('/auth', function (request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
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

app.listen(3000);
