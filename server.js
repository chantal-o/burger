//dependencies
var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 8080;
//css
// app.use(express.static(path.join(__dirname, "public/static")));


app.use(bodyParser.urlencoded({
    extended: false
}));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

//linking controller route
var routes = require('./controllers/burgers_controller.js');

app.use(routes);

//Listening to PORT
app.listen(PORT, function () {
    console.log("Server listening  on: http://localhost:" + PORT);
});
