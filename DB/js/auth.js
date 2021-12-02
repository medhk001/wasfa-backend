function userAuth(username, password) {
    database.query('SELECT * FROM  `wasfadb`.`users` WHERE username =  "' + username + '" AND password =  "' + password + '"', function (error, results, fields) {
        console.log(results)
        if (results.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
            return true;
        } else {
            response.send('Incorrect Username and/or Password!');
            return false;
        }
    });
}