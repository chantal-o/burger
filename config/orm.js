var connection = require("../config/connection.js");

//creates an array
function burgerArr(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

//convert object key/value pairs to SQL syntax
function toSql(ob) {
    var arr = [];

    //iterate through keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }

    // return comma-separated string
    return arr.toString();
}

// Query data within database
var orm = {
    selectAll: function (tableInput, callBack) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function (err, results) {
            if (err) {
                throw err;
            }
            callBack(results)
        });
    },

    // Insert one item into database table
    insertOne: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += burgerArr(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // sho full table valus and condition, update
    updateOne: function (table, objColVals, condition, callBack) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += toSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callBack(result);
        });
    } 
};



//Export the orm object for burger.js
module.exports = orm