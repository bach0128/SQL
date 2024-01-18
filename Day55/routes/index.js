var express = require("express");
var router = express.Router();

/* GET home page. */
let user;
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else next("/users/login");
}

router.get("/", function (req, res) {
  console.log(req.session);
  // this is only called when there is an authentication user due to isAuthenticated
  if (req.session.user) {
    res.render("index", { title: "Nodejs F8", user: req.session.user });
  } else {
    res.render("index", { title: "Nodejs F8", user: {} });
  }
});

// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Nodejs F8", user });
// });

module.exports = router;
