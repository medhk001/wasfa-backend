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
		database.query('SELECT * FROM `users`', function (error, results, fields) {
			var length = results.length;
			results.forEach(res => {
				if(res.email == Email){
					var nom = res.nom;
					var prenom = res.prenom;
					
					if (res.role === "Admin") {
						response.render('dashboard/index', { nom: nom, prenom: prenom, length:length })
					} else {
						response.render('Auth/profile', { nom: nom, prenom: prenom })
					}
				}
			});
		});
	} else {
		response.redirect('/login')
	}
});

app.get('/dash/all_Users', function (request, response) {
	if (request.session.loggedin) {
		var Email = request.session.username;
		database.query('SELECT * FROM `users`', function (error, results, fields) {
			var nom = results[0].nom;
			var prenom = results[0].prenom;
			if (results.length > 0 && results[0].role === "Admin") {
				response.render('dashboard/users', { nom: nom, prenom: prenom, res: results })
			} else {
				response.render('Auth/profile', { nom: nom, prenom: prenom })
			}
		});
	} else {
		response.redirect('/login')

	}
});


// app.get('/dash/all_Users', function (request, response) {
// 	if (request.session.loggedin) {
// 		var Email = request.session.username;
// 		database.query('SELECT * FROM ``', function (error, results, fields) {
// 			var nom = results[0].nom;
// 			var prenom = results[0].prenom;
// 			if (results.length > 0 && results[0].role === "Admin") {
// 				response.render('Recettes/Recettes', { nom: nom, prenom: prenom, res: results })
// 			} else {
// 				response.render('Auth/profile', { nom: nom, prenom: prenom })
// 			}
// 		});
// 	} else {
// 		response.redirect('/login')

// 	}
// });

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
				request.session.id = results[0].id;
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
		var Email = request.session.username;
		database.query('SELECT * FROM `users`', function (error, results, fields) {
			var length = results.length;
			// console.log('length',length)
			results.forEach(res => {
				if(res.email == Email){
					var nom = res.nom;
					var prenom = res.prenom;
					
					if (res.role === "Admin") {
						response.render('dashboard/index', { nom: nom, prenom: prenom, length:length })
					} else {
						response.render('Auth/profile', { nom: nom, prenom: prenom })
					}
				}
			});
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
		database.query("UPDATE recette SET active='yes' WHERE id = ?", [id], function (error, data, fields) {
			if (error) {
				return response.sendStatus(500)
			}
			response.redirect('/recette/allReccete');
		})
	} else {
		response.redirect('/login');
	}
	response.end();
});

// get All reccetes

app.get('/recette/allReccete', function (request, response) {
console.log('Recettes')
	if (request.session.loggedin) {
		database.query("SELECT * FROM recette WHERE active='non'", function (error, data, fields) {
			if (error) {
				console.log('err',error)
				// return response.sendStatus(500)
			}
			response.render('Recettes/recette', { titre: 'recette list', recettesData: data });
		})
	} else {
		response.redirect('/login');
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
		var userId =request.session.id

		console.log('titre',userId)
		if (titre && description) {
			database.query('INSERT INTO `recette` (titre, niveau, theme, temps_realisation, description, date_dajout, active ) VALUES (? , ?, ?, ?, ?, ?, ?)',
			 [titre, niveau, theme, temps_realisation, description, date_dajout, active],
			  function (error, results, fields) {
				console.log('length', results.length)
				if (results.length > 0 || results != 'undefined') {
					response.render('./Recettes/Recettes.ejs');
				}else {
					console.log('error undef')
				}
				response.send("votre recette a été ajouté");
				response.end();
			});
		} else {
			response.send("Merci d'ajouter un titre et une description");
			response.render('./AddRecette/AddRecette.ejs')
			// response.end();
		}
	} else {
		response.redirect('/login');
	}
	response.end();
});

