var express = require("express");
var router = express.Router();

/* GET home page. */
let user;
router.get("/", function (req, res, next) {
  res.render("index", { title: "Nodejs F8", user });
});

module.exports = router;
