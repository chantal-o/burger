var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions
var burger = require("../models/burger.js");
var controller = require("../controllers/burgers_controller.js");

var orm = require("../config/orm");

// Get all burgers in burger database and render on page
router.get("/", function (req, res) {
    orm.selectAll("burgers", function (burgers, error) {
        if (error) {
            return res.status(501).json({
                message: error
            });
        }
        // console.log("Burgers: ", burgers);
        res.render("index", {burgers});
    });
});

// Post new burger to database and refresh page to see it
router.post("/", function(req, res) {
  console.log('Is this called?')
    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, 0
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
      // res.redirect(req.get('referer'));
    });
  });

  // Mark burger as devoured in database
  router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
  
    burger.updateOne({
      devoured: 1
    }, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  router.put("/:id", function(req, res) {
    console.log("hi");
    // burger.create([
    //   "burger_name", "devoured"
    // ], [
    //   req.body.burger_name, 0
    // ], function(result) {
    //   // Send back the ID of the new quote
    //   // res.json({ id: result.insertId });
    //   res.redirect(req.get('referer'));
    // });
  });

module.exports = router;