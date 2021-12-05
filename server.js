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

app.get('/menu_All', function (request, response) {
	response.render('menu_all.ejs');
});

app.get('/menu_RR', function (request, response) {
	response.render('menu_RR.ejs');
});

app.get('/menu_Recette', function (request, response) {
	response.render('menu_Recette.ejs');
});

app.get('/menu_Plat', function (request, response) {
	response.render('menu_Plat.ejs');
});


app.get('/login', function (request, response) {
	response.render('Auth/log_in.ejs');
});

app.get('/signup', function (request, response) {
	//response.sendFile(path.join(__dirname + '/views/index.ejs'));
	response.render('Auth/login.ejs');
});

app.post('/signup/submit', function (request, response) {

	var Nom = request.body.Nom;
	var Prenom = request.body.Prenom;
	var Email = request.body.Email;
	var Password = request.body.pwd;
	var Address = request.body.Address;
	var Genre = request.body.Genre;
	var age = request.body.Age;
	var Age = age.toString();
	var Role = 'Client';
	var GPSX = "11"
	var GPSY = "11"
	console.log(Genre);
	var sql = `INSERT INTO users (nom, prenom, email,password, address, age,genre, role, GPS_X, GPS_Y) 
	VALUES (?)`;
	var values = [Nom,Prenom,Email,Password,Address,Age,Genre,Role,GPSX,GPSY]
	database.query(sql, [values], function (err, result) {
		if (err) throw err;
		console.log("Role : ",Role);
		console.log("one record inserted");
	});
	if(Role === "Admin"){
		console.log(Role)
		response.redirect("/home/backoffice");
	}else{
		console.log(Role)
		response.redirect("/home/profil");
	}
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
				Role = results.Role;
				if(Role === "Admin"){
					response.redirect('/home/backoffice');
				}else{
					response.redirect('/home/profil');
				}
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

app.get('/home/profil', function (request, response) {
	
	if (request.session.loggedin) {
		// response.send('Welcome back, ' + request.session.username + '!');
		response.render('Auth/profil')
	} else {
	    //response.send('Please sign-in to view this page!');
		response.redirect('/login');
	}
	response.end();
});

app.get('/home/backoffice', function (request, response) {
	
	if (request.session.loggedin) {
		// response.send('Welcome back, Admin ' + request.session.username + '!');
		response.render('BackOffice/dashboard')
	} else {
		 //response.send('Please sign-in to view this page!');
		// response.render('auth/log_in');
		response.redirect('/login');
	}
	response.end();
});


// accept recettes by admin
app.get('/recette/:id/accept', function(request, response) {

	if (request.session.loggedin) {
			let id = request.params.id;
			connection.query("UPDATE recette SET active='yes' WHERE id = ?", [id], function(error, data, fields) {
			if (error) {
				return response.sendStatus(500)
			}
			response.redirect('/recette/allReccete');
		})
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

// get All reccetes

app.get('/recette/allReccete', function(request, response) {

	if (request.session.loggedin) {
		connection.query("SELECT * FROM recette WHERE active='non'", function(error, data, fields) {
			if (error) {
				return response.sendStatus(500)
			}
			response.render('recettesList', {titre: 'recette list', recettesData: data});
		})
	} else {
		response.send('Please login to view this page!');
	}
	response.end();

});

// Add  recette

app.post('/recette/add', function(request, response) {

	if (request.session.loggedin) {

		let titre = request.body.titre
		let niveau = request.body.niveau
		let theme = request.body.theme
		let temps_realisation = request.body.temps_realisation
		let description = request.body.description
		let date_dajout = Date.now()
		const active = 'non'

		if (titre && description) {
			connection.query('INSERT INTO recette (titre, niveau, theme, temps_realisation, description, date_dajout, active ) VALUES (? , ?, ?, ?, ?, ?, ?)', [titre, niveau, theme , temps_realisation, description, date_dajout, active ], function(error, results, fields) {
				if (results.length > 0) {
					response.render('./Recettes/Recettes.ejs');
				} 		
				response.end();
			});
		} else {
			response.send("Merci d'ajouter un titre et une description");
			response.end();
		}
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//
app.get('/addRecette', function(request, response){
	if (request.session.loggedin) {
		response.render('./AddRecette/AddRecette.ejs');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});



// Server setup
app.listen(port, () => {
	console.log(`Server start on port ${port}`)
})