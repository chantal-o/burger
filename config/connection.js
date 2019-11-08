// initialize MySQL connection
var mysql = require("mysql");
var connection;

// connect to db

    connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "burgers_db"
    });


// Make connection to database following msql npm documentation: https://www.npmjs.com/package/mysql
connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

  
// export connection 
module.exports = connection;