var express = require("express");
var router = express.Router();

const userController = require("../controller/user.controller");

/* GET users listing. */
router.get("/", userController.index);

router.get("/add", userController.add);
router.post("/add", userController.handleAdd);

router.get("/login", userController.login);
router.post("/login", userController.handleLogin);

module.exports = router;
