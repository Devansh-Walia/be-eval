const router = require("express").Router();
const path = require("path");
const {home, newUser, okay} = require("../controller/userController");


router.get("/", home);
router.get("/okay", okay);
router.post("/users/register", newUser);

module.exports = router;