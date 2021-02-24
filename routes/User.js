const express = require("express");
const passport = require("passport");
const router = express.Router();
const { signup, findUser, signin } = require("../controllers/userController");

router.get("/", findUser);
router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

module.exports = router;