//
app.get('/addRecette', function (request, response) {
	if (request.session.loggedin) {
		response.render('./AddRecette/AddRecette.ejs');
	} else {
		response.redirect('/login');
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


// creation des routes 07 - 12 -2021
//------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
app.get("/404", function (request, response){
	response.render('404.ejs')
});

app.get("/about", function (request, response){
	response.render('about.ejs')
});

app.get("/blog_fullwidth", function (request, response){
	response.render('blog_fullwidth.ejs')
});

app.get("/blog_left_sidebar", function (request, response){
	response.render('blog_left_sidebar.ejs')
});

app.get("/blog_masonry", function (request, response){
	response.render('blog_masonry.ejs')
});

app.get("/blog_right_sidebar", function (request, response){
	response.render('blog_right_sidebar.ejs')
});

app.get("/blog_single_image", function (request, response){
	response.render('blog_single_image.ejs')
});

app.get("/blog_single_slider", function (request, response){
	response.render('blog_single_slider.ejs')
});

app.get("/blog_single_video", function (request, response){
	response.render('blog_single_video.ejs')
});

app.get("/contact", function (request, response){
	response.render('contact.ejs')
});

app.get("/elements", function (request, response){
	response.render('elements.ejs')
});

app.get("/gallery", function (request, response){
	response.render('gallery.ejs')
});

app.get("/index_animation", function (request, response){
	response.render('index_animation.ejs')
});

app.get("/index_parallax", function (request, response){
	response.render('index_parallax.ejs')
});

app.get("/index2", function (request, response){
	response.render('index2.ejs')
});

app.get("/menu_all", function (request, response){
	response.render('menu_all.ejs')
});

app.get("/menu_plat", function (request, response){
	response.render('menu_plat.ejs')
});

app.get("/menu_recette", function (request, response){
	response.render('menu_recette.ejs')
});

app.get("/menu_RR", function (request, response){
	response.render('menu_RR.ejs')
});

app.get("/menu_tile", function (request, response){
	response.render('menu_tile.ejs')
});

app.get("/recipe_3col", function (request, response){
	response.render('recipe_3col.ejs')
});

app.get("/recipe_4col", function (request, response){
	response.render('recipe_4col.ejs')
});

app.get("/recipe_detail-image", function (request, response){
	response.render('recipe_detail-image.ejs')
});

app.get("/recipe_detail-slider", function (request, response){
	response.render('recipe_detail-slider.ejs')
});

app.get("/recipe_detail-video", function (request, response){
	response.render('recipe_detail-video.ejs')
});

app.get("/recipe_masonry", function (request, response){
	response.render('recipe_masonry.ejs')
});

app.get("/recipe", function (request, response){
	response.render('recipe.ejs')
});

app.get("/reservation-ot", function (request, response){
	response.render('reservation-ot.ejs')
});

app.get("/reservation", function (request, response){
	response.render('reservation.ejs')
});

app.get("/shop_account_detail", function (request, response){
	response.render('shop_account_detail.ejs')
});

app.get("/shop_cart", function (request, response){
	response.render('shop_cart.ejs')
});

app.get("/shop_checkout", function (request, response){
	response.render('shop_checkout.ejs')
});

app.get("/shop_fullwidth", function (request, response){
	response.render('shop_fullwidth.ejs')
});

app.get("/shop_left_sidebar", function (request, response){
	response.render('shop_left_sidebar.ejs')
});

app.get("/shop_right_sidebar", function (request, response){
	response.render('shop_right_sidebar.ejs')
});

app.get("/shop_single_full", function (request, response){
	response.render('shop_single_full.ejs')
});

app.get("/shop_single_left", function (request, response){
	response.render('shop_single_left.ejs')
});

app.get("/shop_single_right", function (request, response){
	response.render('shop_single_right.ejs')
});

app.get("/success", function (request, response){
	response.render('success.ejs')
});

//------------------------------------------------------------------------------------------------------------
//--------------------------- Dashbord route à vérifier-------------------
//------------------------------------------------------------------------------------------------------------

app.get("/dash/charts_chartjs", function (request, response){
	response.render('Dashboard/charts_chartjs.ejs')
});

app.get("/dash/dashboard", function (request, response){
	response.render('Dashboard/dashboard.ejs')
});

app.get("/dash/icons-feather", function (request, response){
	response.render('Dashboard/icons-feather.ejs')
});

app.get("/dash/index", function (request, response){
	response.render('Dashboard/index.ejs')
});

app.get("/dash/maps-google", function (request, response){
	response.render('Dashboard/maps-google.ejs')
});

app.get("/dash/pages-blank", function (request, response){
	response.render('Dashboard/pages-blank.ejs')
});

app.get("/dash/pages-profile", function (request, response){
	response.render('Dashboard/pages-profile.ejs')
});

app.get("/dash/pages-sign-in", function (request, response){
	response.render('Dashboard/pages-sign-in.ejs')
});

app.get("/dash/pages-sign-up", function (request, response){
	response.render('Dashboard/pages-sign-up.ejs')
});

app.get("/dash/ui-buttons", function (request, response){
	response.render('Dashboard/ui-buttons.ejs')
});

app.get("/dash/ui-cards", function (request, response){
	response.render('Dashboard/ui-cards.ejs')
});

app.get("/dash/ui-forms", function (request, response){
	response.render('Dashboard/ui-forms.ejs')
});

app.get("/dash/ui-typography", function (request, response){
	response.render('Dashboard/ui-typography.ejs')
});

app.get("/dash/upgrade-to-pro", function (request, response){
	response.render('Dashboard/upgrade-to-pro.ejs')
});


//-----------------------------------------------------------------------------------------------------------------------



// Server setup
app.listen(port, () => {
	console.log(`Server start on port ${port}`)
})