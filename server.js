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

//------------------------------------------------------------------------------------------------------------------------
//Route Dashboard
app.get('/dash', function (request, response) {
	if (request.session.loggedin) {
		var Email = request.session.username;
		database.query('SELECT * FROM `users` WHERE email =  "' + Email + '"', function (error, results, fields) {
			var nom = results[0].nom;
			var prenom = results[0].prenom;
			if (results.length > 0 && results[0].role === "Admin") {
				response.render('dashboard/index', { nom: nom, prenom: prenom })
			} else {
				response.render('Auth/profile', { nom: nom, prenom: prenom })
			}
		});
	} else {
		response.redirect('/login')
	}
});

app.get('/dash/all_Users', function (request, response) {
	if (request.session.loggedin) {
		var Email = request.session.username;
		database.query('SELECT * FROM `users` WHERE email =  "' + Email + '"', function (error, results, fields) {
			var nom = results[0].nom;
			var prenom = results[0].prenom;
			if (results.length > 0 && results[0].role === "Admin") {
				response.render('dashboard/users', { nom: nom, prenom: prenom })
			} else {
				response.render('Auth/profile', { nom: nom, prenom: prenom })
			}
		});
	} else {
		response.redirect('/login')

	}
});

//------------------------------------------------------------------------------------------------------------------------
//Route Accueil
app.get('/', function (request, response) {
	//response.sendFile(path.join(__dirname + '/views/index.ejs'));
	response.render('index')
});

app.get('/index_slider', function (request, response) {
	//response.sendFile(path.join(__dirname + '/views/index.ejs'));
	response.render('index_slider')
});

//----------------------------------------------------------------------------------------------------------------------------
//Route Menu
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

//----------------------------------------------------------------------------------------------------------------------
//Route login
app.get('/login', function (request, response) {
	if (request.session.loggedin) {
		response.redirect('/home')
	} else {
		response.render('Auth/log_in.ejs');
	}
});

//Route logout
app.get('/logout', function (request, response) {
	if (request.session.loggedin) {
		request.session.loggedin = false;
		request.session.username = null;
		response.redirect('/')
	} else {
		response.render('Auth/log_in.ejs');
	}
});

//Route signup
app.get('/signup', function (request, response) {
	if (request.session.loggedin) {
		response.redirect('/home')
	} else {
		response.render('Auth/login.ejs');
	}
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
	database.query('SELECT email FROM `users` WHERE email =  "' + Email + '"', function (error, results, fields) {
		if (results.length > 0) {
			response.send('Email Exist');
		} else {
			var sql = `INSERT INTO users (nom, prenom, email,password, address, age,genre, role, GPS_X, GPS_Y) 
		VALUES (?)`;
			var values = [Nom, Prenom, Email, Password, Address, Age, Genre, Role, GPSX, GPSY]
			database.query(sql, [values], function (err, result) {
				if (err) throw err;
				console.log("Role : ", Role);
				console.log("one record inserted");
			});
			response.redirect('/home');
		}
	});
});

app.post('/auth', function (request, response) {
	var username = request.body.email;
	var password = request.body.password;
	// console.log(username)
	if (username && password) {
		database.query('SELECT * FROM `users` WHERE email =  "' + username + '"', function (error, results, fields) {
			// AND password =  "' + password + '"
			// console.log(results)
			var pwd = results[0].password
			if (results.length > 0 && password == pwd) {
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
		var username = request.session.username;
		console.log('user : ', username)
		database.query('SELECT * FROM `users` WHERE email =  "' + username + '"', function (error, results, fields) {
			var Role = results[0].role;
			var nom = results[0].nom;
			var prenom = results[0].prenom;
			if (Role === "Admin") {
				response.render('Dashboard/index', { nom: nom, prenom: prenom })
			} else {
				response.render('Auth/profile', { nom: nom, prenom: prenom })
			}
		});
	} else {
		//response.send('Please sign-in to view this page!');
		response.redirect('/login');
	}
	// response.end();
});

//-------------------------------------------------------------------------------------------------------------------
// accept recettes by admin
app.get('/recette/:id/accept', function (request, response) {

	if (request.session.loggedin) {
		let id = request.params.id;
		connection.query("UPDATE recette SET active='yes' WHERE id = ?", [id], function (error, data, fields) {
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

app.get('/recette/allReccete', function (request, response) {

	if (request.session.loggedin) {
		connection.query("SELECT * FROM recette WHERE active='non'", function (error, data, fields) {
			if (error) {
				return response.sendStatus(500)
			}
			response.render('recettesList', { titre: 'recette list', recettesData: data });
		})
	} else {
		response.send('Please login to view this page!');
	}
	response.end();

});

// Add  recette

app.post('/recette/add', function (request, response) {

	if (request.session.loggedin) {

		let titre = request.body.titre
		let niveau = request.body.niveau
		let theme = request.body.theme
		let temps_realisation = request.body.temps_realisation
		let description = request.body.description
		let date_dajout = Date.now()
		const active = 'non'

		if (titre && description) {
			connection.query('INSERT INTO recette (titre, niveau, theme, temps_realisation, description, date_dajout, active ) VALUES (? , ?, ?, ?, ?, ?, ?)', [titre, niveau, theme, temps_realisation, description, date_dajout, active], function (error, results, fields) {
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
app.get('/addRecette', function (request, response) {
	if (request.session.loggedin) {
		response.render('./AddRecette/AddRecette.ejs');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

//---------------------------------------------------------------------------------------------------------------------
//test Server Sql 
app.get("/sqlstatus", (req, res) => {

	database.ping((err) => {
		if (err) return res.status(500).send("MySQL Server is Down");

		res.send("MySQL Server is Active");
	})
});

// Server setup
app.listen(port, () => {
	console.log(`Server start on port ${port}`)
})