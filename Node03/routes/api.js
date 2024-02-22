var express = require("express");
var router = express.Router();
const userController = require("../controller/api/v1/user.controller.js");

router.get("/v1/users", userController.index);
router.get("/v1/users/:id", userController.find);
router.post("/v1/users", userController.store);

module.exports = router;
