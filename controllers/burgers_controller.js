var express = require("express");
var router = express.Router();
var burger = require("../models/burger");

// retrieve all burger data from db -> index temp
router.get("/", function(req, res) {
    burger.all(function(data) {
        var burgerObj = {
            burgers: data
        };
        console.log(burgerObj);
        res.render("index", burgerObj);
    });
});

// update burger's devoured state 
router.put("/api/burgers/:id", function(req, res) {
//id of burger provided
    var condition = `id=${req.params.id}`;
    console.log(`condition:${condition}`);

// updat method called to update db
    burger.update(
        {devoured: req.body.devoured},
        condition,
        function(result) {
// throw error
            if(result.changedRows == 0) {
                return res.status(404).end();
            }
            else {
                res.status(200).end();
            }
        });
});

// add a new burger to the db
router.post("/api/burgers", function(req, res) {
//method to send new burger to db
    burger.insert("burger_name", req.body.name, function(result) {
//json response to client
        res.json({id: result.insertId})
    });
});

// Export 
module.exports = router;