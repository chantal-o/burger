//connection 
var connection = require("./connection");

//method returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it).
//convert object to a string so it can be used in the db query
function toString(obj) {
    var arr = [];

    for(var key in obj) {
        var value = obj[key];
        if(Object.hasOwnProperty.call(obj, key)) {
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

var orm = {
    // 
    // Method wil use parameters to make select query and put enteries in db
    all: function(tName, cb) {
        var queryString = `SELECT * FROM ${tName}`;
        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        });
    },

   
    // Method will take in parameters and use them to query db and add entries
    insert: function(tableName, col, val, cb) {
        // Template to build INSERT db query
        var queryString = `INSERT INTO ${tableName} (${col}) VALUES ("${val}")`;
        console.log(queryString);
        
        connection.query(queryString, function(err, result) {
            if(err) throw err;

            cb(result);
        });
    },

    // Method that takes in table name, a column/value pair, condition, and call back function as parameters
    // It will then use these params to query the db and update the specified entry
    update: function(tableName, colVal, condition, cb) {
        var queryString = `UPDATE ${tableName} SET ${toString(colVal)} WHERE ${condition}`;
        console.log(queryString);
        
        connection.query(queryString, function(err, result) {
            if(err) throw err;
            cb(result);
        });
    }
};

// Export orm 
module.exports = orm;