
//dependencies
var express = require("express");

var path = require ("path");
var bodyParser = require ("body-parser");
var exphbs = require("express-handlebars");
var burger = require("./controllers/burgers_controller.js");

//Creating variable using express library
var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

//Configuring imported modules
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ 
    defaultLayout: "main", 
    layoutsDir: path.join(__dirname, "views/layouts") 
}));
app.set("view engine", "handlebars");

// Set environment variable to tell web server to listen to port 8080.
var PORT = process.env.PORT || 8080;
app.use("/", burger)
// testing route
app.get("/", function (req, res) {
    res.render("connection", { 
        title: "Home Page",
    });
})


//starting server(listening on port 8080)
app.listen(PORT, function () {
    console.log("Server started on port 8080")
})