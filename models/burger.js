var orm = require("../config/orm");

var burger = {
//all burgers from db 
   all: function(cb) {
        orm.all("burgers", function(res) {
            cb(res);
        });
    },
//add a burger to db
    insert: function(col, val, cb) {
        orm.insert("burgers", col, val, function(res) {
            cb(res);
        });
    },
    // change devoured state of burger in db 
    update: function(objColVal, condition, cb) {
        orm.update("burgers", objColVal, condition, function(res) {
            cb(res);
        });
    }
};

// export 
module.exports = burger;